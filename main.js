// Parameters for controlling various aspects of the simulation
let canvasPercentage = 0.9;
let frameModifier = 200;
let sampleDensityModifier = 40;
let sphereRadiusPercentage = 0.4;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.35;

// For the upper hemisphere light source
let upperLightSourceX = 0.1; // Adjust as needed
let upperLightSourceY = 0.1; // Adjust as needed

// For the lower hemisphere light source
let lowerLightSourceX = 0.9; // Adjust as needed
let lowerLightSourceY = 0.1; // Adjust as needed

// Set up canvas based on window dimensions
function setup() {
  createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}

// Draw function to create the visual
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

      // Calculate distance from light source for upper hemisphere
      let distanceToUpperLight = dist(sampleX, sampleY, upperLightSourceX * width, upperLightSourceY * height);

      // Set color for upper hemisphere based on distance
      let gradientColorUpper = lerpColor(color('#01af52'), color('#FFFFFF'), map(distanceToUpperLight, 0, width / 2, 0, 1));
      fill(gradientColorUpper);

      // Draw the sample point for the upper hemisphere
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

      // Calculate distance from light source for lower hemisphere
      let distanceToLowerLight = dist(sampleX, sampleY, lowerLightSourceX * width, lowerLightSourceY * height);

      // Set color for lower hemisphere based on distance
      let gradientColorLower = lerpColor(color(0), color('#FFFFFF'), map(distanceToLowerLight, 0, width / 2, 0, 1));
      fill(gradientColorLower);

      // Draw the sample point for the lower hemisphere
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Display the number of samples taken in the simulation
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);

  // Adjust value to increase/decrease separation between visual 
  // and title of work; currently positioned 40px below visual
  drawTitle("Radiant Reverberations", 40);
}

// Set labels with specified styling, position, value, and alignment
function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");

  // Calculate responsive textSize based on the canvas width
  const responsiveTextSize = width < 600 ? 16 : 28;

  textSize(responsiveTextSize);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  // Set up the static label with color
  fill('#01af52');
  text(label, x, y + 45); // Adjust value to position the label

  // Set up the dynamic label with color; currently set to black
  fill(0);
  text(value, x + textWidth(label + ' '), y + 45); // Adjust value to position the label

  pop();
}

// Set up title work
function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? 28 : 40); // Adjust font size based on screen width
  fill('#01af52');
  textAlign(CENTER);
  text(title, width / 2, height + yOffset);

  pop();
}

// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
