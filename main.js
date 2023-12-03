///////////////////////////////////////////////////////////////////////////
///////// Parameters for controlling various aspects of the simulation
//////////////////////////////////////////////////////////////////////////
// Canvas size percentage to make it responsive
let canvasPercentage = 0.9;
// Frame count modifier (controls the variation speed)
let frameModifier = 200;
// Sample density modifier (affects the number of samples)
let sampleDensityModifier = 40;
// Sphere radius percentage (adjust to change the size of the spheres)
let sphereRadiusPercentage = 0.4;
// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
let upperHemisphereVerticalAdjustment = 0.95;
// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
let lowerHemisphereVerticalAdjustment = 1.35;
// Fill color for points (modifies point color; currently set to black)
let pointFillColor = 0;
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
///////// Set up canvas based on window dimensions
function setup() {
  createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}

///////////////////////////////////////////////////////////////////////////
///////// Draw function to create the visual
function draw() {
  background('#d1d6e6');

  // Parameters influencing sample distribution
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame; // Calculates the angular separation between samples
  let nSamples = 0;

  // Set up sphere properties
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Adjusting for vertical separation between spheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Rendering the upper hemisphere
  noStroke();
  fill(pointFillColor);
  
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the upper hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - y * 0.25) * sphereRadius;

      // Draw the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Rendering the lower hemisphere
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Calculate the position of each sample point on the lower hemisphere
      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + y * 0.25) * sphereRadius;

      // Draw the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Display the number of samples taken in the simulation
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);

  // Adjust value to increase/decrease separation between visual 
  // and title of work; currently positioned 60px below visual
  drawTitle("Radiant Reverberations", 60);
}

///////////////////////////////////////////////////////////////////////////
///////// Set labels with specified styling, position, and alignment
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(width < 600 ? 16 : 28); // Calculate responsive textSize based on screen
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Set up the static label with color
  fill('#01af52');
  text(label, x, y + 45);

  // Set up the dynamic label with color; currently set to black
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);

  pop();
}

/////////////////
///////// Set title work
// Function to draw the title
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");

  // Adjust font size based on screen width
  textSize(width < 600 ? map(width, 0, 600, 16, 28) : 40);

  fill('#01af52');
  textAlign(CENTER);
  text(title, width / 2, height - yOffset);

  pop();
}

///////////////////////////////////////////////////////////////////////////
///////// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
