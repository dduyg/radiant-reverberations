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


function setFooterFontSize() {
  const title = document.getElementById("footerTitle");
  const width = window.innerWidth;

  title.style.fontSize = width < 600 ? map(width, 0, 600, 16, 28) + "px" : "28px";
}

// Call the function initially and on window resize
setFooterFontSize();
window.addEventListener("resize", setFooterFontSize);
