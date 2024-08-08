const displayImg = document.getElementById("original-gif");
const inputGif = document.getElementById("input-gif");
const splitButton = document.getElementById("split-button");
const splitTable = document.getElementById("table-container");
const body = document.body;

body.addEventListener("onload", handleOnload);
inputGif.addEventListener("change", handleFiles);
splitButton.addEventListener("click", handleSplit);


/**
 * Sets values on reload
 */
function handleOnload() {

  // Disable split
  splitButton.setAttribute("disabled", "")
}

/**
 * Sets the image to use when user uploads 
 */
function handleFiles() {

  // Disable split
  splitButton.setAttribute("disabled", "")

  // Get file if exists
  let gifFile = inputGif.files[0];

  // Remove old image
  splitTable.replaceChildren();

  // Hide warning
  document.getElementById("invalid-file").setAttribute("hidden", "");

  // Validate file type
  if (!validateFile(gifFile)){

    // Show warning
    document.getElementById("invalid-file").removeAttribute("hidden");

    // Hide original image
    displayImg.setAttribute("hidden", "");

    return
  }

  // Check if exists
  if (gifFile) {
    // Initialize reader
    var reader = new FileReader();

    // Assign file to image component
    reader.onload = function () {
      displayImg.src = reader.result;
    };

    // Read uploaded file
    reader.readAsDataURL(gifFile);

    // Remove old image
    splitTable.replaceChildren();

    // Show image
    displayImg.removeAttribute("hidden")

    // Enable split
    splitButton.removeAttribute("disabled")
  }
}


/**
 * Splits and displays the image base on user inputs
 */
function handleSplit() {

  // Get input rows and columns
  let inputDim = {rows: document.getElementById("split-row")?.value, cols: document.getElementById("split-col")?.value};

  // Get original image width and height
  let orignalDim = {width: displayImg.width, height: displayImg.height};

  // Validate inputs
  if (validateInputs(inputDim, orignalDim)) {

    // Create split table
    generateSplitTable(inputDim, orignalDim);

    // Hide original image
    displayImg.setAttribute("hidden", "");

    // Hide warning
    document.getElementById("invalid-input").setAttribute("hidden", "");
  }
  else {
    // Show warning
    document.getElementById("invalid-input").removeAttribute("hidden");
  }
}


/**
 * Checks if uploaded file is the right type
 * 
 * @param {Object} gifFile - file uploaded by user
 * @returns {Boolean} - true if file is valid, false if not
 */
function validateFile(gifFile) {
  
  const ext = ['.jpg', '.gif', '.png', '.svg'];

  // Check if supporeted extension
  return ext.some(elem => gifFile.name.toLowerCase().endsWith(elem));
}


/**
 * Checks if given rows and columns are valid
 * 
 * @param {Object} inputDim - holds the given rows and columns
 * @param {Object} orignalDim - holds the width and height of the given image
 * @returns {Boolean} - true if the dimensions are valid, false if not
 */
function validateInputs(inputDim, orignalDim) {

  // Check given rows
  if (typeof inputDim.rows == undefined || 0 >= inputDim.rows || inputDim.rows > orignalDim.height){
    // Add text to warning
    document.getElementById("input-dimension").textContent = " rows";

    return false;
  }

  // Check given columns
  if (typeof inputDim.cols == undefined || 0 >= inputDim.cols || inputDim.cols > orignalDim.width){
    // Add text to warning
    document.getElementById("input-dimension").textContent = " columns";

    return false
  }
    
  // Check if inputs are greater than the pixels
  return true
}


/**
 * Generate the split image table and sets it on the document
 * 
 * @param {Object} inputDim - holds the given rows and columns
 * @param {Object} orignalDim - holds the width and height of the given image
 */
function generateSplitTable(inputDim, orignalDim){

  // Calculate cell dimensions 
  let cellDim = {width: orignalDim.width/inputDim.cols, height: orignalDim.height/inputDim.rows};
  
  // Generate split table body
  const tableBody = document.createElement("table-body");

  // Generate appropriate number of rows
  for (let x = 0; x < inputDim.rows; x++){
    let curRow = document.createElement("tr")

    // Generate appropriate number of columns
    for (let y = 0; y < inputDim.cols; y++){

      // Create inner elements
      let curCol = document.createElement("td")
      let curCell = document.createElement("div")
      let curImg = document.createElement("img")

      // Set element attributes
      curCell.setAttribute("style", `width:${cellDim.width}px; height:${cellDim.height}px; overflow:hidden;`);
      curImg.setAttribute("src", displayImg.src)
      curImg.setAttribute("class", "dim-limit")
      curImg.setAttribute("style", `margin-top:-${x * cellDim.height}px; margin-left: -${y * cellDim.width}px`);
      

      // Insert elements to row
      curCell.appendChild(curImg)
      curCol.appendChild(curCell)
      curRow.appendChild(curCol)
    }

    // Insert row to table body
    tableBody.appendChild(curRow)
  }

  // Replace current children with generated body
  splitTable.replaceChildren(tableBody);
}
