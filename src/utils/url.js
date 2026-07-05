const config = require("../../config/app");

function relayUrl(channelId) {

    return `http://${config.relay.host}:${config.relay.port}/live/${channelId.replace(/:/g, "-")}/index.m3u8`;

}

module.exports = {
    relayUrl
};