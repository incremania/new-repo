
const storedUser = localStorage.getItem('user');



const userBalance = document.querySelector('.my-balance')
const activeBalance = document.querySelector('.active-balance')
const totalWithdrawal = document.querySelector('.total-withdrawal')
const totalInvest = document.querySelector('.total-invest')
const selectElement = document.querySelector('select[name="balance_type"]');


if (storedUser) {
    const user = JSON.parse(storedUser);
    userBalance.textContent = user.user.balance
    activeBalance.textContent = user.user.balance
   
} else {
    console.log('User information not found in local storage');
    // Handle the case where user information is not found
}


const token = localStorage.getItem("token");


const fetchUserInfo = async () => {
    if (token) {
        try {
            
    
            const url = `http://localhost:3000/user`;
            

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Unauthorized access");
            }

            const data = await response.json();
            userBalance.textContent = data.user.balance
            activeBalance.textContent = data.user.balance
            totalInvest.textContent = data.user.totalInvest
            totalWithdrawal.textContent = data.user.totalWithdrawal
        } catch (error) {
            console.log(error);
            // Redirect to login page
            window.location.href = "login.html";
        }
    } else {
        // Redirect to login page
        window.location.href = "login.html";
    }
}


fetchUserInfo()