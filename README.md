## [Irradiance Sampling](https://codepen.io/kynd/pen/mdGvzgq)


In a 3D space, light interacts with surfaces in various ways—reflection, refraction, and absorption. Irradiance sampling is a technique used in computer graphics to simulate realistic lighting in virtual environments. It involves sampling the incoming light on surfaces, capturing the distribution and intensity of light rays to create visually accurate illumination. By simulating how light interacts with surfaces in a 3D space, irradiance sampling contributes to the creation of immersive and highly realistic visual experiences in various applications such as game development, animation, virtual simulations, architectural design, and other graphics-related fields.


### Understanding Irradiance Sampling

The purpose of irradiance sampling is to replicate how light interacts with surfaces in the real world, accounting for reflections, refractions, and shadows. By capturing the distribution of incoming light, it contributes to more accurate and immersive simulations.

To understand irradiance sampling, let's break it down. Irradiance refers to the amount of radiant energy per unit area, essentially the brightness or intensity of light falling onto a surface. Instead of computing this value at every pixel, which can be computationally intensive, sampling involves strategically selecting specific points on surfaces to calculate the incoming light.

These points, often referred to as "samples," represent a subset of the surface. By sampling irradiance at these representative points, the renderer can estimate the overall lighting conditions more efficiently. This helps optimize computational resources while maintaining visual accuracy.

So basically, the idea behind irradiance sampling is to estimate the amount of incoming light at a specific point on a surface by sampling multiple directions around that point and calculating the average irradiance. This process enhances the visual realism of computer-generated imagery by accurately simulating the way light interacts with different surfaces across a virtual scene. This realism elevates user experiences in various industries, providing immersive applications.
