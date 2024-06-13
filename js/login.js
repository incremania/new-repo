const form = document.querySelector('form');

async function submitFormData() {
    try {
        const formData = new FormData(form);
      
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const apiUrl = 'http://localhost:3000/login';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        };

        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            const error = await response.json();
            const errorDiv = document.querySelector('.error-div');
            errorDiv.textContent = error.error.toUpperCase();
            errorDiv.classList.remove('hide');

            setTimeout(() => {
                errorDiv.classList.add('hide');
            }, 5000);

            console.error(error);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
        console.log(data);
    
    } catch (error) {
        console.error('Error:', error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitFormData();
});
