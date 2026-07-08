module.exports = {
    id: "com.vanitv.addon",

    version: "0.2.0",

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
            name: "Live TV",
            extra: [
                {
                    name: "genre",
                    isRequired: false,
                    options: []
                },
                {
                    name: "search",
                    isRequired: false
                }
            ]
        }
    ],

    idPrefixes: [
        "vanitv"
    ]
};