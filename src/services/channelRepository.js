const { loadPlaylists } = require("./playlistLoader");

const logoOverrides = new Map(
    require("../../config/logos.json").map(item => [item.id, item.logo])
);

let channels = [];

async function loadChannels() {

    const loadedChannels = await loadPlaylists();

    const map = new Map();

    for (const channel of loadedChannels) {

        const existing = map.get(channel.id);

        if (!existing) {

            // epgIds: gom mọi tvg-id + tên hiển thị từng thấy cho kênh này.
            // Cần cả tên hiển thị vì có nguồn EPG (vd epg.pw) không dùng
            // tvg-id dạng chữ, mà định danh kênh bằng số nội bộ + tên.
            channel.epgIds = [];

            if (channel.epg) {
                channel.epgIds.push(channel.epg);
            }

            if (channel.name) {
                channel.epgIds.push(channel.name);
            }

            map.set(channel.id, channel);
            continue;

        }

        if (channel.epg && !existing.epgIds.includes(channel.epg)) {
            existing.epgIds.push(channel.epg);
        }

        if (channel.name && !existing.epgIds.includes(channel.name)) {
            existing.epgIds.push(channel.name);
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

    let overridden = 0;

    for (const channel of channels) {

        const override = logoOverrides.get(channel.id);

        if (override && override !== channel.logo) {
            channel.logo = override;
            overridden++;
        }
        else if (override) {
            channel.logo = override;
        }

    }

    console.log(`Total unique channels: ${channels.length}`);

    if (overridden) {
        console.log(`Logo override: ${overridden} kênh dùng logo tùy chỉnh.`);
    }

}

function getChannels() {
    return channels;
}

function getChannelById(id) {
    return channels.find(channel => channel.id === id);
}

module.exports = {
    loadChannels,
    getChannels,
    getChannelById
};