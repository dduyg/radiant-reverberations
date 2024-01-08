// Setting up the canvas
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Parameters for dynamic variations
let frameModifier = 200;
let sampleDensityModifier = 40;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.5;
let lightSourcePosition = 0.0;

// Main drawing function
function draw() {
  clear();

  // Calculating samples per frame based on modifiers
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;

  // Defining sphere properties
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculating hemisphere center positions
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Rendering samples for upper and lower hemispheres
  let nUpperSamples = renderHemisphereSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, 1);
  let nLowerSamples = renderHemisphereSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, -1);

  // Updating light source position for animation
  lightSourcePosition += 0.002;

  // Displaying information about the project
  displayInfo(8, 46, "Radiant Reverberations", "Number of samples: ", nUpperSamples + nLowerSamples, LEFT);
}

// Function to render samples on a hemisphere
function renderHemisphereSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, direction) {
  noStroke();
  fill(0);

  let nSamples = 0;

  // Looping through angular coordinates for sampling
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      // Calculating sample coordinates in spherical space
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotating the coordinates based on the light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Mapping coordinates to screen space
      const sampleX = rotatedX * sphereRadius + width / 2;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Rendering the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  return nSamples;
}

// Function to display project information
function displayInfo(x, y, title, label, value, align = CENTER) {
  push();
  strokeWeight(0);
  textAlign(align);
  if (align == LEFT) {
    x += 4;
  }
  if (align == RIGHT) {
    x -= 4;
  }

  // Styling project title
  const titleFontSize = width < 600 ? 19 : 24;
  const labelValueFontSize = width < 600 ? 17 : 22;

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

  // Displaying label and value
  const verticalSpace = titleFontSize * 0.4;
  y += verticalSpace;

  textStyle(NORMAL);
  fill('#01af52');
  textFont("monospace");
  textSize(labelValueFontSize);
  text(`${label} `, x, y + 70);

  fill(0);
  text(value, x + textWidth(label), y + 70);

  pop();
}

// Handling window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
