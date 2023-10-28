//Variables
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');


let budget,userBudget;

//Classes
class Budget {
    constructor(budget) {
        this.budget = Number( budget );
        this.budgetLeft = this.budget;
    }
    // Substrack from the budget
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }

}



//Event Listeners
EventListener();
function EventListener(){
    //App Int
    document.addEventListener('DOMContentLoaded',()=>{
        //Ask the visitor their weekly budget
        userBudget=prompt(`what's your budget for this week?`);
        //Validate the userBudget
        if(userBudget===null||userBudget===""||userBudget==='0'){
            window.location.reload();
        }else{
            //Budget is valid then instanciate the budget class
            budget=new Budget(userBudget);
            console.log(budget);
            //Inset the budget when the user submits it
            inseretBudget(budget.budget);
        }
    })

    //When a new expense is added
    addExpenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        //Read the values from the budget form
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;
        if(expenseName==""||amount==""){
            printMessage('There was error, all the fields are mandatory','alert-danger');
        }
        else{
            addExpenseToList(expenseName,amount);
            trackBudget(amount);
            //Change the color of budget left acoording to the amount left
            if((budget.budget/4)>budget.budgetLeft){
                budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning')
                budgetLeft.parentElement.parentElement.classList.add('alert-danger')
            }else if((budget.budget/2)>budget.budgetLeft){
                budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-danger')
                budgetLeft.parentElement.parentElement.classList.add('alert-warning')
            }else{
                budgetLeft.parentElement.parentElement.classList.remove('alert-warning','alert-danger')
                budgetLeft.parentElement.parentElement.classList.add('alert-success')
            }
    }
})

//Function
function inseretBudget(amount){
    //Insert the values
    budgetTotal.innerHTML=`${amount}`;
    budgetLeft.innerHTML=`${amount}`;
}

function printMessage(message,className){
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('text-center','alert',className);
    messageWrapper.appendChild(document.createTextNode(message));
    //Insert into HTML
    document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm);
    //Clear the alert
    setTimeout(() => {
        document.querySelector('.primary .alert').remove();
    }, 3000);
}

function addExpenseToList(name,amount){
    const expensesList = document.querySelector('#expenses ul');
    const li = document.createElement('li');
    li.className="list-group-item d-flex justify-content-between align-items-center";
    //Create the template
    li.innerHTML=`
        ${name}
        <span class="badge badge-primary badge-pill">${amount}</span>
    `;
    //Insert into the HTML
    expensesList.appendChild(li); 
}

function trackBudget(amount){
    const budgetLeftDollars = budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;
}}