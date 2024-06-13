// Function to fetch data from the backend


const token = localStorage.getItem('token')


async function fetchData() {
    try {
        const url = 'http://localhost:3000/investment';

        const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            });


        if (!response.ok) {
              const data = await response.json();
            
            throw new Error('Failed to fetch data');
    ;
        }
        const data = await response.json();
    
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to populate the table with data
async function populateTable() {
    // Select the table body element
    const tableBody = document.querySelector('.table tbody');
    
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch data from the backend
    const data = await fetchData();
   

    // Check if data is available
    if (data && data.investments.length > 0) {
    ;
        // Loop through the data and create table rows
        data.investments.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.investmentType}</td>
                    <td>${item.returnInterest}</td>
                    <td>${item.amount}</td>
                    <td>${item.upcomingPayment}</td>
                </tr>
            `;
            // Append the row to the table body
            tableBody.innerHTML += row;
        });
    } else {
        // If no data is available, display a message
        tableBody.innerHTML = `
            <tr class="text-center">
                <td colspan="5">No Data Found!</td>
            </tr>
        `;
    }
}

populateTable()

// Call the populateTable function when the page loads
window.addEventListener('load', populateTable);
