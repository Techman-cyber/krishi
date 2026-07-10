// message.js - Unified Contact Forms & Messaging Pipeline

export const MessageSystem = (function() {
    return {
        // Form link monitor setup
        bindContactForm: function(serviceId, templateId) {
            const contactForm = document.getElementById('patuContactForm');
            if (!contactForm) return;

            contactForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                const statusDiv = document.getElementById('patuFormStatus');
                if (statusDiv) statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing message deployment...';
                
                try {
                    const templateParams = {
                        from_name: document.getElementById('patuName').value.trim(),
                        from_email: document.getElementById('patuEmail').value.trim(),
                        mobile: document.getElementById('patuMobile').value.trim(),
                        message: document.getElementById('patuMessage').value.trim(),
                        to_email: 'patukrishi@gmail.com'
                    };
                    
                    const response = await emailjs.send(serviceId, templateId, templateParams);
                    if (response.status === 200) {
                        if (statusDiv) {
                            statusDiv.innerHTML = '<span style="color:#4caf50; font-weight: 600;">✅ Message successfully sent to PatuKrishi!</span>';
                        }
                        contactForm.reset();
                        setTimeout(() => { if(statusDiv) statusDiv.innerHTML = ''; }, 5000);
                    }
                } catch (error) {
                    if (statusDiv) {
                        statusDiv.innerHTML = '<span style="color:#f44336; font-weight: 600;">❌ Network failure. Message drop rejected.</span>';
                    }
                }
            });
        },

        // Generates cleanly styled real-time toast alerts
        pushNotification: function(msg, type = 'info') {
            let container = document.getElementById('notification-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'notification-container';
                document.body.appendChild(container);
            }

            let notification = document.createElement('div');
            const borderColors = {
                success: '#2e7d32',
                error: '#f44336',
                warning: '#ff9800',
                info: '#f9a825'
            };

            notification.style.cssText = `
                background: var(--card-bg, #ffffff);
                padding: 12px 24px;
                border-radius: 40px;
                margin-bottom: 10px;
                border-left: 5px solid ${borderColors[type] || borderColors.info};
                box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                font-weight: 600;
                font-size: 0.9rem;
                animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            `;
            
            notification.innerText = msg;
            container.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.4s ease';
                setTimeout(() => notification.remove(), 400);
            }, 3000);
        }
    };
})();
