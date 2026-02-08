document.addEventListener('DOMContentLoaded', function() {

    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
   
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showMessage('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Veuillez entrer un email valide', 'error');
                return;
            }
       
            const submitBtn = supportForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showConfirmation(name, email, subject);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
   
                supportForm.reset();
                
            }, 1500);
        });
    }
    
   
    function showMessage(text, type) {
    
        const oldMessage = document.querySelector('.message');
        if (oldMessage) oldMessage.remove();

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.innerHTML = `
            <p>${text}</p>
            <button class="close-message"><i class="fas fa-times"></i></button>
        `;
     
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 2000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
    
        const closeBtn = message.querySelector('.close-message');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
        `;
        
        closeBtn.addEventListener('click', () => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        });
    
        document.body.appendChild(message);
   
        setTimeout(() => {
            if (document.body.contains(message)) {
                message.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }
        }, 5000);
    }

    function showConfirmation(name, email, subject) {
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-modal';
        
        const subjectText = getSubjectText(subject);
        
        confirmation.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Message envoyé !</h2>
                </div>
                <div class="modal-body">
                    <p>Merci <strong>${name}</strong> pour votre message.</p>
                    <div class="message-details">
                        <p><strong>Sujet :</strong> ${subjectText}</p>
                        <p><strong>Email :</strong> ${email}</p>
                    </div>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn close-modal">Fermer</button>
                </div>
            </div>
        `;
     
        confirmation.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = confirmation.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            animation: slideUp 0.3s ease;
        `;
       
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .modal-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .modal-header i {
                font-size: 4rem;
                color: #4CAF50;
                margin-bottom: 20px;
            }
            
            .modal-header h2 {
                color: var(--primary);
                font-size: 2rem;
            }
            
            .modal-body {
                margin-bottom: 30px;
            }
            
            .message-details {
                background: var(--light-bg);
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .message-details p {
                margin-bottom: 10px;
            }
            
            .modal-footer {
                text-align: center;
            }
            
            .close-modal {
                background: var(--primary);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 1rem;
                transition: var(--transition);
            }
            
            .close-modal:hover {
                background: var(--secondary);
                transform: translateY(-2px);
            }
        `;
        
        document.head.appendChild(style);
    
        document.body.appendChild(confirmation);
                 
        const closeBtn = confirmation.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            confirmation.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => confirmation.remove(), 300);
        });
        
       
    }

    function getSubjectText(value) {
        const subjects = {
            'reservation': 'Réservation',
            'question': 'Question générale',
            'problem': 'Problème technique',
            'feedback': 'Retour d\'expérience',
            'other': 'Autre'
        };
        return subjects[value] || 'Autre';
    }
 
});