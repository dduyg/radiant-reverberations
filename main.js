// Set up the canvas
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Parameters for controlling the dynamics
let frameModifier = 200;
let sampleDensityModifier = 40;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.5;
let lightSourcePosition = 0.0;

// Main drawing function
function draw() {
  clear();

  // Calculate samples per frame based on modifiers
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;
  let nSamples = 0;

  // Calculate sphere properties based on screen size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculate hemisphere centers
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Draw samples on upper hemisphere
  nSamples += drawHemisphereSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta);
  // Draw samples on lower hemisphere
  nSamples += drawHemisphereSamples(lowerHemisphereCenterY, -sphereRadius, sampleAngularDelta);

  // Update light source position
  lightSourcePosition += 0.01;

  // Draw label with project title and sample count
  drawLabel(8, 46, "Radiant Reverberations", "Number of samples: ", nSamples, LEFT);
}

// Function to draw samples on a hemisphere
function drawHemisphereSamples(centerY, hemisphereRadius, angularDelta) {
  noStroke();
  fill(0);

  let nSamples = 0;

  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += angularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += angularDelta) {
      // Calculate sample position in spherical coordinates
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotate sample based on light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate final sample position
      const sampleX = rotatedX * hemisphereRadius + sphereCenterX;
      const sampleY = centerY + z * hemisphereRadius - rotatedY * 0.25 * hemisphereRadius;

      // Draw the sample
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  return nSamples; // Return the number of samples
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
