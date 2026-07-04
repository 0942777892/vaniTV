const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = require("./manifest");

const catalogHandler = require("./handlers/catalog");
const metaHandler = require("./handlers/meta");
const streamHandler = require("./handlers/stream");

const { loadChannels } = require("./services/playlist");

// Khởi động HLS server (Express)
require("./hls-server");

const builder = new addonBuilder(manifest);

// Đăng ký handlers
builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

// Load playlist
loadChannels();

// Khởi động Stremio Addon
serveHTTP(builder.getInterface(), {
    port: 7000
});

console.log("==================================");
console.log("vaniTV started");
console.log("Addon : http://127.0.0.1:7000/manifest.json");
console.log("HLS   : http://127.0.0.1:7001/live/");
console.log("==================================");