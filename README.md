# Audio Flow Field

This project is an interactive visualization that combines audio analysis with a flow field algorithm to create mesmerizing particle effects that react to the music.

## Description

The Audio Flow Field uses the p5.js library and p5.sound to analyze the audio input and generate a dynamic flow field. The flow field is created using Perlin noise and influences the movement of particles on the canvas. The particles follow the flow field vectors, creating intricate patterns and trails.

The project utilizes the `p5.Amplitude` class to get the audio level, which determines the number of particles and their behavior. As the audio level changes, the number of particles and their movement speed are adjusted accordingly, creating an interactive experience that is synchronized with the audio.

## Prerequisites

- Web browser
- Node.js (for local development)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/audio-flow-field.git

2. Locate directory

3. Run server:

```bash
npx http-server
```

## Usage
Upon loading the webpage, the audio file "belinda-says.mp3" will be played automatically, and the flow field visualization will start.
The number of particles and their movement are dynamically adjusted based on the audio level.
Enjoy the mesmerizing particle effects that change and react to the music!

## Customization
You can customize the behavior and appearance of the flow field visualization by modifying the parameters in the code:

Adjust the scl (scale) value to change the size of the flow field grid.
Modify the cols and rows variables to control the number of columns and rows in the flow field grid.
Change the particleCount mapping in the draw() function to adjust the range of particle counts based on the audio level.
Experiment with different color schemes by modifying the color values used in the show() function of the Particle class.
Try tweaking the maxspeed and alpha values in the Particle class to achieve different particle movement and fading effects.

## License
MIT License
Pia Fraus - Moon Like a Pearl
From the album "Wonder What It's Like" (2001 Pia Fraus / 2016 Seksound)

Seksound Record Label 2021

www.piafraus.com
www.seksound.com
www.soundcloud.com/seksound

Feel free to modify and adapt this code to suit your needs.
