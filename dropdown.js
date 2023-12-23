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

  // Adapts font size between 18 and 28 according to screen width
  footer.style.fontSize = `${Math.max(18, Math.min(28, map(screenWidth, 0, 600, 18, 28)))}px`;
}

// Call the function initially and whenever the window is resized
adjustFooterSize();
window.addEventListener('resize', adjustFooterSize);
