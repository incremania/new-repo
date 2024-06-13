
const errorDiv = document.querySelector('.error-div')

const submitForm = async () => {
    try {
    const formData = {
    wallet_type: document.querySelector('.my-wallet-type').value,
    gateway: document.querySelector('.my-gateway').value,
    amount: parseFloat(document.querySelector('.amount').value),
    wallet: document.querySelector('.wallet-input').value
};




if(!document.querySelector('.amount').value){
   errorDiv.classList.remove('hide');
            errorDiv.textContent = 'PLEASE ENTER AMOUNT TO WITHDRAW';
            setTimeout(() => {
                errorDiv.classList.add('hide');
                errorDiv.textContent = '';
            }, 5000);
}
        const token = localStorage.getItem('token');
        ;

        // Make sure token is available
        if (!token) {
          
            return;
        }

        const url = "https://easycrypto.onrender.com/withdrawal"

        // Fetch API endpoint
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        // Check if request was successful
        console.log(response);
        if (!response.ok) {
            const error = await response.json()
              errorDiv.classList.remove('hide');

            errorDiv.textContent = error.message.toUpperCase();
            setTimeout(() => {
                errorDiv.classList.add('hide');
                errorDiv.textContent = '';
            }, 5000);

            
            throw new Error('Failed to submit form');
        }

        // Parse response JSON
        const responseData = await response.json();
       window.location.href = 'withdrawHistory.html'

        // Handle success
        console.log('Form submitted successfully:', responseData);
    } catch (error) {
        // Handle error
        console.error('Error submitting form:', error.message);
    }
};


document.querySelector('.my-own-form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    submitForm();
});
