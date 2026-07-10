// auth.js - Modular Authentication & Passcode Verification Engine

export const AuthSystem = (function() {
    // Local database collections synced with client storage map
    let users = JSON.parse(localStorage.getItem('patukrishi_users') || '{}');
    let pendingVerifications = JSON.parse(localStorage.getItem('patukrishi_pending') || '{}');
    let currentPendingEmail = null;

    // Generates a random 6-digit passcode string
    function generatePasscode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Controls button transition masks during asynchronous calls
    function toggleButtonLoading(buttonId, isLoading, defaultText) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            if (isLoading) {
                btn.disabled = true;
                btn.innerHTML = '<span class="loader"></span> Processing...';
            } else {
                btn.disabled = false;
                btn.innerHTML = defaultText;
            }
        }
    }

    return {
        // Tab switching engine inside modal container
        switchAuthTab: function(tab) {
            document.querySelectorAll('#authModal .auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('#authModal .auth-form').forEach(f => f.classList.remove('active'));
            
            const verifySec = document.getElementById('verification-section');
            if (verifySec) verifySec.style.display = 'none';
            
            const errDiv = document.getElementById('verify-error');
            if (errDiv) errDiv.innerText = '';
            
            if (tab === 'login') {
                document.querySelectorAll('#authModal .auth-tab')[0]?.classList.add('active');
                document.getElementById('login-form-new')?.classList.add('active');
            } else {
                document.querySelectorAll('#authModal .auth-tab')[1]?.classList.add('active');
                document.getElementById('signup-form-new')?.classList.add('active');
            }
        },

        // Handles secure user registration workflow
        handleSignup: async function(serviceId, templateId) {
            const name = document.getElementById('signup-name')?.value.trim();
            const email = document.getElementById('signup-email')?.value.trim();
            const password = document.getElementById('signup-password')?.value.trim();
            const errorDiv = document.getElementById('signup-error');
            
            if (!name || !email || !password) {
                if (errorDiv) errorDiv.innerText = '⚠️ Please fill out all required fields.';
                return;
            }
            if (users[email]) {
                if (errorDiv) errorDiv.innerText = '⚠️ Email is already registered. Please Login.';
                return;
            }

            const code = generatePasscode();
            toggleButtonLoading('signup-btn', true, 'Create Account');

            try {
                const templateParams = {
                    email: email,
                    to_name: name,
                    name: name,
                    passcode: code,
                    time: new Date().toLocaleTimeString()
                };
                
                const response = await emailjs.send(serviceId, templateId, templateParams);
                
                if (response.status === 200) {
                    pendingVerifications[email] = {
                        name: name,
                        password: password,
                        code: code,
                        expires: Date.now() + 15 * 60 * 1000 // 15 Minute Validation Limit
                    };
                    localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
                    currentPendingEmail = email;

                    if (errorDiv) {
                        errorDiv.className = 'success-message';
                        errorDiv.innerText = '📧 Code sent! Check your inbox.';
                    }
                    document.getElementById('verification-section').style.display = 'block';
                }
            } catch (error) {
                if (errorDiv) {
                    errorDiv.className = 'error-message';
                    errorDiv.innerText = '❌ Gateway Error. Could not send code.';
                }
            } finally {
                toggleButtonLoading('signup-btn', false, 'Create Account');
            }
        },

        // Verifies the user's submitted passcode
        verifyPasscode: function() {
            const code = document.getElementById('verify-code')?.value.trim();
            const email = currentPendingEmail;
            const errorDiv = document.getElementById('verify-error');
            
            const pending = pendingVerifications[email];
            if (pending && pending.code === code && pending.expires > Date.now()) {
                users[email] = { name: pending.name, email: email, password: pending.password, verified: true };
                delete pendingVerifications[email];
                
                localStorage.setItem('patukrishi_users', JSON.stringify(users));
                localStorage.setItem('patukrishi_pending', JSON.stringify(pendingVerifications));
                
                this.switchAuthTab('login');
                if (errorDiv) errorDiv.innerText = '';
                alert('✅ Verification Successful! You can now log in.');
            } else {
                if (errorDiv) errorDiv.innerText = '❌ Invalid code or expired window context.';
            }
        },

        // Validates existing sessions on application boot
        initSession: function() {
            const sessionStr = localStorage.getItem('patukrishi_session');
            const dashboard = document.getElementById('dashboard');
            const authModal = document.getElementById('authModal');
            
            if (sessionStr) {
                if (dashboard) dashboard.style.display = 'block';
                if (authModal) authModal.style.display = 'none';
            } else {
                if (dashboard) dashboard.style.display = 'none';
                if (authModal) {
                    authModal.style.display = 'flex';
                    authModal.classList.add('show');
                }
            }
        }
    };
})();
