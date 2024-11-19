# Spritesheet Maker

**Spritesheet Maker** is a Node.js script that generates a spritesheet from images in a directory. It arranges the images in a grid layout with customizable padding and outputs the result as a single `.png` file.

## Features
- Automatically scans a directory for image files (JPG, PNG, GIF).
- Dynamically adjusts the grid size based on the number of images.
- Supports padding between sprites.
- Creates a transparent background for the spritesheet.

## Requirements
- Node.js (v14 or higher)
- NPM (comes with Node.js)
- [Sharp](https://sharp.pixelplumbing.com/)

## Installation
1. Clone or download the repository:
   git clone https://github.com/AndyStubbs/Spritesheet.git  
   cd SpritesheetMaker
2. Install the required dependencies:
   npm install sharp

## Usage
Run the script using Node.js, providing the directory of images and optional padding as arguments:  
node SpritesheetMaker.js <directory> <padding>

- `<directory>`: The path to the directory containing the images. Defaults to the current directory (`"."`).
- `<padding>`: The amount of padding (in pixels) between sprites. Defaults to `1`.

### Example
To create a spritesheet from images in the `images` directory with 5px padding:  
node SpritesheetMaker.js images 5

The script outputs a `spritesheet.png` file in the current directory.

## How It Works
1. Scans the specified directory for images (`.jpg`, `.jpeg`, `.png`, `.gif`).
2. Calculates the maximum width and height of the images and determines the grid size.
3. Creates a transparent canvas and arranges the images with the specified padding.
4. Outputs the spritesheet as `spritesheet.png`.

## Error Handling
- If the specified directory doesn't exist or can't be read, an error is displayed.
- If no images are found in the directory, the script logs:  
  "No images found in the directory."
- Any errors during image processing or spritesheet creation are logged to the console.

## Customization
- Adjust the default output filename (`spritesheet.png`) in the script.
- Modify padding and grid calculation logic for specific use cases.
- Enhance metadata handling for additional file formats.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contribution
Contributions are welcome! To contribute:  
1. Fork the repository.  
2. Create a new branch for your changes.  
3. Submit a pull request with details of your update.

---

Create stunning spritesheets quickly and easily with **Spritesheet Maker**!
