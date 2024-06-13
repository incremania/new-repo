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



document.addEventListener('DOMContentLoaded', () => {
    const ticketTable = document.getElementById('ticket-table');

    // Function to fetch all tickets from the backend
    async function fetchTickets() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/ticket', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
            console.log(data.userTickets);
                return data.userTickets;
            } else {
                throw new Error(data.error || 'Failed to fetch tickets');
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    // Function to render the ticket data in the table
    async function renderTickets() {
        const tickets = await fetchTickets();
        console.log(tickets);

        if (tickets.length > 0) {
            const tbody = ticketTable.querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing table rows
            
            tickets.forEach(ticket => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ticket.subject}</td>
                    <td>${ticket.status}</td>
                    <td>${formatDateTime(ticket.createdAt)}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const tbody = ticketTable.querySelector('tbody');
            tbody.innerHTML = `
                <tr class="text-center">
                    <td colspan="4">No Data Found!</td>
                </tr>
            `;
        }
    }

    // Initial rendering of tickets when the page loads
    renderTickets();
});
