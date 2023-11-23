function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#d1d6e6');

  
  const div = pow(2, floor((frameCount % 180) / 40)) * 8;
  
  const sampleDelta = PI / div;
  const nrSampes = 0.0;
  
  const radius = min(width, height) * 0.4;
  const cx = width / 2;
  const cy = height / 2 + radius * 0.5;
  
  let nSamples = 0;
  
  
  noStroke();
  fill(0);
  for (let phi = 0.0; phi < 2.0 * PI; phi += sampleDelta) {
    for (let theta = 0.0; theta < 0.5 * PI; theta += sampleDelta) {
      const x = sin(theta) * cos(phi);
      const y = sin(theta) * sin(phi);
      const z = cos(theta);
      
      circle(x * radius + cx, cy - (z - y * 0.25) * radius, 2);
    nSamples ++;
    }
  }
  
  drawLabel(8, 32, "Number of samples " + nSamples, LEFT);
}

function drawLabel(x, y, label, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(15);
  textAlign(align);
  if (align == LEFT) {x += 6;}
  if (align == RIGHT) {x -= 6;}
  text(label, x, y);
  pop();
}

// Your existing code...

function openInfoWindow() {
  const infoWindow = window.open("", "Project Information", "width=600, height=400");
  infoWindow.document.write(`
    <html>
      <head>
        <title>Project Information</title>
        <style>
          body { font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <h1>Irradiance Sampling</h1>
        <p>
          It's a technique in computer graphics used to simulate realistic lighting in virtual environments. 
          In this context, the script represents the sampling of incoming light on the surfaces of two spheres. 
          The number of samples and their distribution affect the visual outcome, creating a dynamic pattern 
          that simulates how light interacts with surfaces in a 3D space. This kind of visualization is often used 
          in computer graphics and game development to achieve more realistic lighting effects.
        </p>
      </body>
    </html>
  `);
}
