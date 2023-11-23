function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#d1d6e6');

  const div = pow(2, floor((frameCount % 180) / 40)) * 8;

  const sampleDelta = PI / div;
  let nSamples = 0;

  const radius = min(width, height) * 0.4;
  const cx = width / 2;
  const cy = height / 2 - radius * 0.5; // Adjusted to move the center above the middle

  noStroke();
  fill(0);

  // Draw the first sphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Adjusted the y-coordinate calculation
      circle(x * radius + cx, cy + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw the vertically flipped sphere below the first one
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Adjusted the y-coordinate calculation for the flipped sphere
      circle(x * radius + cx, cy + (z + y * 0.25) * radius + radius, 2);
      nSamples++;
    }
  }

  drawLabel(8, 32, "Number of samples " + nSamples, LEFT);
}

function drawLabel(x, y, label, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(15);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }
  text(label, x, y);
  pop();
}

// added

function toggleInfo() {
  const dropdown = document.getElementById("infoDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function closeInfo() {
  document.getElementById("infoDropdown").style.display = "none";
}
