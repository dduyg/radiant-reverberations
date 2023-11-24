// Set up the canvas
function setup() {
  // Use percentages for canvas size to make it responsive
  const canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
}

// Draw function, called continuously
function draw() {
  // Set background color
  background('#d1d6e6');

  // Control the pattern parameters with frameCount
  const div = pow(2, floor((frameCount % 200) / 40)) * 9;

  // Calculate the angular step for sampling
  const sampleDelta = PI / div;
  let nSamples = 0;

  // Set the radius of the spheres relative to the canvas size
  const radius = min(width, height) * 0.4;
  const cx = width / 2; // Center x-coordinate

  // Move the center of the first sphere relative to the canvas size
  const cy = height / 2 - radius * 0.9; // Adjust this value for the desired height

  // No stroke for circles, fill with black
  noStroke();
  fill(0);

  // Draw the first sphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate and draw each circle
      circle(x * radius + cx, cy + (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Increase the vertical separation between the two spheres relative to the canvas size
  const yOffset = height * 0.3; // Adjust this value for the desired vertical separation

  // Draw the vertically flipped sphere below and a lot lower than the first one
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate and draw each circle for the second sphere
      circle(x * radius + cx, cy + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a labeled text
function drawLabel(x, y, label, value, align = CENTER) {
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
  
  // Draw the static label & set color for the static label
  fill('#01af52'); // Change this to the desired color
  // Adjust the value to move the label lower
  text(label, x, y + 60);
  // Set color for the dynamic value
  fill(0); // Keep this as black
  // Draw the dynamic value
  text(value, x + textWidth(label + ' '), y + 60); // Adjust the value to move the label lower
  
  pop();
}

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
