// Parameters for controlling various aspects of the simulation
let canvasPercentage = 0.9;
let frameModifier = 200;
let sampleDensityModifier = 40;
let sphereRadiusPercentage = 0.4;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.5;
let pointFillColor = 0;

let upperLightSourceTheta = 0.0; // Adjust for upper hemisphere light source position
let lowerLightSourceTheta = PI; // Adjust for lower hemisphere light source position

function setup() {
  let cnv = createCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
  cnv.id('p5-canvas');
}

function draw() {
  background('#d1d6e6');

  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Rendering the upper hemisphere
  noStroke();
  fill(pointFillColor);

  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - y * 0.25) * sphereRadius;

      const adjustedTheta = theta + upperLightSourceTheta;

      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Rendering the lower hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      const sampleX = x * sphereRadius + sphereCenterX;
      const sampleY = lowerHemisphereCenterY - (z + y * 0.25) * sphereRadius;

      const adjustedTheta = theta + lowerLightSourceTheta;

      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Display the number of samples taken in the simulation
  drawLabel(8, 46, "Number of samples ", nSamples, LEFT);

  // Display title of work
  drawTitle("Radiant Reverberations", 2);
}

function drawLabel(x, y, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }
  textSize(width < 600 ? 15 : 22);

  fill('#01af52');
  text(label, x, y + 45);

  fill(0);
  text(value, x + textWidth(label + ' '), y + 45);

  pop();
}

function drawTitle(title, yOffset) {
  push();
  textFont("Space Mono");
  textSize(width < 600 ? map(width, 0, 600, 16, 28) : 32);

  fill('#01af52');
  textAlign(CENTER);
  text(title, width / 2, height - yOffset);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth * canvasPercentage, windowHeight * canvasPercentage);
}
