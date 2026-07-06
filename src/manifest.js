module.exports = {
    id: "com.vanitv.addon",

    version: "0.1.0",

    name: "vaniTV",

    description: "Modern IPTV addon for Stremio",

    resources: [
        "catalog",
        "meta",
        "stream"
    ],

    types: [
        "tv"
    ],

    catalogs: [
        {
            type: "tv",
            id: "live-tv",
            name: "Live TV"
        }
    ],

    idPrefixes: [
        "vanitv"
    ]
};