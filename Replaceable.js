// Frame count modifier (controls the variation speed)
let frameModifier = 200;
// Sample density modifier (affects the number of samples)
let sampleDensityModifier = 40;
// Vertical adjustment for the center of the upper hemisphere (experiment to change its position)
let upperHemisphereVerticalAdjustment = 0.95;
// Vertical adjustment for the center of the lower hemisphere (experiment to change its position)
let lowerHemisphereVerticalAdjustment = 1.5;
// Initial position of the virtual light source
let lightSourcePosition = 0.0;

// Creating the visual with draw()
//////////////////////////////////
function draw() {
  clear();

  // Parameters influencing sample distribution
  const samplesPerFrame = pow(2, floor((frameCount % frameModifier) / sampleDensityModifier)) * 9;
  const sampleAngularDelta = PI / samplesPerFrame; // Calculates the angular separation between samples
  let nSamples = 0;

  // Initializing size of the spheres based on screen width:
  // currently set to 0.36 if screen width is less than 600px, otherwise 0.24
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;

  // Rendering the upper hemisphere
  /////////////////////////////////
  noStroke();
  fill(pointFillColor);
  
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      // Rotate the incoming light direction based on the lightSourcePosition
      const rotatedX = cos(lightSourcePosition) * x - sin(lightSourcePosition) * y;
      const rotatedY = sin(lightSourcePosition) * x + cos(lightSourcePosition) * y;

      // Calculate the position of each sample point on the upper hemisphere
      const sampleX = rotatedX * sphereRadius + sphereCenterX;
      const sampleY = upperHemisphereCenterY + (z - rotatedY * 0.25) * sphereRadius;

      // Draw the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
    }
  }

  // Adjust the position of the virtual light source
  lightSourcePosition += 0.01;

// Set labels with specified styling, position, and alignment
//////////////////////////////////////////
