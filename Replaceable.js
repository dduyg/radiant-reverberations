// Set up the canvas for the irradiance sampling display.
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Define parameters for sampling and light source
let frameModifier = 200; // Controls frame variation
let sampleDensityModifier = 40; // Influences sample density
let upperHemisphereVerticalAdjustment = 0.95; // Adjusts upper hemisphere position
let lowerHemisphereVerticalAdjustment = 1.5; // Adjusts lower hemisphere position
let lightSourcePosition = 0.0; // Initial position of the light source

// Perform irradiance sampling and visualize dynamic patterns.
function draw() {
  clear();

  // Calculate the number of samples per frame based on modifiers.
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Set the sphere's radius percentage based on window size.
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculate positions of upper and lower hemispheres.
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Visualize irradiance samples on the upper hemisphere.
  visualizeIrradianceSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, true);

  // Visualize irradiance samples on the lower hemisphere.
  visualizeIrradianceSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, false);

  // Move the light source position for dynamic visualization.
  lightSourcePosition += 0.01;

  // Display label with relevant information.
  drawLabel(8, 46, "Radiant Reverberations", "Number of samples: ", nSamples, LEFT);
}

// Visualize irradiance samples on a hemisphere.
function visualizeIrradianceSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, isUpper) {
  noStroke();
  fill(0);

  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      // Calculate 3D coordinates on the sphere.
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotate sample based on the light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate final sample position
      const sampleX = rotatedX * sphereRadius + sphereCenterX;
      const sampleY = hemisphereCenterY + (isUpper ? z - rotatedY * 0.25 : - (z + rotatedY * 0.25)) * sphereRadius;

      // Visualize the sample as a small circle.
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }
}

// Set labels with specified styling, position, and alignment
/////////////////////////////////////////////////////////////
function drawLabel(x, y, title, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textAlign(align);
  if (align == LEFT) {
    x += 4;
  }
  if (align == RIGHT) {
    x -= 4;
  }

  // Font size title 19 if screen width is less than 600px, otherwise 24
  const titleFontSize = width < 600 ? 19 : 24;
  // Font size label 15 if screen width is less than 600px, otherwise 20
  const labelValueFontSize = width < 600 ? 15 : 20;

  // Set up the title of work
  textStyle(BOLD);
  fill('#01af52');
  textFont("Space Mono");
  textSize(titleFontSize);
  const titleWidth = textWidth(title);
  const padding = 3;
  noStroke();
  rect(x - padding, y + 45 - titleFontSize + padding / 2, titleWidth + 2 * padding, titleFontSize + padding);
  fill('#d1d6e6');
  text(title, x, y + 45);

  // Add a bit more space between the first and second lines
  const verticalSpace = titleFontSize * 0.2;
  y += verticalSpace;

  // Set up the static label
  textStyle(NORMAL);
  fill('#01af52');
  textFont("monospace");
  textSize(labelValueFontSize);
  text(`${label} `, x, y + 70);

  // Set up the dynamic value of label; currently set to black
  fill(0);
  text(value, x + textWidth(label), y + 70);

  pop();
}

// Update canvas size when the window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    }