const { getChannels } = require("../services/channelRepository");

module.exports = async ({ type, id, extra, config }) => {

    const channels = getChannels();

    const metas = channels.map(channel => ({

        id: channel.id,

        type: "tv",

        name: channel.name,

        poster:
            channel.logo ||
            "https://placehold.co/300x450/png?text=vaniTV",

        posterShape: "square",

        logo: channel.logo,

        genres: [
            channel.group || "Live TV"
        ]

    }));

    return {
        metas
    };

};