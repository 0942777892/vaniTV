const express = require("express");
const path = require("path");

const app = express();
const PORT = 7001;

// Log mọi request
app.use((req, res, next) => {
    console.log(`[HLS] ${req.method} ${req.url}`);
    next();
});

app.use(
    "/live",
    express.static(path.join(process.cwd(), "public", "live"))
);

app.listen(PORT, () => {
    console.log(`HLS server running: http://127.0.0.1:${PORT}/live/`);
});