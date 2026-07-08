const { getChannels } = require("../services/channelRepository");

module.exports = async ({ type, id, extra, config }) => {

    let channels = getChannels();

    if (extra?.genre) {

        channels = channels.filter(channel => {

            return (channel.group || "Live TV") === extra.genre;

        });

    }

    if (extra?.search) {

        const query = extra.search
            .toLowerCase()
            .trim();

        channels = channels.filter(channel => {

            return channel.name
                .toLowerCase()
                .includes(query);

        });

    }

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