const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const { loadEpg } = require("./services/epgLoader");
const { loadProgrammes } = require("./services/epgRepository");
const config = require("../config/app");

const manifest = require("./manifest");

const catalogHandler = require("./handlers/catalog");
const metaHandler = require("./handlers/meta");
const streamHandler = require("./handlers/stream");

const { loadChannels } = require("./services/channelRepository");

require("./hls-server");

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

(async () => {

    await loadChannels();

    const programmes = await loadEpg();

    loadProgrammes(programmes);

    serveHTTP(builder.getInterface(), {
        port: config.addon.port
    });

    console.log("==================================");
    console.log("vaniTV started");
    console.log(
        `Addon : http://${config.addon.host}:${config.addon.port}/manifest.json`
    );
    console.log(
        `HLS   : http://${config.relay.host}:${config.relay.port}/live/`
    );
    console.log("==================================");

})();