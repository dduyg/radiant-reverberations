/*
=======================================================
   Title-related Code
=======================================================
*/

// Function to draw the title below the animating visual
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? 24 : 40);
  textAlign(CENTER);
  fill('#01af52');
  text(title, width / 2, height + yOffset);
  pop();
}

// Draw the title below the animating visual
drawTitle("Radiant Reverberations", 40);

/*
=======================================================
*/
