const { getChannelById } = require("../services/playlist");

async function metaHandler({ id }) {

    const channel = getChannelById(id);

    if (!channel) {
        return {
            meta: null
        };
    }

    return {
        meta: {
            id,
            type: "movie",
            name: channel.name,
            poster: channel.logo || "",
            background: channel.logo || "",
            description: "Live TV"
        }
    };
}

module.exports = metaHandler;