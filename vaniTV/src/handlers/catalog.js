const { getChannels } = require("../services/playlist");

const { createChannelId } = require("../utils/channelId");

async function catalogHandler(args) {
    console.log("Catalog request:", args);

    const channels = getChannels();

    console.log("Returning", channels.length, "channels");

    const metas = channels.map(channel => ({
        id: createChannelId(channel),
        type: "movie",
        name: channel.name,
        poster: channel.logo || "https://placehold.co/300x450/png?text=TV"
    }));

    return { metas };
}

module.exports = catalogHandler;