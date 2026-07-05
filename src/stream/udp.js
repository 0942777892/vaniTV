const { startRelay } = require("../relay/ffmpeg");
const { relayUrl } = require("../utils/url");

module.exports = async (channel, source) => {

    startRelay(channel.id, source.url);

    return {

        streams: [
            {

                name: "vaniTV Relay",

                title: channel.name,

                url: relayUrl(channel.id)

            }
        ]

    };

};