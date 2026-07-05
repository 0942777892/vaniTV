const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const config = require("../../config/app");

const relays = new Map();

function startRelay(id, input) {

    const safeId = id.replace(/:/g, "-");

    if (relays.has(safeId)) {
        return;
    }

    const outDir = path.join(
        process.cwd(),
        config.relay.output,
        safeId
    );

    fs.mkdirSync(outDir, { recursive: true });

    const output = path.join(outDir, "index.m3u8");

    console.log(`[Relay] Starting ${safeId}`);

    const args = [

        "-fflags", "+genpts",

        "-i", input,

        "-c:v", "copy",

        "-c:a", "aac",

        "-b:a", config.relay.hls.audioBitrate,

        "-f", "hls",

        "-hls_time", String(config.relay.hls.time),

        "-hls_list_size", String(config.relay.hls.listSize),

        "-hls_flags", config.relay.hls.flags,

        "-hls_playlist_type", config.relay.hls.playlistType,

        output

    ];

    const ffmpeg = spawn(
        config.relay.ffmpeg,
        args
    );

    ffmpeg.stderr.on("data", data => {
        process.stdout.write(data);
    });

    ffmpeg.on("error", err => {

        console.error(
            `[Relay] Cannot start FFmpeg: ${err.message}`
        );

        relays.delete(safeId);

    });

    ffmpeg.on("close", code => {

        console.log(
            `[Relay] ${safeId} stopped (${code})`
        );

        relays.delete(safeId);

    });

    relays.set(safeId, ffmpeg);

}

function stopRelay(id) {

    const safeId = id.replace(/:/g, "-");

    const relay = relays.get(safeId);

    if (!relay) {
        return;
    }

    console.log(`[Relay] Stopping ${safeId}`);

    relay.kill("SIGTERM");

    relays.delete(safeId);

}

function stopAllRelays() {

    for (const relay of relays.values()) {
        relay.kill("SIGTERM");
    }

    relays.clear();

}

module.exports = {

    startRelay,

    stopRelay,

    stopAllRelays

};