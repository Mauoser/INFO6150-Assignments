document.addEventListener('DOMContentLoaded', function () {
    let addStudent = function () {
        let table = document.getElementById("myTable");
        let tbody = table.querySelector("tbody");

        let lastRow = tbody.lastElementChild;
        let studentCell = lastRow?.children[1];
        let lastRowIndex = studentCell ? parseInt(studentCell.textContent.split(" ")[1]) : 0;

        let newRow = document.createElement("tr");
        let newCheckboxCell = document.createElement("td");
        newCheckboxCell.innerHTML = `<input type="checkbox" onclick="onClickCheckbox(this)">`;

        let newStudentCell = document.createElement("td");
        newStudentCell.textContent = `Student ${parseInt(lastRowIndex) + 1}`;

        let newAdvisorCell = document.createElement("td");
        newAdvisorCell.textContent = `Advisor ${parseInt(lastRowIndex) + 1}`;

        let newAwardCell = document.createElement("td");
        newAwardCell.textContent = `Approved`;

        let newSemesterCell = document.createElement("td");
        newSemesterCell.textContent = `Fall`;

        let newTypeCell = document.createElement("td");
        newTypeCell.textContent = `TA`;

        let budget = 12345 + (lastRowIndex * 11111);
        let newBudgetCell = document.createElement("td");
        newBudgetCell.textContent = budget;

        newRow.appendChild(newCheckboxCell);
        newRow.appendChild(newStudentCell);
        newRow.appendChild(newAdvisorCell);
        newRow.appendChild(newAwardCell);
        newRow.appendChild(newSemesterCell);
        newRow.appendChild(newTypeCell);
        newRow.appendChild(newBudgetCell);
        tbody.appendChild(newRow);
    }

    window.addStudent = addStudent;
  });
