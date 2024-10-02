let chemicalData = []; // to store data

// Fetch rows from JSON and store them in LocalStorage
async function fetchtablerows() {
    try {
        // Retrieve data from localStorage
        let chemicalDataFromLocalStorage = localStorage.getItem('chemicalData');
        
        // Check if chemicalData is present in localStorage and has valid length
        if (chemicalDataFromLocalStorage) {
            // Parse the data
            chemicalData = JSON.parse(chemicalDataFromLocalStorage);
            // Check the length of the parsed data
            if (chemicalData.length > 0) {
                console.log('Using Chemicals Data from localStorage:', chemicalData);
                renderTable(chemicalData);
                return; // Exit the function if data is found
            }
        }

        // If no valid local data, fetch the JSON data from the file
        const response = await fetch('assets/chemicalsData.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Assign fetched data to chemicalData
        chemicalData = await response.json();
        console.log('Fetched Chemicals Data:', chemicalData);

        // Store fetched data in localStorage
        localStorage.setItem('chemicalData', JSON.stringify(chemicalData));

        // Call renderTable to display data after fetching or retrieving from localStorage
        renderTable(chemicalData);
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    }
}


//  renderTable rows
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (let index = 0; index < data.length; index++) {
        const row = data[index];
        const tr = document.createElement('tr');
        tr.className = 'table-row'; 
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.chemicalName}</td>
            <td>${row.vendor}</td>
            <td>${row.density}</td>
            <td>${row.viscosity}</td>
            <td>${row.packaging}</td>
            <td>${row.packSize || 'N/A'}</td>
            <td>${row.unit}</td>
            <td>${row.quantity}</td>
            <td class="action-column">
                <i class="fas fa-edit edit-icon fa-lg" onclick="makeRowEditable(${index}, this.parentElement.parentElement)"></i>
            </td>
        `;
        tr.setAttribute('data-index', index);
        tr.ondblclick = () => makeRowEditable(index, tr);
        tr.onclick = () => selectRow(index);
        tableBody.appendChild(tr);
    }
}

let selectedRow = null;
let isEditing = false;
let sortOrders = {};

function makeRowEditable(index, rowElement) {
    if (isEditing) return;
    isEditing = true;
    const cancelButton =document.getElementById("chancelbtn");
    const cancelButton2 =document.getElementById("chancelbtn2");
    cancelButton.classList.remove('disabled-btn');
    cancelButton2.classList.remove('disabled-btn');

    const saveDatabtn =document.getElementById("saveData");
    const saveDatabtn2 =document.getElementById("saveData2");
    saveDatabtn.classList.remove('disabled-btn');
    saveDatabtn2.classList.remove('disabled-btn');

    // Storing the original row data
    const originalRow = { ...chemicalData[index] };
    const row = chemicalData[index];

    // Clear existing content in the row
    rowElement.innerHTML = `
        <td>${row.id}</td>
        <td><input type="text" value="${row.chemicalName}" id="editChemicalName" class="editable-input" placeholder="Chemical Name"></td>
        <td><input type="text" value="${row.vendor}" id="editVendor" class="editable-input" placeholder="Vendor"></td>
        <td><input type="number" value="${row.density}" id="editDensity" class="editable-input" placeholder="Density"></td>
        <td><input type="number" value="${row.viscosity}" id="editViscosity" class="editable-input" placeholder="Viscosity"></td>
        <td><input type="text" value="${row.packaging}" id="editPackaging" class="editable-input" placeholder="Packaging"></td>
        <td><input type="number" value="${row.packSize || 0}" id="editPackSize" class="editable-input" placeholder="Pack Size"></td>
        <td><input type="text" value="${row.unit}" id="editUnit" class="editable-input" placeholder="Unit"></td>
        <td><input type="number" value="${row.quantity}" id="editQuantity" class="editable-input" placeholder="Quantity"></td>
        <td class="d-flex justify-content-around" ></td> <!-- Empty cell for the action buttons -->
    `;

    const savebtn=document.getElementById('saveData');
    savebtn.onclick = () => updateRow(index, rowElement);

    const savebtn2=document.getElementById('saveData2');
    savebtn2.onclick = () => updateRow(index, rowElement);

    const chancelbtn=document.getElementById('chancelbtn');
    chancelbtn.onclick = () => cancelEdit(index, rowElement, originalRow);

    const chancelbtn2=document.getElementById('chancelbtn2');
    chancelbtn2.onclick = () => cancelEdit(index, rowElement, originalRow);
    
  
}

function selectRow(index) {
    console.log(`Selecting row: ${index}`); // test
    selectedRow = index; // Set the currently selected row index
    const rows = document.querySelectorAll('#chemicalTable tbody tr'); // Select all table rows
    
    rows.forEach((row, idx) => {
        if (index === idx) {
            row.classList.add('selected-row');  // Adding the highlight class to the selected row
            console.log(`Highlighting row: ${idx}`); // Log highlighting action
        } else {
            row.classList.remove('selected-row');  // Removing the highlight class from others
        }
    });
}

// update row function call
function updateRow(index, rowElement) {
    const updatedRow = {
        id: chemicalData[index].id,
        chemicalName: document.getElementById('editChemicalName').value,
        vendor: document.getElementById('editVendor').value,
        density: parseFloat(document.getElementById('editDensity').value),
        viscosity: parseFloat(document.getElementById('editViscosity').value),
        packaging: document.getElementById('editPackaging').value,
        packSize: parseFloat(document.getElementById('editPackSize').value) || null,
        unit: document.getElementById('editUnit').value,
        quantity: parseFloat(document.getElementById('editQuantity').value),
    };
    console.log("updatedrow: ",updatedRow);
    console.log("index: ",index);

    // Update the chemicalData array
    chemicalData[index] = updatedRow;

    // Save the updated chemicalData to local storage
    localStorage.setItem('chemicalData', JSON.stringify(chemicalData));

    isEditing = false;
    renderTable(chemicalData);

    const saveDatabtn =document.getElementById("saveData");
    const saveDatabtn2 =document.getElementById("saveData2");
    saveDatabtn.classList.add('disabled-btn');
    saveDatabtn2.classList.add('disabled-btn');

    const cancelButton =document.getElementById("chancelbtn");
    const cancelButton2 =document.getElementById("chancelbtn2");
    cancelButton.classList.add('disabled-btn');
    cancelButton2.classList.add('disabled-btn');
}

// cancelEdit call
function cancelEdit(index, rowElement, originalRow) {
    chemicalData[index] = originalRow;  // Revert to original row data
    isEditing = false;
    renderTable(chemicalData);  // Re-render the table to show the original values

    const cancelButton =document.getElementById("chancelbtn");
    const cancelButton2 =document.getElementById("chancelbtn2");
    cancelButton.classList.add('disabled-btn');
    cancelButton2.classList.add('disabled-btn');

    const saveDatabtn =document.getElementById("saveData");
    const saveDatabtn2 =document.getElementById("saveData2");
    saveDatabtn.classList.add('disabled-btn');
    saveDatabtn2.classList.add('disabled-btn');
   
    
}

// search data from two column chemicalName or vendor 
function searchChemicals() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log("search term: ",searchTerm);
    // Filter chemicalData based on chemical name or vendor
    const filteredData = chemicalData.filter(item => 
        item.chemicalName.toLowerCase().includes(searchTerm) || 
        item.vendor.toLowerCase().includes(searchTerm)
    );

    // Rendertable again on the filtered data in the table
    renderTable(filteredData);
}

// toolbar functions and sortfunction 
function sortTable(columnIndex) {
    
    const columnName = Object.keys(chemicalData[0])[columnIndex];
    const isNumeric = typeof chemicalData[0][columnName] === 'number';

    // Toggle the sort order
    if (!sortOrders[columnName]) {
        sortOrders[columnName] = 'asc';
    } else {
        sortOrders[columnName] = sortOrders[columnName] === 'asc' ? 'desc' : 'asc';
    }

    chemicalData.sort((a, b) => {
        let valA = a[columnName];
        let valB = b[columnName];
        if (isNumeric) {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }
        if (valA < valB) return sortOrders[columnName] === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrders[columnName] === 'asc' ? 1 : -1;
        return 0;
    });

    renderTable(chemicalData); // render the sorted data
}

function addRow() {
    // OnAdd Scroll to the bottom of the page
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // for smooth scrolling effect
    });

    const newRow = {
        id: chemicalData.length + 1,
        chemicalName: 'New Chemical',
        vendor: 'New Vendor',
        density: 0,
        viscosity: 0,
        packaging: 'Null',
        packSize: 0,
        unit: 'NULL',
        quantity: 0
    };
    chemicalData.push(newRow);

    renderTable(chemicalData);

    const ind = chemicalData.length - 1; // Subtracting 1 to match the index (zero-based)
    const rows = document.querySelectorAll('#chemicalTable tbody tr'); // get all table rows

    rows.forEach((row, idx) => {
        if (ind === idx) {
            row.classList.add('selected-row');  // Adding the highlight class to the newly added row
            console.log(`Highlighting row: ${idx}`); // Log highlighting action
        } else {
            row.classList.remove('selected-row');  // Remove the highlight class from others
        }
    });
}

// delte the rows 
function deleteRow() {
    if (selectedRow !== null) {
        // Remove the selected row from the chemicalData array
        chemicalData.splice(selectedRow, 1);
        
        // Save the updated chemicalData to local storage
        localStorage.setItem('chemicalData', JSON.stringify(chemicalData));
        
        // Re-render the table to reflect the changes
        renderTable(chemicalData);
        
        // Reset selectedRow to null after deletion
        selectedRow = null;
    }
}

// move up , down and referesh starts here 

function moveRowUp() {
    const table = document.getElementById('tableBody');
    const currentRow = table.querySelector(`[data-index="${selectedRow}"]`);

    if (selectedRow > 0 && currentRow) {
        // Finding the previous row
        const previousRow = table.querySelector(`[data-index="${selectedRow - 1}"]`);
        if (previousRow) {
            // Moving the currentRow before the previousRow in the DOM
            table.insertBefore(currentRow, previousRow);

            // Updating the data-index attributes to reflect the swap
            currentRow.setAttribute('data-index', selectedRow - 1);
            previousRow.setAttribute('data-index', selectedRow);

            // Update storedData to reflect the new order
            const temp = chemicalData[selectedRow];
            chemicalData[selectedRow] = chemicalData[selectedRow - 1];
            chemicalData[selectedRow - 1] = temp;

            // Update storedData to localStorage
            localStorage.setItem('chemicalData', JSON.stringify(chemicalData));

            // Update the selectedRow to the new index of the moved row
            selectedRow -= 1; // Decrease the selectedRow index by 1 since it's moved up
            selectRow(selectedRow); // Re-select the newly moved row
        }
    }
}


function moveRowDown() {
    const table = document.getElementById('tableBody');
    const currentRow = table.querySelector(`[data-index="${selectedRow}"]`);

    if (selectedRow < table.rows.length - 1 && currentRow) {
        const nextRow = table.querySelector(`[data-index="${selectedRow + 1}"]`);
        if (nextRow) {
            // Swapping the rows in the DOM by moving the nextRow before the currentRow
            table.insertBefore(currentRow, nextRow.nextSibling); // Place currentRow after nextRow

            // Updating the data-index attributes to reflect the swap
            currentRow.setAttribute('data-index', selectedRow + 1);
            nextRow.setAttribute('data-index', selectedRow);

            // Updating the selectedRow index
            selectedRow++;

            // Updating storedData to reflect the new order
            [chemicalData[selectedRow], chemicalData[selectedRow - 1]] = [chemicalData[selectedRow - 1], chemicalData[selectedRow]];
            localStorage.setItem('chemicalData', JSON.stringify(chemicalData));

            // Re-rendering the table 
            renderTable(chemicalData);

            // again highlightingrow
            selectRow(selectedRow);
        }
    }
}
// refresh data of table
function refreshTable() {
    const loader = document.getElementById('loader');
    const tableContainer = document.getElementById('chemicalTable'); 
    // Show loader
    loader.style.display = 'block';

    // blur effect to the background till 2 sec
    tableContainer.classList.add('blur-background');
    // wait for 2 seconds for data fetch
    setTimeout(() => {        
        fetchtablerows(); 
        loader.style.display = 'none';
        tableContainer.classList.remove('blur-background');
    }, 2000); // 2 seconds delay
}

// Creating a worksheet from the JSON data
async function ExportData() {
    try {
        
        const worksheet = XLSX.utils.json_to_sheet(chemicalData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Chemical Data');
        XLSX.writeFile(workbook, 'chemical_data.xlsx');

    } catch (error) {
        console.error('Error fetching or saving data:', error);
    }
}
// sving data in localstore if not stored
function saveDatainlocals(){
    localStorage.setItem('data', JSON.stringify("avinashsingh"));
        alert("State saved!");
}
// move up , down and referesh ends here 


// pwa worker code 
//this is worker file for the pwa 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    });
}
// worker ends here 

// Event listeners for sorting on column headers
document.querySelectorAll('#chemicalTable thead th').forEach((th, index) => {
    th.onclick = () => sortTable(index);
});

// fetch table data function call 
fetchtablerows();