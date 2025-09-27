document.addEventListener("DOMContentLoaded", function () {
  let addStudent = function () {
    let table = document.getElementById("myTable");
    let tbody = table.querySelector("tbody");

    //let lastRow = tbody.lastElementChild;

    //let lastRow = document.querySelector("#studentRow");
    let firstRow = document.querySelectorAll('[id^="studentRow"]');
    let lastRow = firstRow[firstRow.length - 1];

    let studentCell = lastRow?.children[1];
    let lastRowIndex = studentCell
      ? parseInt(studentCell.textContent.split(" ")[1])
      : 0;

    let newRow = document.createElement("tr");
    //newRow.setAttribute("id", "studentRow");
    newRow.setAttribute("id", "studentRow " + (parseInt(lastRowIndex) + 1));
    console.log(lastRowIndex);

    let newCheckboxCell = document.createElement("td");
    newCheckboxCell.innerHTML = `<input type="checkbox" onclick="onClickCheckbox(this)"><br><input type="image" src="images/arrow.png" alt="Open" width="30" height="30" onclick="onClickOpen(this)">`;

    let studentDetails = document.createElement("tr");
    studentDetails.innerHTML = `<td colspan="8"><div>Student ${
      parseInt(lastRowIndex) + 1
    } Details:<br><br>Award Details: Honors Student<br>Fall 1-2024 (TA)<br>Comments: Outstanding<br>Award Status: A</div></td>`;

    console.log(studentDetails);
    studentDetails.style.display = "none";

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

    let budget = 12345 + lastRowIndex * 11111;
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

    if (tbody.appendChild(newRow) && tbody.appendChild(studentDetails)) {
      alert(`Student ${parseInt(lastRowIndex) + 1} Record added successfully`);
    } else {
      alert("Error in adding student record");
    }
  };

  window.addStudent = addStudent;

  window.onClickCheckbox = function (checkbox) {
    let table = document.getElementById("myTable");
    let headerRow = table.querySelector("thead tr");
    let deleteCell = headerRow.cells[8];
    let editCell = headerRow.cells[9];
    let selectedRow = checkbox.closest("tr");
    let submitButton = document.querySelector(
      "button[onclick='submitAward()']"
    );

    if (checkbox.checked) {
      // Highlight row
      selectedRow.style.backgroundColor = "yellow";

      // Add delete button
      let deleteButton = document.createElement("td");
      deleteButton.innerHTML = `<button type="button" onclick="onClickDelete(this)">Delete</button>`;
      selectedRow.appendChild(deleteButton);

      // Add edit button
      let editButton = document.createElement("td");
      editButton.innerHTML = `<button type="button" onclick="onClickEdit(this)">Edit</button>`;
      selectedRow.appendChild(editButton);

      // Show header buttons
      deleteCell.style.display = "table-cell";
      editCell.style.display = "table-cell";

      // Enable submit button
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "orange";
    } else {
      // Un-highlight row
      selectedRow.style.backgroundColor = "white";

      // Remove delete button cell
      let deleteButton = selectedRow.querySelector("button");
      let deleteButtonCell = deleteButton.closest("td");
      selectedRow.removeChild(deleteButtonCell);

      // Remove edit button cell
      let editButton = selectedRow.querySelector("button");
      let editButtonCell = editButton.closest("td");
      selectedRow.removeChild(editButtonCell);

      // Check if any checkboxes are still checked
      let anyChecked =
        table.querySelectorAll('tbody input[type="checkbox"]:checked').length >
        0;

      if (!anyChecked) {
        // Only hide if none are checked
        deleteCell.style.display = "none";
        editCell.style.display = "none";
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "grey";
        submitButton.style.color = "white";
      }
    }
  };

  window.onClickDelete = function (deleteButton) {
    let selectedRow = deleteButton.closest("tr");
    let studentCell = selectedRow.children[1];
    let index = studentCell.textContent.split(" ")[1];
    let nextRow = selectedRow.nextElementSibling;
    selectedRow.remove();
    nextRow.remove();

    alert(`Student ${index} Record deleted successfully`);
  };

  window.onClickEdit = function (editButton) {
    let selectedRow = editButton.closest("tr");
    let studentCell = selectedRow.children[1];
    let index = studentCell.textContent.split(" ")[1];

    let edit = prompt(`Edit details of Student ${index}`);
    if (edit != null && edit != "") {
      alert(`Student ${index} data updated successfully`);
    }
  };

  window.onClickOpen = function (image) {
    let selectedRow = image.closest("tr");
    let nextRow = selectedRow.nextElementSibling;

    if (nextRow.style.display == "none") {
      nextRow.style.display = "table-row";
    } else {
      nextRow.style.display = "none";
    }
  };
});
