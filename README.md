## [Irradiance Sampling](https://codepen.io/kynd/pen/mdGvzgq)

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

"Radiant Reverberations" is a evocative representation of irradiance sampling and the interaction of light with surfaces.
- dynamic, echoing effects
- conveying both the visual and dynamic aspects of the irradiance sampling visualization

<hr>

Irradiance sampling in computer graphics refers to the process of estimating the amount of light arriving at a particular point on a surface within a scene. This is crucial for realistic rendering, as it contributes to the accurate portrayal of lighting effects. Instead of calculating the exact irradiance at every point, which can be computationally intensive, sampling involves taking representative points and averaging their irradiance values. This helps strike a balance between computational efficiency and visual fidelity.

In simpler terms, imagine you want to know how much light is hitting a pixel on a virtual object. Rather than meticulously calculating every photon's contribution, irradiance sampling allows the renderer to approximate this by analyzing a subset of relevant light interactions. This approach is fundamental in creating visually appealing and computationally feasible graphics in various applications, from video games to architectural visualization.

<hr>

Irradiance sampling is a technique used in computer graphics to simulate realistic lighting in virtual environments. It involves sampling the incoming light at different points on a surface to calculate the total illumination. It's crucial for creating visually accurate scenes in things like CGI or game development.

<hr>

This CodePen project is a visualization of irradiance sampling using the p5.js library. It creates a dynamic pattern of circles on a canvas to represent the sampling of incoming light on a surface. The number of samples increases as the animation progresses.

The `setup` function initializes the canvas, and the `draw` function generates the pattern by sampling points on a sphere. The `drawLabel` function is used to display information about the number of samples.

In summary, it's a visual representation of irradiance sampling, a concept in computer graphics related to simulating realistic lighting. The code combines mathematical calculations with p5.js for rendering.

<hr>

Your project is an interactive visualization using p5.js, a JavaScript library for creative coding. The visualization employs the concept of Irradiance Sampling, a technique in computer graphics used to simulate realistic lighting in virtual environments. The script represents the sampling of incoming light on the surfaces of two spheres, creating a dynamic pattern that simulates how light interacts with surfaces in a 3D space.

<hr>

Your project, titled "Irradiance Sampling," utilizes p5.js, a JavaScript library for creative coding, to simulate realistic lighting in virtual environments. The script represents the sampling of incoming light on the surfaces of two spheres, creating a dynamic pattern that simulates how light interacts with surfaces in a 3D space. The number of samples and their distribution affect the visual outcome, providing a visually intriguing representation of irradiance sampling.

The spheres are drawn using mathematical calculations for spherical coordinates, creating a pattern of circles on their surfaces. The sampling is controlled by parameters like the angular step and the number of samples, creating an evolving visual display.

The project is designed to be responsive, adapting to different screen sizes and resolutions, and has been optimized for performance. Users can explore the impact of changing parameters, such as the number of samples and their distribution, to observe how it influences the lighting simulation.

Additionally, a toggleable dropdown provides information about the project, explaining that it represents irradiance sampling—a technique in computer graphics used for realistic lighting in virtual environments. This kind of visualization is commonly employed in computer graphics and game development to achieve more lifelike lighting effects.

Overall, your project serves as an interactive and visually engaging exploration of irradiance sampling using creative coding with p5.js.

<hr>

Your project, titled "Irradiance Sampling," is a visualization created using p5.js, a JavaScript library for creative coding. The project employs computer graphics techniques to simulate realistic lighting in virtual environments. Here's a breakdown:

**Project Overview:**
- **Title:** Irradiance Sampling

**Description:**
- **Purpose:** Simulating realistic lighting in virtual environments.
- **Technique:** Irradiance Sampling, a method in computer graphics.
- **Visualization:** The script represents the sampling of incoming light on the surfaces of two spheres.
- **Dynamic Pattern:** The number of samples and their distribution dynamically affect the visual outcome, creating a pattern that simulates how light interacts with surfaces in 3D space.

**Implementation Details:**
- **Programming Language:** JavaScript
- **Library:** p5.js (Version 1.6.0)
- **Web Technologies:** HTML, CSS

**Key Components:**
1. **Canvas Setup:**
   - Responsive canvas setup using `createCanvas(windowWidth * 0.9, windowHeight * 0.9)`.

2. **Dynamic Animation:**
   - The animation is controlled by parameters influenced by `frameCount`.

3. **Irradiance Sampling:**
   - Utilizes nested loops to perform irradiance sampling, simulating light interaction on the surfaces of spheres.

4. **Responsive Design:**
   - Elements like canvas size and sphere parameters are adjusted relative to the window dimensions, promoting responsiveness.

5. **Visual Feedback:**
   - The number of samples is displayed dynamically with visual feedback.

6. **Color Styling:**
   - The project includes color styling, such as a background color and specific colors for text elements.

7. **Interactive Feature:**
   - Additional functionality includes a button (`toggleInfo`) to control the visibility of information dropdown.

**Purpose and Application:**
- **Educational:** Provides a hands-on exploration of irradiance sampling and its impact on visual outcomes.
- **Artistic:** Creates visually appealing patterns and effects through dynamic lighting simulation.

<hr>

**Welcome to "Irradiance Sampling"!**

This interactive work is an exploration of computer graphics and realistic lighting simulation using cutting-edge web technologies. Let me guide you through what this project is all about:

**What Is "Irradiance Sampling"?**
- **Simulation of Realistic Lighting:** Imagine a virtual environment where light behaves just like it does in the real world. "Irradiance Sampling" does precisely that by simulating the interaction of light on the surfaces of two spheres.

**What Does It Do?**
- **Dynamic Lighting Patterns:** As you explore this visual masterpiece, pay attention to the dynamic patterns emerging on the spheres. The number of samples and their distribution intricately influence the visual outcome, creating a mesmerizing display of light interaction.

**How Is It Created?**
- **JavaScript Magic:** The project is crafted using JavaScript, a versatile programming language. Leveraging the p5.js library, it introduces an artistic touch to coding, making visuals come alive.
- **Responsive Design:** The canvas adapts to your screen size, ensuring a seamless experience across different devices. It's not just a simulation; it's an interactive journey.

**Why Explore This Work?**
- **Educational Adventure:** Dive into the world of computer graphics and gain insights into how realistic lighting is achieved in virtual environments.
- **Aesthetic Pleasure:** Beyond the technicalities, "Irradiance Sampling" offers a visual treat. Each interaction reveals a new facet of dynamic lighting patterns.

**Interact and Discover:**
- Engage with the animation, observe how light dances across the spheres, and explore the nuances of irradiance sampling.
- Click the button to toggle additional information, providing a deeper understanding of the underlying techniques.

Whether you're a coding enthusiast, an art lover, or simply curious about the magic behind realistic lighting in virtual spaces, "Irradiance Sampling" invites you to explore and enjoy the harmony of art and technology.
