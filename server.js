const express = require("express");
const qr = require("qr-image");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Frontend'in bağlanabilmesi için CORS aç

app.post("/generate", (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const qr_png = qr.image(url, { type: "png", size: 10 });
        res.setHeader("Content-Type", "image/png");
        qr_png.pipe(res);
    } catch (error) {
        res.status(500).json({ error: "QR code generation failed" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
