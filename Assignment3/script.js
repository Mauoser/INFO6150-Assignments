document.addEventListener("DOMContentLoaded", function () {
  let addStudent = function () {
    let table = document.getElementById("myTable");
    let tbody = table.querySelector("tbody");

    // Count how many studentRows exist right now
    let studentRows = tbody.querySelectorAll('tr[id^="studentRow"]');
    let newIndex = studentRows.length + 1; // Next number in sequence

    // Create new row
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", "studentRow " + newIndex);

    let newCheckboxCell = document.createElement("td");
    newCheckboxCell.innerHTML = `<input type="checkbox" onclick="onClickCheckbox(this)">
    <br><input type="image" src="images/arrow.png" alt="Open" width="30" height="30" onclick="onClickOpen(this)">`;

    let studentDetails = document.createElement("tr");
    studentDetails.innerHTML = `<td colspan="8"><div>Student ${newIndex} Details:<br><br>
    Award Details: Honors Student<br>
    Fall 1-2024 (TA)<br>
    Comments: Outstanding<br>
    Award Status: A</div></td>`;
    studentDetails.style.display = "none";

    let newStudentCell = document.createElement("td");
    newStudentCell.textContent = `Student ${newIndex}`;

    let newAdvisorCell = document.createElement("td");
    newAdvisorCell.textContent = `Advisor ${newIndex}`;

    let newAwardCell = document.createElement("td");
    newAwardCell.textContent = `Approved`;

    let newSemesterCell = document.createElement("td");
    newSemesterCell.textContent = `Fall`;

    let newTypeCell = document.createElement("td");
    newTypeCell.textContent = `TA`;

    let budget = 12345 + (newIndex - 1) * 11111;
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
      alert(`Student ${newIndex} Record added successfully`);
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

    reindexStudents();

    // After deleting, check if any checkboxes are still selected
    let table = document.getElementById("myTable");
    let submitButton = document.querySelector(
      "button[onclick='submitAward()']"
    );
    let headerRow = table.querySelector("thead tr");
    let deleteCell = headerRow.cells[8];
    let editCell = headerRow.cells[9];

    let anyChecked =
      table.querySelectorAll('tbody input[type="checkbox"]:checked').length > 0;

    if (!anyChecked) {
      deleteCell.style.display = "none";
      editCell.style.display = "none";
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "grey";
      submitButton.style.color = "white";
    }
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

  window.submitAward = function (submitAward) {
    alert("Selected awards submitted successfully");
  };

  function reindexStudents() {
    let table = document.getElementById("myTable");
    let tbody = table.querySelector("tbody");
    let studentRows = tbody.querySelectorAll('tr[id^="studentRow"]');

    let count = 1;
    studentRows.forEach((row) => {
      row.id = "studentRow " + count;
      row.children[1].textContent = `Student ${count}`;
      row.children[2].textContent = `Advisor ${count}`;
      // Update details row
      let detailsRow = row.nextElementSibling;
      if (detailsRow) {
        detailsRow.querySelector(
          "div"
        ).innerHTML = `Student ${count} Details:<br><br>
        Award Details: Honors Student<br>
        Fall 1-2024 (TA)<br>
        Comments: Outstanding<br>
        Award Status: A`;
      }
      count++;
    });
  }
});
