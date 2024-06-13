// Function to submit the form data

const errorDiv = document.querySelector('.error-div')

const submitFormData = async () => {
    try {
        // Retrieve form values
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        const walletType = document.getElementById('wallet_type').value;
        const password = document.getElementById('password').value;

        // Get token from local storage
        const token = localStorage.getItem('token');

        // Validate form data
        if (!email || !amount || !walletType || !password) {
            alert('All fields are required!');
            return;
        }

        // Construct form data object
        const formData = {
            email,
            amount,
            walletType,
            password
        };
        const url = "https://easycrypto.onrender.com/transfer"

        // Make a POST request to the API endpoint
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        // Check if the request was successful
        if (!response.ok) {
            // Handle error
            const error = await response.json();
            errorDiv.classList.remove('hide');
            errorDiv.textContent = error.msg;
            setTimeout(() => {
                errorDiv.classList.add('hide');
                errorDiv.textContent = '';
            }, 5000);

            throw new Error("Unauthorized access");
        }

        // Parse response JSON
        const responseData = await response.json();
        window.location.href = 'transferHistory.html'

        // Handle success
        console.log('Form submitted successfully:', responseData);
    } catch (error) {
        // Handle error
        console.error('Error submitting form:', error.message);
    }
};


// Add event listener to the form submit button
document.querySelector('.gold-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    submitFormData(); // Call the function to submit form data
});
