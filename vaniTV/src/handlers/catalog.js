const { getChannels } = require("../services/playlist");

function catalogHandler() {

    const channels = getChannels();

    const metas = channels.map((channel, index) => {

        return {

            id: `vanitv:${index}`,

            type: "tv",

            name: channel.name,

            poster: channel.logo || ""

        };

    });

    return Promise.resolve({
        metas
    });

}

module.exports = catalogHandler;