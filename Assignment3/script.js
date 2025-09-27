document.addEventListener('DOMContentLoaded', function () {
    let addStudent = function () {
        let table = document.getElementById("myTable");
        let tbody = table.querySelector("tbody");

        let lastRow = tbody.lastElementChild;
        let studentCell = lastRow?.children[1];
        let lastRowIndex = studentCell ? parseInt(studentCell.textContent.split(" ")[1]) : 0;

        let newRow = document.createElement("tr");
        let newCheckboxCell = document.createElement("td");
        newCheckboxCell.innerHTML = `<input type="checkbox" onclick="onClickCheckbox(this)"><br><img src="images/arrow.png" alt="Open" width="30" height="30" onclick="onClickOpen(this)">`;

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

        let newPercentageCell = document.createElement("td");
        newPercentageCell.textContent = `100%`;

        newRow.appendChild(newCheckboxCell);
        newRow.appendChild(newStudentCell);
        newRow.appendChild(newAdvisorCell);
        newRow.appendChild(newAwardCell);
        newRow.appendChild(newSemesterCell);
        newRow.appendChild(newTypeCell);
        newRow.appendChild(newBudgetCell);
        newRow.appendChild(newPercentageCell);
        tbody.appendChild(newRow);
    }

    window.addStudent = addStudent;

        window.onClickCheckbox = function (checkbox) {
        let table = document.getElementById("myTable");
        let headerRow = table.querySelector("thead tr");
        let deleteCell = headerRow.cells[8];
        let editCell = headerRow.cells[9];
        let selectedRow = checkbox.closest("tr");
        if (checkbox.checked) {
            selectedRow.style.backgroundColor = "yellow";

            let deleteButton = document.createElement("td");
            deleteButton.innerHTML = `<button type="button" onclick="onClickDelete(this)">Delete</button>`;
            selectedRow.appendChild(deleteButton);
            deleteCell.style.display = "table-cell";
            editCell.style.display = "table-cell";

        } else {
            selectedRow.style.backgroundColor = "white";
            let deleteButton = selectedRow.querySelector("button");
            let deleteButtonCell = deleteButton.closest("td");
            selectedRow.removeChild(deleteButtonCell);
        }
    }

  });
