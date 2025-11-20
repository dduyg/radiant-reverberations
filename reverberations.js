// Initialize canvas and set its ID
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Define parameters for sampling and light source
let frameModifier = 200; // Controls frame variation speed
let sampleDensityModifier = 40; // Controls sample density
let upperHemisphereVerticalAdjustment = 0.95; // Adjusts upper hemisphere position
let lowerHemisphereVerticalAdjustment = 1.5; // Adjusts lower hemisphere position
let lightSourcePosition = 0.0; // Initial position of the virtual light source

// The main function responsible for updating and rendering the irradiance sampling display
function draw() {
  clear();

  // Calculate the number of samples per frame based on parameters
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;

  // Set sphere properties based on screen size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculating positions of upper and lower hemispheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Rendering the upper hemisphere
  let nUpperSamples = renderHemisphereSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, 1);

  // Rendering the lower hemisphere
  let nLowerSamples = renderHemisphereSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, -1);

  // Move virtual light source position
  lightSourcePosition += 0.002;

  // Display labels with title and sample count
  displayInfo(8, 46, "Radiant Reverberations", "Number of samples: ", nUpperSamples + nLowerSamples, LEFT);
}

// The function that renders samples on a hemisphere based on the given parameters
function renderHemisphereSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, direction) {
  noStroke();
  fill(0);
  
  // Initialize nSamples for each hemisphere
  let nSamples = 0;

  // Iterating through the entire spherical surface to cover all sample points
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      // Calculate 3D coordinates in spherical space
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotating sample coordinates based on the light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Mapping final sample position on the canvas
      const sampleX = rotatedX * sphereRadius + width / 2;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Render the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }
  
  // Return the total number of samples for this hemisphere
  return nSamples;
}

// Displaying information labels with specified styling, position, and alignment
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

  // Font size title 19 if screen width is less than 600px, otherwise 24
  const titleFontSize = width < 600 ? 19 : 24;
  // Font size label 17 if screen width is less than 600px, otherwise 22
  const labelValueFontSize = width < 600 ? 17 : 22;

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
  const verticalSpace = titleFontSize * 0.4;
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
