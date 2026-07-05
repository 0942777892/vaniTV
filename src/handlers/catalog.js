const { getChannels } = require("../services/channelRepository");

module.exports = async ({ type, id, extra, config }) => {

    console.log("Catalog request:", {
        type,
        id,
        extra,
        config
    });

    const channels = getChannels();

    const metas = channels.map(channel => ({

        id: channel.id,

        type: "movie",

        name: channel.name,

        poster:
            channel.logo ||
            "https://placehold.co/300x450/png?text=vaniTV",

        posterShape: "square",

        genres: [
            channel.group || "Live TV"
        ]

    }));

    console.log(`Returning ${metas.length} channels`);

    return {
        metas
    };

};