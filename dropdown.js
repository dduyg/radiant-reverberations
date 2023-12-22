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


function adjustFontSize() {
  const title = document.querySelector('h1');
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  title.style.fontSize = width < 600 ? `${map(width, 0, 600, 16, 28)}px` : '28px';
}

window.addEventListener('resize', adjustFontSize);
window.addEventListener('load', adjustFontSize);
