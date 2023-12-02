// ------------------ Displaying title work below it ------------------
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? 24 : 40);
  textAlign(CENTER);
  fill('#01af52');
  text(title, width / 2, height + yOffset);
  pop();
}

// Adjust value to increase/decrease separation between visual and title; currently positioned 40px below visual
drawTitle("Radiant Reverberations", 40);

// --------------------------------------------------------------------
