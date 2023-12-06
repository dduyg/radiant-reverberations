// Parameters for controlling various aspects of the simulation
let canvasPercentage = 0.9;
let frameModifier = 200;
let sampleDensityModifier = 40;
let sphereRadiusPercentage = 0.4;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.35;
let pointFillColor = 0;

// Light source parameters for the upper hemisphere
let upperLightSourceX = 0.1; // Adjust as needed
let upperLightSourceY = 0.1; // Adjust as needed

// Light source parameters for the lower hemisphere
let lowerLightSourceX = 0.9; // Adjust as needed
let lowerLightSourceY = 0.1; // Adjust as needed

function setup() {
  createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}

function draw() {
  background('#d1d6e6');

  // Parameters influencing sample distribution
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Set up sphere properties
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Adjusting for vertical separation between spheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Calculate the position of the virtual light source for the upper hemisphere
  let upperLightPosX = width * upperLightSourceX;
  let upperLightPosY = height * upperLightSourceY;
  let upperNormalizedValue = map(upperLightPosX, 0, width, 0, 1);

  // Calculate the position of the virtual light source for the lower hemisphere
  let lowerLightPosX = width * lowerLightSourceX;
  let lowerLightPosY = height * lowerLightSourceY;
  let lowerNormalizedValue = map(lowerLightPosX, 0, width, 0, 1);

  // Rendering the upper hemisphere
  noStroke();
  fill(lerpColor(color('#01af52'), color('#ffffff'), upperNormalizedValue));
  
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - y * 0.25) * sphereRadius;

      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Rendering the lower hemisphere
  fill(lerpColor(color('#000000'), color('#808080'), lowerNormalizedValue));
  
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + y * 0.25) * sphereRadius;

      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Display the number of samples taken in the simulation
  drawLabel(8, 32, "Number of samples ", nSamples, LEFT);

  // Adjust value to increase/decrease separation between visual 
  drawTitle("Radiant Reverberations", 40);
}

function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(width < 600 ? 16 : 28);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }

  fill('#01af52');
  text(label, x, y + 45);

  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);
  
  pop();
}

function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? 28 : 40);
  fill('#01af52');
  textAlign(CENTER);
  text(title, width / 2, height + yOffset);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
