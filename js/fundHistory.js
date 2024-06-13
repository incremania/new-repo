const token = localStorage.getItem("token");

// Function to format date and time
const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    return `${day} ${month} ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

const transactionHistory = async () => {
    const transactionTableBody = document.querySelector('.transactionTableBody');
    try {
        const response = await fetch("https://easycrypto.onrender.com/transaction/user", {
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

        // Clear existing table rows
        transactionTableBody.innerHTML = '';

        // Iterate over each transaction and create table rows
        data.transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.transactionId}</td>
                <td>${transaction.gateway}</td>
                <td>${transaction.amount}</td>
                <td>0</td>
                <td><span class="badge bg-${transaction.status === 'Pending' ? 'warning' : 'success'}">${transaction.status}</span></td>
                <td>${formatDateTime(transaction.createdAt)}</td>
            `;
            transactionTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        // Redirect to login page or handle the error as required
        // window.location.href = "login.html";
    }
};

// Call the transactionHistory function to fetch and display transaction history
transactionHistory();
