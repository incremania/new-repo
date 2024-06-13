const investNowBtn = document.querySelectorAll('.investNow');
const errorDiv = document.querySelector('.error-div')
const myOptionBalance = document.querySelector('.my-option-balance')
const myActiveBalance  = document.querySelector('.my-active-balance')

// Get the select element
const selectElement = document.querySelector('select[name="balance_type"]');

// Iterate over each option element



investNowBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const parentElement = btn.parentNode;
        const h2Text = parentElement.querySelector('h2').textContent.toLowerCase();
      
        localStorage.setItem('investmentType', h2Text)

    });
});



const myForm = document.querySelector('.my-investment-form')



const token = localStorage.getItem('token');
;

const createInvestment = async (formData) => {
    const url = "http://localhost:3000/investment";
    if (token) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });


            if (!response.ok) {
                 const error = await response.json();
                   errorDiv.classList.remove('hide')
                 errorDiv.textContent = error.msg
                 setTimeout(() => {
                    errorDiv.classList.add('hide')
                   errorDiv.textContent = ''
                 }, 5000)
                 
                throw new Error("Unauthorized access");
            }
            const data = await response.json();
            window.location.href = 'investHistory.html'

            console.log(data);
         
        } catch (error) {
            console.log(error);
        }
    } else {
        // Redirect to login page
        window.location.href = "login.html";
    }
};

const investmentTypeLocal = localStorage.getItem('investmentType')

myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
  
    const amount = parseFloat(myForm.querySelector('#amount').value); 
    
    
    const investmentTypeSelect = myForm.querySelector('select[name="balance_type"]');
    const investmentType = investmentTypeSelect.value;

    
    myForm.querySelector('#investment_type').value = investmentType;


    const formData = {
        amount: amount,
        investmentType: investmentTypeLocal,
        status: 'pending',
    };


    
    await createInvestment(formData);
});



