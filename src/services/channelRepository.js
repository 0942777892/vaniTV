const { loadPlaylists } = require("./playlistLoader");

let channels = [];

async function loadChannels() {

    const loadedChannels = await loadPlaylists();

    const map = new Map();

    for (const channel of loadedChannels) {

        const existing = map.get(channel.id);

        if (!existing) {

            map.set(channel.id, channel);
            continue;

        }

        for (const source of channel.sources) {

            const duplicated = existing.sources.find(
                s => s.url === source.url
            );

            if (!duplicated) {
                existing.sources.push(source);
            }

        }

    }

    channels = Array.from(map.values());

    console.log(`Total unique channels: ${channels.length}`);

    const test = channels.find(c => c.id === "vanitv:vtv1");

    console.log("Repository test:", test ? test.id : "NOT FOUND");

}

function getChannels() {
    return channels;
}

function getChannelById(id) {

    console.log("getChannelById:", id);

    return channels.find(channel => channel.id === id);

}

module.exports = {
    loadChannels,
    getChannels,
    getChannelById
};