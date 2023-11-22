function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(235, 255, 160);

  const div = pow(2, floor((frameCount % 160) / 40)) * 8;

  const sampleDelta = PI / div;
  let nSamples = 0;

  const radius = min(width, height) * 0.4;
  const cx = width / 4; // Center of the first sphere
  const cy = height / 2 + radius * 0.5;

  const cx2 = (3 * width) / 4; // Center of the second sphere
  const cy2 = cy;

  noStroke();
  fill(0);
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      // Points for the first sphere
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);
      circle(x * radius + cx, cy - (z - y * 0.25) * radius, 2);
      nSamples++;

      // Points for the second sphere (mirrored)
      const x2 = sin(theta) * cos(-phi); // Mirrored along the x-axis
      const y2 = sin(theta) * sin(-phi); // Mirrored along the x-axis
      const z2 = cos(theta);
      circle(x2 * radius + cx2, cy2 - (z2 - y2 * 0.25) * radius, 2);
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
