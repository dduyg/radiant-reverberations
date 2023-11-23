# Irradiance Sampling

[https://codepen.io/kynd/pen/mdGvzgq](https://codepen.io/kynd/pen/mdGvzgq)

This script uses the p5.js library to visually represent irradiance sampling. Here's a breakdown:

1. **Setup Function:** Initializes the canvas using the `createCanvas` function.

2. **Draw Function:**
   - Clears the background and sets a base color.
   - Calculates parameters for irradiance sampling, like the number of samples, sample delta, etc.
   - Defines the radius and center of the spheres.
   - Iterates through points on the upper hemisphere of a sphere and mirrors them below to create two spheres.
   - Draws circles at each sampled point.
   - Counts the number of samples and displays it.

3. **Draw Label Function:** Helper function for displaying text labels on the canvas.

Now, what is Irradiance Sampling?

- **Irradiance Sampling:** It's a technique in computer graphics used to simulate realistic lighting in virtual environments. In this context, the script represents the sampling of incoming light on the surfaces of two spheres. The number of samples and their distribution affect the visual outcome, creating a dynamic pattern that simulates how light interacts with surfaces in a 3D space. This kind of visualization is often used in computer graphics and game development to achieve more realistic lighting effects.

<hr>

"Radiant Reverberations" is a captivating and evocative codename for your project. It conveys a sense of dynamic energy and echoes, which aligns well with the visual representation of irradiance sampling and the interaction of light with surfaces. It suggests a vibrant and immersive experience, making it a fitting choice for a project related to computer graphics and realistic lighting simulations.

<hr>

"Radiant Reverberations" is a fantastic codename for your project. It combines the concepts of radiance (related to light and illumination) with reverberations (suggesting dynamic, echoing effects). It encapsulates the essence of the project, conveying both the visual and dynamic aspects of the irradiance sampling visualization you've created.
