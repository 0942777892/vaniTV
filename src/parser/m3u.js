const {
    protocolScore,
    qualityScore
} = require("../utils/sourceScore");

const { parse } = require("iptv-playlist-parser");

const Channel = require("../models/channel");
const Source = require("../models/Source");

const { createChannelId } = require("../utils/channelId");
const { detectProtocol } = require("../utils/protocol");

function parsePlaylist(text, playlistInfo = {}) {

    const playlist = parse(text);

    return playlist.items.map(item => {

        const protocol = detectProtocol(item.url);

        const priority = playlistInfo.priority || 0;

        const score =
            priority * 1000 +
            protocolScore(protocol) +
            qualityScore(item.name);

        const source = new Source({

            url: item.url,

            protocol,

            source: playlistInfo.source || "playlist",

            priority,

            score

        });

        const channel = new Channel({

            id: "",

            name: item.name,

            group:
                item.group?.title ||
                item.group ||
                "",

            logo:
                item.tvg?.logo ||
                "",

            epg:
                item.tvg?.id ||
                item.tvgId ||
                "",

            sources: [
                source
            ]

        });

        channel.id = createChannelId(channel);

        return channel;

    });

}

module.exports = {
    parsePlaylist
};