// Set up the canvas
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
}

// Draw function, called continuously
function draw() {
  // Set background color
  background('#d1d6e6');

  // Control the pattern parameters with frameCount
  const div = pow(2, floor((frameCount % 190) / 40)) * 8;

  // Calculate the angular step for sampling
  const sampleDelta = PI / div;
  let nSamples = 0;

  // Set the radius of the spheres
  const radius = min(width, height) * 0.4;
  const cx = width / 2; // Center x-coordinate

  // Move the center of the first sphere higher
  const cy = height / 2 - radius * 0.9; // Adjust this value for the desired height
  // A higher value lifts the first sphere, making it closer to the top of the canvas
  // Experiment with different values to see the impact on the positioning

  // No stroke for circles, fill with black
  noStroke();
  fill(0);

  // Draw the first sphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);

      // Adjust the x-coordinate calculation for wider horizontal stretch
      const y = sin(theta) * sin(phi);
      const z = cos(theta);
      circle(cx + (x - y * 0.25) * radius, cy + z * radius, 2);
      nSamples++;
    }
  }

  // Increase the vertical separation between the two spheres
  const yOffset = 170; // Adjust this value for the desired vertical separation
  // A higher value increases the distance between the two spheres
  // Experiment with different values to achieve the desired separation

  // Draw the vertically flipped sphere below and a lot lower than the first one
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);

      // Adjust the x-coordinate calculation for wider horizontal stretch
      const y = sin(theta) * sin(phi);
      const z = cos(theta);
      circle(cx + (x - y * 0.25) * radius, cy + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
  drawLabel(8, 32, "Number of samples " + nSamples, LEFT);
}

// Function to draw a labeled text
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
  // Adjusted the y-coordinate to move the label lower
  text(label, x, y + 40);
  pop();
}

// Function to toggle the visibility of additional information
function toggleInfo() {
  const dropdown = document.getElementById("infoDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// Function to close the additional information dropdown
function closeInfo() {
  document.getElementById("infoDropdown").style.display = "none";
}
