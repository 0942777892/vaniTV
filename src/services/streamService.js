const { getChannelById } = require("./channelRepository");
const { selectBestSource } = require("./sourceSelector");

const handlers = require("../stream");

async function createStream(id) {

    const channel = getChannelById(id);

    if (!channel) {
        return { streams: [] };
    }

    const source = selectBestSource(channel);

    if (!source) {
        return { streams: [] };
    }

    console.log(
        `[Stream] ${channel.name} -> ${source.protocol} (${source.source})`
    );

    const handler = handlers[source.protocol];

    if (!handler) {

        console.log(
            `[Stream] Unsupported protocol: ${source.protocol}`
        );

        return { streams: [] };

    }

    return handler(channel, source);

}

module.exports = {
    createStream
};