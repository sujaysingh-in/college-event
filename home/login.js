// login.js - Multi-Role: Admin + Teacher + Student
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userTypeSelect = document.getElementById('userType');

    // ✅ 3 Roles के Credentials (Hardcoded for College Project)
    const USER_CREDENTIALS = {
        ADMIN: {
            username: 'sujay',
            password: 'sujay123',
            dashboard: '../dashboard/homeadmin.html'
        },
        ADMIN: {
            username: 'tushar',
            password: 'tushar123',
            dashboard: '../dashboard/homeadmin.html'
        },
        TEACHER: {
            username: 'teacher1', 
            password: 'teach123',
            dashboard: '../dashboard/teacher.html'
        },
        STUDENT: {
            username: 'student1',
            password: 'stud123', 
            dashboard: '../dashboard/student.html'
        }
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const userType = userTypeSelect.value;

        // Validation
        if (!username || !password || !userType) {
            showError('Please fill all fields!');
            return;
        }

        // Role-based Login Check
        const credentials = USER_CREDENTIALS[userType];
        if (credentials && 
            username === credentials.username && 
            password === credentials.password) {
            
            // Set Session with Role
            sessionStorage.setItem('userLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userRole', userType);
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Redirect based on Role
            showNotification('✅ Login Successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = credentials.dashboard;
            }, 1200);
            
        } else {
            showError(`❌ Invalid! ${userType} credentials:\n${credentials?.username}/${credentials?.password}/${userType}`);
        }
    });

    // Clear Button
    document.querySelector('.btn-reset').addEventListener('click', function() {
        setTimeout(() => {
            usernameInput.value = '';
            passwordInput.value = '';
            userTypeSelect.value = '';
            hideError();
        }, 100);
    });

    // Enter key support
    [usernameInput, passwordInput, userTypeSelect].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') loginForm.dispatchEvent(new Event('submit'));
        });
    });

    // Show Credentials Hint (on page load)
    setTimeout(() => showCredentialsHint(), 1000);

    // Functions
    function showError(message) {
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #e74c3c; background: #fee; padding: 1.2rem; 
                border-radius: 10px; margin: 1.5rem 0; border-left: 5px solid #e74c3c;
                font-weight: 600; display: none; font-family: inherit;
                box-shadow: 0 4px 12px rgba(231,76,60,0.2);
            `;
            loginForm.parentNode.insertBefore(errorDiv, loginForm.nextSibling);
        }
        errorDiv.innerHTML = `<i class="fa fa-exclamation-circle"></i> ${message}`;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function hideError() {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) errorDiv.style.display = 'none';
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white; border-radius: 8px; font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000;
            transform: translateX(350px); transition: all 0.4s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(350px)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

   
});
