const { getChannelById } = require("./channelRepository");

const handlers = require("../stream");

async function createStream(id) {

    const channel = getChannelById(id);

    if (!channel) {
        return {
            streams: []
        };
    }

    const streams = [];

    for (const source of channel.sources) {

        const handler = handlers[source.protocol];

        if (!handler) {
            continue;
        }

        try {

            const result = await handler(channel, source);

            if (!result || !Array.isArray(result.streams)) {
                continue;
            }

            for (const stream of result.streams) {

                let protocol = source.protocol.toUpperCase();

                let provider = source.source || "";

                if (provider === "playlist") {
                    provider = "";
                }

                stream.name =
                    provider.length
                        ? `${protocol} • ${provider}`
                        : protocol;

                streams.push(stream);

            }

        }
        catch (err) {

            console.error(
                `[Stream] ${channel.name}:`,
                err.message
            );

        }

    }

    return {
        streams
    };

}

module.exports = {
    createStream
};