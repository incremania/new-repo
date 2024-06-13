

        const myForm = document.getElementById('proofForm');
        const urlParams = new URLSearchParams(window.location.search);
        const amount = parseFloat(urlParams.get('amount'));
        const paymentMethod = urlParams.get('paymentMethod');
        const errorDiv = document.querySelector('.error-div')
        const gateway = document.querySelector('.my-new-gateway')
        const amountToPay = document.querySelector('.amount-to-pay')
        const myPayWith = document.querySelector('.my-pay-with')
        const myWalletAdress = document.querySelector('.my-wallet-address')
        

        const token = localStorage.getItem("token");
        gateway.textContent = paymentMethod
        amountToPay.textContent = amount

        if(paymentMethod === 'Bitcoin') (
            myPayWith.textContent = 'Pay With Bitcoin',
            myWalletAdress.textContent = '12hiURqLqBaDihwpLBz4aGNq7K9HJtsJT9'
        ) 
        else if(paymentMethod === 'Etherum') {
            myPayWith.textContent = 'Pay With Etherum',
            myWalletAdress.textContent = '0xb9402d7eb6ed1a0505492387fcaa937c9b291e2d'
        }
        else if(paymentMethod === 'SHIBA') {
            myPayWith.textContent = 'Pay with SHIBA'
            myWalletAdress.textContent = '0x1cc1f56cb6d310e9cfa22cf0d78169af2ee9902e'
        } else {
            myPayWith.textContent = 'Pay With Usdt',
            myWalletAdress.textContent = '0x1cc1f56cb6d310e9cfa22cf0d78169af2ee9902e'
        }


        const makePayment = async (formData) => {
            const url = "http://localhost:3000/transaction";
            if (token) {
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: formData
                    });

                    console.log(formData);

                    if (!response.ok) {
                         const error = await response.json();
                         console.log(error.error);
                            errorDiv.classList.remove('hide');



            errorDiv.textContent = error.error.toUpperCase();
            setTimeout(() => {
                errorDiv.classList.add('hide');
                errorDiv.textContent = '';
            }, 5000);

                    console.log(error);
                        throw new Error("Unauthorized access");
                    }

                    const data = await response.json();
                    console.log(data);
                    window.location.href = 'fundHistory.html';
                } catch (error) {
                    console.log(error);
                }
            } else {
                window.location.href = "login.html";
            }
        };

        myForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const imageInput = document.getElementById('imageInput');
            const transactionIdInput = document.getElementById('transactionIdInput');
            console.log(transactionIdInput.value);

            if (!imageInput.files.length) {
                alert("Please upload an image");
                return;
            }

            const formData = new FormData();
            formData.append('image', imageInput.files[0]);
            formData.append('amount', amount);
            formData.append('operationType', 'deposit');
            formData.append('status', 'pending');
            formData.append('gateway', paymentMethod);
            formData.append('paymentId', transactionIdInput.value)

            await makePayment(formData);
        });
 


