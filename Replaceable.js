
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
////////////////_/_//_/_

  // Defining sphere properties
  const sphereRadiusPercentage = width < 600 ? 0.36 : 0.24;

  // Calculating hemisphere center positions
  const upperHemisphereCenterY = height / 2 - sphereRadius * upperHemisphereVerticalAdjustment;

  // Updating light source position for animation
  lightSourcePosition += 0.002;

  // Looping through angular coordinates for sampling
  for (let azimuthalAngle = 0.0; azimuthalAngle < 2.0 * PI; azimuthalAngle += sampleAngularDelta) {
    for (let polarAngle = 0.0; polarAngle < 0.5 * PI; polarAngle += sampleAngularDelta) {
      //
      );
      
      // Mapping coordinates to screen space
      const sampleX = rotatedX * sphereRadius + width / 2;
      const sampleY = hemisphereCenterY + direction * (z - rotatedY * 0.25) * sphereRadius;

      // Rendering the sample point
      circle(sampleX, sampleY, 2);
      nSamples++;
