
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');

    const apiKey = 'cf423da72503aeaeb15ef206'; // Replace with your API key from ExchangeRate-API
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // List of common currencies
    const currencies = [
        'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'JPY', 'INR', 'MXN', 
        'RUB', 'ZAR', 'BRL', 'HKD', 'NZD', 'SGD', 'KRW', 'THB', 'MYR', 'IDR'
    ];

    // Populate the currency dropdowns
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        fromCurrencySelect.add(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toCurrencySelect.add(option2);
    });

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        const conversionURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

        fetch(conversionURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                resultDiv.textContent = 'Error fetching conversion rate';
            });
    });
});
