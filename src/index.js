const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const config = require("../config/app");
const manifest = require("./manifest");

const catalogHandler = require("./handlers/catalog");
const metaHandler = require("./handlers/meta");
const streamHandler = require("./handlers/stream");

const { loadChannels } = require("./services/channelRepository");

const { loadEpg } = require("./services/epgLoader");
const { loadProgrammes } = require("./services/epgRepository");

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);
builder.defineMetaHandler(metaHandler);
builder.defineStreamHandler(streamHandler);

(async () => {

    console.log("Loading playlists...");

    await loadChannels();

    console.log("Loading EPG...");

    const epg = await loadEpg();

    loadProgrammes(epg.channels, epg.programmes);

    const { getChannels } = require("./services/channelRepository");
    const { getProgrammes } = require("./services/epgRepository");

    const total = getChannels().length;
    let matched = 0;

    for (const channel of getChannels()) {

        const list = getProgrammes(channel.epgIds);

        if (list.length) {
            matched++;
        }

    }

    console.log(`[EPG] Khớp được ${matched}/${total} kênh có ít nhất 1 chương trình.`);

    const vtv1 = getChannels().find(c => c.id === "vanitv:vtv1");

    if (vtv1) {

        const list = getProgrammes(vtv1.epgIds);

        console.log(`[EPG] vtv1.epgIds = ${JSON.stringify(vtv1.epgIds)}`);
        console.log(`[EPG] vtv1 tìm thấy ${list.length} chương trình.`);

        if (list.length) {
            console.log(`[EPG] vtv1 khung giờ có dữ liệu: ${list[0].start} -> ${list[list.length - 1].stop}`);
            console.log(`[EPG] Giờ hệ thống hiện tại: ${new Date().toISOString()}`);
        }

    }

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