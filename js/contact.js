// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Basic form validation
            if (validateForm(formData)) {
                // In a real application, you would send this data to a server
                // For this static site, we'll just show a success message
                
                // Show success message
                showAlert('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log form data to console (for demonstration)
                console.log('Form submitted:', formData);
            }
        });
    }
    
    // Form validation function
    function validateForm(formData) {
        // Check if required fields are filled
        if (!formData.name.trim()) {
            showAlert('Please enter your name.', 'warning');
            return false;
        }
        
        if (!formData.email.trim()) {
            showAlert('Please enter your email address.', 'warning');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Please enter a valid email address.', 'warning');
            return false;
        }
        
        if (!formData.subject.trim()) {
            showAlert('Please enter a subject.', 'warning');
            return false;
        }
        
        if (!formData.message.trim()) {
            showAlert('Please enter your message.', 'warning');
            return false;
        }
        
        return true;
    }
});
