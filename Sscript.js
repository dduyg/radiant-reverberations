// Set up the canvas using p5.js
function setup() {
  // Use percentages for canvas size to make it responsive
  const canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
}

// Draw function to create the visual representation
function draw() {
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

  // Draw upper hemisphere
  noStroke();
  fill(0);
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

  // Adjust this value for the desired vertical separation between the two spheres relative to the canvas size
  const yOffset = height * 0.3;

  // Draw lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate and draw each circle for the lower hemisphere
      circle(x * radius + cx, cy + radius + yOffset - (z + y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Display the number of samples
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);
}

// Function to draw a label with specified position, label text, value, and alignment
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
  
  // Set label color and draw label
  fill('#01af52');
  text(label, x, y + 45); // Adjust value to position label
  // Set value color and draw value
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust value to position label
  
  pop();
}
