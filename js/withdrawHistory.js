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

async function fetchData() {
    try {
        // Retrieve the bearer token from local storage
        const token = localStorage.getItem('token');
        ;
        
        const url = "https://easycrypto.onrender.com/withdrawal";

        // Make an HTTP GET request to fetch data
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            const error = await response.json()
          
            throw new Error('Failed to fetch data');
        }

        // Parse the response data as JSON
        const data = await response.json();
    
        const tableBody = document.querySelector('.my-own-table tbody');

        tableBody.innerHTML = '';

        // Check if data is available
        if (data.withdrawals.length > 0) {
            // Populate table with fetched data
            data.withdrawals.forEach(transaction => {
                console.log(transaction.amount);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transaction.transactionId}</td>
                    <td>${transaction.gateway}</td>
                    <td>${transaction.amount}</td>
                    <td>${0}</td>
                    <td>${transaction.status}</td>
                    <td>${formatDateTime(transaction.createdAt)}</td>
                    
                `;
                tableBody.appendChild(row);
            });
        } else {
            // If no data found, display message
            const noDataFoundRow = document.createElement('tr');
            noDataFoundRow.innerHTML = `<td colspan="100%">No Data Found!</td>`;
            tableBody.appendChild(noDataFoundRow);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData function when the page loads
fetchData();



