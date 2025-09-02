import express from "express";
import sharp from "sharp";
import multer from "multer";

const app = express();
const upload = multer();

// ✅ Enable body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw({ type: "image/svg+xml", limit: "10mb" }));

// Helper: do the conversion
async function convertSvg(svgBuffer, format, scale = 1) {
  // Default DPI is 72, multiply it by scale
  return sharp(svgBuffer, { density: 72 * scale })
    .toFormat(format)
    .toBuffer();
}

// Handle raw SVG
app.post("/convert", async (req, res, next) => {
  if (req.is("image/svg+xml")) {
    try {
      const format = (req.query.format || "png").toLowerCase();
      const scale = parseFloat(req.query.scale || "1");
      const output = await convertSvg(req.body, format, scale);
      return res.type(`image/${format}`).send(output);
    } catch (e) {
      console.error(e);
      return res.status(500).send("Conversion failed");
    }
  }
  next();
});

// Handle file or form field
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    let svgBuffer;

    if (req.file) {
      svgBuffer = req.file.buffer;
    } else if (req.body.svg) {
      svgBuffer = Buffer.from(req.body.svg, "utf-8");
    } else {
      return res.status(400).send("No SVG provided");
    }

    const format = (req.query.format || "png").toLowerCase();
    const scale = parseFloat(req.query.scale || "1");

    const output = await convertSvg(svgBuffer, format, scale);
    res.type(`image/${format}`).send(output);
  } catch (e) {
    console.error(e);
    res.status(500).send("Conversion failed");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SVG2IMG API running on port ${PORT}`));
