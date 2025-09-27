document.addEventListener('DOMContentLoaded', function () {
    let addStudent = function () {
        let table = document.getElementById("myTable");
        let tbody = table.querySelector("tbody");

        // need to get last Book row (to get inside)
        let lastRow = tbody.lastElementChild;
        let bookCell = lastRow?.children[1];
        let lastRowIndex = bookCell ? parseInt(bookCell.textContent.split(" ")[1]) : 0;

        // creating the new Row
        let newRow = document.createElement("tr");
        let newCheckboxCell = document.createElement("td");
        newCheckboxCell.innerHTML = `<input type="checkbox" onclick="onClickCheckbox(this)">`;

        let newBookCell = document.createElement("td");
        newBookCell.textContent = `Student ${parseInt(lastRowIndex) + 1}`;

        let newAuthorCell = document.createElement("td");
        newAuthorCell.textContent = `Advisor ${parseInt(lastRowIndex) + 1}`;

        newRow.appendChild(newCheckboxCell);
        newRow.appendChild(newBookCell);
        newRow.appendChild(newAuthorCell);
        tbody.appendChild(newRow);
    }

    window.addStudent = addStudent;
  });
