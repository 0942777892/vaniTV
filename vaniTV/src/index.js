const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = require("./manifest");

const catalogHandler = require("./handlers/catalog");

const { loadChannels } = require("./services/playlist");

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(catalogHandler);

builder.defineMetaHandler(() => {

    return Promise.resolve({
        meta: {}
    });

});

builder.defineStreamHandler(() => {

    return Promise.resolve({
        streams: []
    });

});

loadChannels();

serveHTTP(builder.getInterface(), {
    port: 7000
});

console.log("==================================");
console.log("vaniTV started");
console.log("http://127.0.0.1:7000/manifest.json");
console.log("==================================");