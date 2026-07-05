const { normalizeChannelName } = require("./normalizeChannelName");

function slug(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

}

function createChannelId(channel) {

    const key =
        channel.epg ||
        channel.name ||
        "unknown";

    return "vanitv:" + slug(
        normalizeChannelName(key)
    );

}

module.exports = {
    createChannelId
};