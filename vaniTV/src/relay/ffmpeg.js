const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const relays = new Map();

function startRelay(id, input) {

    // Đổi ':' thành '-' để dùng làm tên thư mục
    const safeId = id.replace(/:/g, "-");

    if (relays.has(safeId)) {
        return;
    }

    const outDir = path.join(process.cwd(), "public", "live", safeId);

    fs.mkdirSync(outDir, { recursive: true });

    const output = path.join(outDir, "index.m3u8");

    console.log(`[Relay] Starting ${safeId}`);

    //const ffmpeg = spawn("ffmpeg", [
    //    "-i", input,
    //    "-c", "copy",
    //    "-f", "hls",
    //    "-hls_time", "2",
    //    "-hls_list_size", "5",
    //    "-hls_flags", "delete_segments",
    //    output
    //]);
    const ffmpeg = spawn("ffmpeg", [
        "-fflags", "+genpts",
        "-i", input,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "128k",
        "-f", "hls",
        "-hls_time", "4",
        "-hls_list_size", "6",
        "-hls_flags", "independent_segments+delete_segments",
        "-hls_playlist_type", "event",
        output
    ]);

    ffmpeg.stderr.on("data", data => {
        process.stdout.write(data);
    });

    ffmpeg.on("close", code => {
        console.log(`[Relay] ${safeId} stopped (${code})`);
        relays.delete(safeId);
    });

    relays.set(safeId, ffmpeg);
}

module.exports = {
    startRelay
};