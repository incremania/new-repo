document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.ticket-form');
    const token = localStorage.getItem('token');
    
    // Function to handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        
        try {
            const response = await fetch('http://localhost:3000/ticket', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json();
         
            
            if (response.ok) {
                   window.location.href = 'ticketHistory.html'
                
            } else {
                alert(result.error || 'Ticket creation failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the ticket.');
        }
    }

    form.addEventListener('submit', handleFormSubmit);
});
