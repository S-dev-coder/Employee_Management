// Employee class definition
class Employee {
  constructor(name, address, employeeId, designation) {
    this.name = name;
    this.address = address;
    this.employeeId = employeeId;
    this.designation = designation;
  }
}

let employees = [];

// Get form and list elements by their respective ID
const employeeForm = document.getElementById("employee-form");
const employeeList = document.getElementById("employee-list");
const editBtn = document.getElementById("edit-btn");
const addBtn = document.getElementById("add-btn");

editBtn.style.display = "none";
addBtn.style.display = "block";

// Event listener for form submission
employeeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const employeeId = document.getElementById("employee-id").value;
  const designation = document.getElementById("designation").value;

  // Validate form inputs
  if (validateInputs(name, address, employeeId, designation)) {
    if (editBtn.style.display === "block") {
      handleEditEmployee(name, address, employeeId, designation);
    } else {
      addEmployee(name, address, employeeId, designation);
    }
  }
});

// Function to validate form inputs and handle all the edge cases
function validateInputs(name, address, employeeId, designation) {
  if (!/^[a-zA-Z\s]*$/.test(name.trim())) {
    alert("Name should only contain letters and spaces.");
    return false;
  }
  
  
  if (name.trim().length < 2) {
    alert("Name should contain at least 2 characters.");
    return false;
  }
  
  if (address.trim().length < 2) {
    alert("Address should contain at least 2 characters.");
    return false;
  }

  if (!/^[a-zA-Z0-9\s]*$/.test(address.trim())) {
    alert("Address should only contain letters, numbers, and spaces.");
    return false;
  }

  if (!/^\d+$/.test(employeeId.trim())) {
    alert("Employee ID should only contain numbers.");
    return false;
  }

  if (designation.trim().length < 2) {
    alert("Designation should contain at least 2 characters.");
    return false;
  }


  if (!/^[a-zA-Z\s]*$/.test(designation.trim())) {
    alert("Designation should only contain letters and spaces.");
    return false;
  }

  return true;
}

// Function to add a new employee
function addEmployee(name, address, employeeId, designation) {
  const existingEmployee = employees.find(emp => emp.employeeId === employeeId);
  if (existingEmployee) {
    alert("An employee with the same Employee ID already exists.");
    return;
  }
  const employee = new Employee(name, address, employeeId, designation);
  employees.push(employee);
  employeeForm.reset();
  displayEmployees();
}

// Function to edit an employee detail
function editEmployee(index) {
  const employee = employees[index];
  editBtn.style.display = "block";
  addBtn.style.display = "none";
  const inputs = employeeForm.querySelectorAll("input");
  inputs[0].value = employee.name;
  inputs[1].value = employee.address;
  inputs[2].value = employee.employeeId;
  inputs[3].value = employee.designation;
  editBtn.dataset.index = index;
  editBtn.onclick = function () {
    employeeForm.dispatchEvent(new Event("submit"));
  };
}

// Function to handle the edit of an employee detail
function handleEditEmployee(name, address, employeeId, designation) {
  const index = editBtn.dataset.index;
  const editedEmployeeId = employeeId;
  const existingEmployeeWithEditedId = employees.find((emp, i) => i !== parseInt(index) && emp.employeeId === editedEmployeeId);
  if (existingEmployeeWithEditedId) {
    alert("An employee with the same Employee ID already exists.");
    return;
  }
  employees[index] = new Employee(name, address, employeeId, designation);
  employeeForm.reset();
  editBtn.style.display = "none";
  addBtn.style.display = "block";
  displayEmployees();
}

// Function to display the list of employees
function displayEmployees() {
  employeeList.innerHTML = "";
  employees.forEach(function (employee, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.address}</td>
      <td>${employee.employeeId}</td>
      <td>${employee.designation}</td>
      <td><button onclick="editEmployee(${index})">Edit</button></td>
    `;
    employeeList.appendChild(row);
  });
}

// Initially display the list of employees
displayEmployees();
