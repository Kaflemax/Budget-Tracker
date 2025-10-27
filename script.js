let show = false;
let realBalance = "$0.00";
let transactions = [];

const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transactionList'); 
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
function toggleBalance() {
    show = !show;
    const balance = document.getElementById("totalBalance"); 
    balance.innerText = show ? realBalance : "XXXXX.XX"; 
}


transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const typeInput = document.querySelector('input[name="type"]:checked');

    if (!description || isNaN(amount) || !typeInput) {
        alert('Please fill in all fields');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type: typeInput.value
    };

    transactions.push(transaction);
    updateUI();
    transactionForm.reset();
});

function updateUI() {
    transactionList.innerHTML = '';

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.className = 'transaction-item';

        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn">x</button>
        `;

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));

        transactionList.appendChild(li);

        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;
    realBalance = `$${balance.toFixed(2)}`;

    totalBalance.textContent = show ? realBalance : "XXXXX.XX";
    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpense.textContent = `$${expense.toFixed(2)}`;
    totalBalance.style.color = balance >= 0 ? '#28a745' : '#dc3545';
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}
