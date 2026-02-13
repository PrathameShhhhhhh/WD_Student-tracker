/*
  Student Expense Tracker
  SE CSE Mini Project
*/

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

// Add Expense
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (title === "" || amount === "" || category === "" || date === "") {
    alert("Please fill all fields");
    return;
  }

  const expense = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    category: category,
    date: date
  };

  expenses.push(expense);
  saveAndRender();
  form.reset();
});

// Display Expenses
function displayExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;

    const row = document.createElement("tr");

    if (exp.amount > 2000) {
      row.classList.add("high-expense");
    }

    row.innerHTML = `
      <td>
        ${exp.title}
        ${exp.amount > 2000 ? '<span class="warning-text">⚠ High Expense</span>' : ''}
      </td>
      <td>₹${exp.amount}</td>
      <td>${exp.category}</td>
      <td>${exp.date}</td>
      <td>
        <button class="delete-btn" onclick="deleteExpense(${exp.id})">
          Delete
        </button>
      </td>
    `;
    
    expenseList.appendChild(row);
  });

  totalDisplay.textContent = total;
}

// Delete Expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveAndRender();
}

// Save to localStorage and render UI
function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

// Initial Load
displayExpenses();