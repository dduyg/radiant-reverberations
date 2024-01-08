// Initialize canvas and set its ID
function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5-canvas');
}

  // Set sphere parameters based on canvas size
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;
  const sphereRadius = min(width, height) * sphereRadiusPercentage;
  const sphereCenterX = width / 2;

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
