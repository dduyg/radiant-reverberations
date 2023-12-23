/***********************************
 *           infoDropdown          *
 ***********************************/
function toggleInfo() {
  const dropdown = document.getElementById("infoDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function closeInfo() {
  document.getElementById("infoDropdown").style.display = "none";
}
/***********************************/


function adjustFooterSize() {
  let footer = document.querySelector('footer');
  let screenWidth = window.innerWidth;

  // Adapts font size between 17 and 28 according to screen width
  let fontSize = screenWidth < 600 ? map(screenWidth, 0, 600, 17, 28) : 28;

  footer.style.fontSize = `${fontSize}px`;
}

// Call the function initially and whenever the window is resized
adjustFooterSize();
window.addEventListener('resize', adjustFooterSize);
