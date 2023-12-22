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
  const title = document.querySelector('footer h1');
  const width = window.innerWidth;

  if (width >= 600) {
    title.style.fontSize = '28px';
  } else {
    const newSize = map(width, 0, 600, 16, 28);
    title.style.fontSize = `${newSize}px`;
  }
}

// Call the function on page load and window resize
window.onload = adjustFontSize;
window.onresize = adjustFontSize;
