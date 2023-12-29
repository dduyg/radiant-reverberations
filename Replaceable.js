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

  // Rendering the upper hemisphere
  /////////////////////////////////
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

  // Adjust the position of the virtual light source
  lightSourcePosition += 0.01;

// Set labels with specified styling, position, and alignment
//////////////////////////////////////////
