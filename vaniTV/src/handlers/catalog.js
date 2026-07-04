const { getChannels } = require("../services/playlist");

const { createChannelId } = require("../utils/channelId");

function catalogHandler() {

    const channels = getChannels();

    const metas = channels.map((channel) => ({

        id: createChannelId(channel),

        type: "tv",

        name: channel.name,

        poster: channel.logo || "",

    }));

    return Promise.resolve({
        metas
    });

}

module.exports = catalogHandler;