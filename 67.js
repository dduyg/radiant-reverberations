// Initialize canvas and set its ID
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

// Parameters influencing the simulation
let frameVariation = 200; // Rename from frameModifier for clarity
let sampleDensityModifier = 40;
let upperHemisphereVerticalAdjustment = 0.95;
let lowerHemisphereVerticalAdjustment = 1.5;
let lightSourcePosition = 0.0;

// Main draw function
function draw() {
  clear();

  // Calculate the number of samples per frame based on variations
  const samplesPerFrame = pow(2, floor((frameCount % frameVariation) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame;

  // Set sphere parameters based on canvas size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

  // Calculate center positions for upper and lower hemispheres
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;
  const lowerHemisphereCenterY = height / 2 + sphereRadius * lowerHemisphereVerticalAdjustment;

  // Render samples for upper and lower hemispheres
  let nUpperSamples = renderHemisphereSamples(upperHemisphereCenterY, sphereRadius, sampleAngularDelta, 1);
  let nLowerSamples = renderHemisphereSamples(lowerHemisphereCenterY, sphereRadius, sampleAngularDelta, -1);

  // Update light source position for animation
  lightSourcePosition += 0.002;

  // Display project information
  displayInfo(8, 46, "Radiant Reverberations", "Number of samples: ", nUpperSamples + nLowerSamples, LEFT);
}

// Function to render samples on a hemisphere
function renderHemisphereSamples(hemisphereCenterY, sphereRadius, sampleAngularDelta, direction) {
  noStroke();
  fill(0);

  let nSamples = 0;

  // Iterate through azimuthal and polar angles to sample points on the hemisphere
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      // Convert spherical coordinates to Cartesian coordinates
      const x = sin(polarAngle) * cos(azimuthalAngle);
      const y = sin(polarAngle) * sin(azimuthalAngle);
      const z = cos(polarAngle);

      // Rotate coordinates based on light source position
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate final sample position on the canvas
      const sampleX = rotatedX * sphereRadius + width / 2;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Draw a small circle at the sample position
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

// Adjust canvas size when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
