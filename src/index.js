const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const config = require("../config/app");
const manifest = require("./manifest");

const catalogHandler = require("./handlers/catalog");
const metaHandler = require("./handlers/meta");
const streamHandler = require("./handlers/stream");

const { loadChannels, getChannels } = require("./services/channelRepository");

const { loadEpg } = require("./services/epgLoader");
const { loadProgrammes, getProgrammes } = require("./services/epgRepository");

(async () => {

    console.log("Loading playlists...");

    await loadChannels();

    // Điền danh sách genre thật (theo group của kênh) vào manifest,
    // để Stremio hiện dropdown lọc đúng dữ liệu đang có.
    const groups = new Set();

    for (const channel of getChannels()) {
        groups.add(channel.group || "Live TV");
    }

    manifest.catalogs[0].extra[0].options = Array.from(groups).sort();

    const builder = new addonBuilder(manifest);

    builder.defineCatalogHandler(catalogHandler);
    builder.defineMetaHandler(metaHandler);
    builder.defineStreamHandler(streamHandler);

    console.log("Loading EPG...");

    const epg = await loadEpg();

    loadProgrammes(epg.channels, epg.programmes);

    const total = getChannels().length;
    let matched = 0;

    for (const channel of getChannels()) {

        const list = getProgrammes(channel.epgIds);

        if (list.length) {
            matched++;
        }

    }

    console.log(`[EPG] Khớp được ${matched}/${total} kênh có ít nhất 1 chương trình.`);

    console.log("Starting addon...");

    serveHTTP(builder.getInterface(), {
        port: config.addon.port
    });

    console.log("==================================");
    console.log("vaniTV v1");
    console.log(
        `Addon : http://${config.addon.host}:${config.addon.port}/manifest.json`
    );
    console.log("==================================");

})();