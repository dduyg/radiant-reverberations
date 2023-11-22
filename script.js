function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(235, 255, 160);

  const div = pow(2, floor((frameCount % 160) / 40)) * 8;

  const sampleDelta = PI / div;
  const nrSamples = 0.0;

  const radius = min(width, height) * 0.4;
  const cx = width / 2;
  const cy = height / 2 + radius * 0.5;

  let nSamples = 0;

  noStroke();
  fill(0);

  // Draw upper hemisphere
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);

      circle(x * radius + cx, cy - (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  // Draw lower hemisphere (mirrored)
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = -cos(theta); // Reverse the sign for mirroring

      circle(x * radius + cx, cy - (z - y * 0.25) * radius, 2);
      nSamples++;
    }
  }

  drawLabel(8, 32, "Number of samples " + nSamples, LEFT);
}

function drawLabel(x, y, label, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(14);
  textAlign(align);
  if (align == LEFT) {
    x += 6;
  }
  if (align == RIGHT) {
    x -= 6;
  }
  text(label, x, y);
  pop();
}
