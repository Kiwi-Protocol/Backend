import Jimp from "jimp";

async function removeWhiteBackground(inputImagePath: string) {
  try {
    const image = await Jimp.read(inputImagePath);

    // Define the white color to be replaced (RGBA format)
    const whiteColor = { r: 255, g: 255, b: 255, a: 255 };

    // Iterate through each pixel in the image and replace white with transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, _) => {
      const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
      if (
        pixelColor.r === whiteColor.r &&
        pixelColor.g === whiteColor.g &&
        pixelColor.b === whiteColor.b &&
        pixelColor.a === whiteColor.a
      ) {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 0), x, y);
      }
    });

    return image;
  } catch (error) {
    console.error("Error removing white background:", error);
    return null;
  }
}

export const createAvatar = async (
  eyesPath: string,
  hairPath: string,
  mouthPath: string
) => {
  try {
    const width = 256;
    const height = 256;

    const eyesBackground = await removeWhiteBackground(eyesPath);
    const hairBackground = await removeWhiteBackground(hairPath);
    const mouthBackground = await removeWhiteBackground(mouthPath);

    // Resize the images to a common size if needed
    eyesBackground?.resize(width, height);
    hairBackground?.resize(width, height);
    mouthBackground?.resize(width, height);

    // Create a blank canvas
    const canvasWidth = width; // Set your desired canvas width
    const canvasHeight = height; // Set your desired canvas height
    const canvas = new Jimp(canvasWidth, canvasHeight);

    // Compose the avatar by overlaying the images
    canvas.composite(eyesBackground!, 0, 0);
    canvas.composite(hairBackground!, 0, 0);
    canvas.composite(mouthBackground!, 0, 0);

    return canvas;
  } catch (error) {
    console.error("Error creating avatar:", error);
    return null;
  }
};
