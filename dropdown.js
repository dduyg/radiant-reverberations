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

  // Adapts font size between 16 and 30 according to screen width;
  footer.style.fontSize = screenWidth < 600 ? `${map(screenWidth, 0, 600, 16, 28)}px` : '30px';
}

// Call the function initially and whenever the window is resized
adjustFooterSize();
window.addEventListener('resize', adjustFooterSize);
