
document.getElementById('loading').style.display = 'none';

let id, minAmount, maxAmount, baseSymbol, fixCharge, percentCharge, currency, amount, chosenPaymentMethod;

document.querySelectorAll('.addFund').forEach(button => {
    button.addEventListener('click', function () {
        id = this.dataset.id;
        minAmount = parseFloat(this.dataset.min_amount);
        maxAmount = parseFloat(this.dataset.max_amount);
        baseSymbol = "$";
        fixCharge = parseFloat(this.dataset.fix_charge);
        percentCharge = parseFloat(this.dataset.percent_charge);
        currency = this.dataset.currency;
        chosenPaymentMethod = this.dataset.name; // Store the chosen payment method
        document.querySelector('.depositLimit').innerText = `Transaction Limit: ${minAmount} - ${maxAmount}  ${baseSymbol}`;

        let depositCharge = `Charge: ${fixCharge} ${baseSymbol}  ${(percentCharge > 0) ? ' + ' + percentCharge + ' % ' : ''}`;
        document.querySelector('.depositCharge').innerText = depositCharge;

        document.querySelector('.method-name').innerText = `Payment By ${chosenPaymentMethod} - ${currency}`;
        document.querySelector('.show-currency').innerText = currency; // Set currency placeholder
        document.querySelector('.amount').placeholder = currency; // Set amount placeholder
        document.querySelector('.gateway').value = currency;
        document.querySelector('.errors').innerText = ''; // Clear error message

        // Show the modal
        $('#addFundModal').modal('show');
    });
});

// Function to handle redirection to payment.html
function redirectToPayment() {
    // Store amount and payment method in localStorage
    localStorage.setItem('amount', amount);
    localStorage.setItem('paymentMethod', chosenPaymentMethod);
    
    // Redirect to payment.html with the amount and chosen payment method as query parameters
    window.location.href = `payment.html?amount=${amount}&paymentMethod=${chosenPaymentMethod}`;
}

// Using event delegation to attach event listener to dynamically generated elements
document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('checkCalc')) {
        amount = parseFloat(document.querySelector('.amount').value);

        if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
            document.querySelector('.errors').innerText = 'Invalid amount. Please enter an amount within the specified range.';
            return;
        }

        // Perform calculations
        let charge = fixCharge + (amount * percentCharge / 100);
        let payable = amount + charge;

        // Display information in next modal
        let htmlData = `
        <ul class="list-group text-center">
            <li class="list-group-item bg-transparent list-text customborder">
                Amount:
                <strong>${amount} ${currency}</strong>
            </li>
            <li class="list-group-item bg-transparent list-text customborder">Charge:
                <strong>${charge.toFixed(2)} ${baseSymbol}</strong>
            </li>
            <li class="list-group-item bg-transparent list-text customborder">
                Payable: <strong>${payable.toFixed(2)} ${baseSymbol}</strong>
            </li>
            <li class="list-group-item bg-transparent">
                <button id="payNowBtn" class="btn gold-btn addFund my-addFund">Pay Now</button>
            </li>
        </ul>`;

        document.querySelector('.payment-info').innerHTML = htmlData;
        document.querySelector('.my-next-btn').style.display = 'none'

        document.querySelector('.payment-form').classList.add('d-none');
        document.querySelector('.modal-backdrop.fade').classList.add('show');

        // Attach event listener to the Pay Now button
        document.querySelector('.my-addFund').addEventListener('click', function(e) {
            e.preventDefault();
            redirectToPayment();
            $('#addFundModal').modal('hide'); // Hide the modal after redirection
        });
    }
});

document.querySelector(".my-btn-close").addEventListener('click', function () {
    // Refresh the page
    location.reload();
});

