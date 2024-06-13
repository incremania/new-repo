const form = document.querySelector('form')
 const errorDiv = document.querySelector('.error-div')


 
const validatePassword = () => {
    const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="password_confirmation"]');
   const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    // Check if passwords match and their lengths are greater than 7
    if (  passwordValue.length < 8) {
        errorDiv.textContent = 'Passwords must match and be at least 8 characters long';
            errorDiv.classList.remove('hide')

            setTimeout(() => {
          errorDiv.classList.add('hide')
            }, 5000)
            return false
    } else if(passwordValue !== confirmPasswordValue) {
        errorDiv.textContent = 'Passwords must match';
             errorDiv.classList.remove('hide')
            setTimeout(() => {
          errorDiv.classList.add('hide')
            }, 5000)

            return false
    }
    
  return true
}


async function submitFormData() {
    try {
        const formData = new FormData(form);
     

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const apiUrl = 'https://easycrypto.onrender.com/register';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        };

        const response = await fetch(apiUrl, options);

        if (!response.ok) {
             const error = await response.json()
        
            errorDiv.classList.remove('hide');
            errorDiv.textContent = error.error;
            setTimeout(() => {
                errorDiv.classList.add('hide');
                errorDiv.textContent = '';
            }, 5000);
            
           
            console.log(error);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token)
        window.location.href = "login.html"
        console.log(data);
      
    } catch (error) {
        console.error('Error:', error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
      const passwordValidationResult = validatePassword();
   
    // Proceed with form submission only if password validation passes
    if (passwordValidationResult) {
        await submitFormData();
    }

});
