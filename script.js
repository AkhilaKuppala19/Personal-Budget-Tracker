document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');
    const transactionList = document.getElementById('transaction-list');
    const incomeSummary = document.getElementById('income-summary');
    const expenseSummary = document.getElementById('expense-summary');
    const balanceSummary = document.getElementById('balance-summary');

    let transactions = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    function updateSummary() {
        totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);
        totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
        const balance = totalIncome - totalExpenses;

        incomeSummary.textContent = `Total Income: $${totalIncome.toFixed(2)}`;
        expenseSummary.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
        balanceSummary.textContent = `Balance: $${balance.toFixed(2)}`;
    }

    function addTransaction() {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (description && !isNaN(amount) && amount > 0) {
            const transaction = { description, amount, type };
            transactions.push(transaction);

            const li = document.createElement('li');
            li.innerHTML = `${description} - $${amount.toFixed(2)} <button class="delete-button">Delete</button>`;
            transactionList.appendChild(li);

            li.querySelector('.delete-button').addEventListener('click', () => {
                transactions = transactions.filter(t => t !== transaction);
                li.remove();
                updateSummary();
            });

            descriptionInput.value = '';
            amountInput.value = '';
            updateSummary();
        }
    }

    addButton.addEventListener('click', addTransaction);
});
