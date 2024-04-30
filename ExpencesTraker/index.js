function handleFormSubmit(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  
  const myObj = {
      id: Date.now(),
      amount: amount,
      description: description,
      category: category
  }

  // Add the new object to local storage
  addExpense(myObj);
  
  document.getElementById('amount').value = "";
  document.getElementById('description').value = "";
  document.getElementById('category').value = "";
  // Refresh the display with updated data
  refreshDisplay();
}

function addExpense(expense) {
  let expenses = JSON.parse(localStorage.getItem('expenseDetails')) || [];
  expenses.push(expense);
  localStorage.setItem('expenseDetails', JSON.stringify(expenses));
}

function showUserONScreeen(expenses) {
  const parentList = document.getElementById("listItem");
  parentList.innerHTML = ''; // Clear previous content

  expenses.forEach(function (expense) {
      const listItem = document.createElement("li");
      listItem.textContent = `${expense.id} - ${expense.amount} - ${expense.description}, -${expense.category}`;
      listItem.className = "cardItem"
      
      //delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className="delete-btn"

    
      deleteBtn.addEventListener("click", function () {
          deleteExpense(expense.id);
          refreshDisplay(); 
      });
      

      //edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn"
      

      editBtn.addEventListener("click", function () {
        deleteExpense(expense.id);
        refreshDisplay(); 
          editExpense(expense,expense.id);
          
      });

      listItem.appendChild(deleteBtn);
      listItem.appendChild(editBtn);
      parentList.appendChild(listItem);
  });
}

function deleteExpense(id) {
  if(localStorage.getItem('expenseDetails')){
    let expenses = JSON.parse(localStorage.getItem('expenseDetails'));
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenseDetails', JSON.stringify(expenses));
  }else{
    alert("Data not persist");
  }

}


function editExpense(expense, id){
  document.getElementById('amount').value = expense.amount;
  document.getElementById('description').value = expense.description;
  document.getElementById('category').value = expense.category;
  
  handleFormSubmit();
}

function refreshDisplay() {
  if(localStorage.getItem('expenseDetails')){
  const expenses = JSON.parse(localStorage.getItem('expenseDetails'));
  showUserONScreeen(expenses);
  }else{
    alert("Data not persist");
  }
}


refreshDisplay();
