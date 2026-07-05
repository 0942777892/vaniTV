const fs = require("fs");
const path = require("path");

const { loadPlaylist } = require("../parser/m3u");

let channels = [];

function loadChannels() {

    const playlistDir = path.join(process.cwd(), "playlists");

    const channelMap = new Map();

    if (!fs.existsSync(playlistDir)) {
        console.warn("Playlist folder not found.");
        channels = [];
        return;
    }

    const files = fs.readdirSync(playlistDir)
        .filter(file => file.toLowerCase().endsWith(".m3u"));

    for (const file of files) {

        const fullPath = path.join(playlistDir, file);

        try {

            const list = loadPlaylist(fullPath);

            //if (file === "kenhcoban.m3u") {
            //    const vtv = list.filter(c =>
            //        c.name.toLowerCase().includes("vtv1")
            //    );

            //    console.log(file);
            //    console.log(vtv);
            // }
            if (file === "kenhcoban.m3u") {

                console.log("====== VTV1 in kenhcoban ======");

                list
                    .filter(c => c.name.toLowerCase().includes("vtv1"))
                    .forEach(c => {
                        console.log(c.id, c.name, c.epg);
                    });

            }

            console.log(`Loaded ${list.length} channels from ${file}`);

            for (const channel of list) {

                // Chưa có kênh -> thêm mới
                if (!channelMap.has(channel.id)) {

                    channelMap.set(channel.id, channel);

                    continue;

                }

                // Đã có -> gộp sources
                const existing = channelMap.get(channel.id);

                for (const source of channel.sources) {

                    const duplicated = existing.sources.some(s =>
                        s.url === source.url
                    );

                    if (!duplicated) {
                        existing.sources.push(source);
                    }

                }

            }

        } catch (err) {

            console.error(`Cannot load ${file}: ${err.message}`);

        }

    }

    channels = [...channelMap.values()];

    console.log(`Total unique channels: ${channels.length}`);

    const vtv1 = channels.find(c => c.id === "vanitv:vtv1");

    console.log("================================");
    console.log(JSON.stringify(vtv1, null, 2));
    console.log("================================");

}

function reloadChannels() {
    loadChannels();
}

function getChannels() {
    return channels;
}

function getChannelById(id) {
    return channels.find(channel => channel.id === id);
}

module.exports = {
    loadChannels,
    reloadChannels,
    getChannels,
    getChannelById
};