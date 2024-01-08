// Creating the visual with draw()
//////////////////////////////////
function draw()

  // Parameters influencing sample distribution
  
  // Iterate to cover the entire sphere surface with samples
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleAngularDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleAngularDelta) {
      // Derive 3D coordinates from spherical angles for incoming light directions
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);
////////////////_/_//_/_;

  // Calculating hemisphere center positions
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;

  // Looping through angular coordinates for sampling
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      //
      );// Loop through azimuthal and polar angles to sample points on the hemisphere
/// Iterate through the entire spherical surface to cover with samples
