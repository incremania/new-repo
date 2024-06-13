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

const token = localStorage.getItem('token')
const fetchTransactionHistory = async () => {
    try {
        // Make a GET request to the API endpoint
        const url = "https://easycrypto.onrender.com/transfer"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
        });

        // Check if the request was successful
        if (!response.ok) {
            const error  = await response.json()
            console.log(error);
            throw new Error('Failed to fetch transaction history');
        }

        // Parse response JSON
        const responseData = await response.json();
        

        // Get the table body element
        const tableBody = document.querySelector('.table tbody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Check if there are transactions
        if (responseData.transfers.length === 0) {
            // Display "No Data Found!" message
            tableBody.innerHTML = '<tr class="text-center"><td colspan="100%">No Data Found!</td></tr>';
        } else {
            // Populate table rows with transaction data
            responseData.transfers.forEach((transaction, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${transaction.transactionId}</td>
                        <td>${transaction.amount}</td>
                        <td>${transaction.status}</td>
                        <td>${formatDateTime(transaction.createdAt)}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    } catch (error) {
        console.error('Error fetching transaction history:', error.message);
    }
};

// Call the function to fetch and display transaction history
fetchTransactionHistory();
