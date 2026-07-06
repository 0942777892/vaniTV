const { getChannelById } = require("../services/channelRepository");

const {
    getCurrentProgramme,
    getNextProgramme
} = require("../services/epgRepository");

function formatTime(value) {

    if (!value) {
        return "--:--";
    }

    const text = value.substring(0, 14);

    return `${text.substring(8, 10)}:${text.substring(10, 12)}`;

}

async function createMeta({ id }) {

    const channel = getChannelById(id);

    if (!channel) {

        return {
            meta: null
        };

    }

    const current = getCurrentProgramme(channel.epgIds);

    const next = getNextProgramme(channel.epgIds);

    let description = "";

    if (current) {

        description +=
            `🟢 Đang phát\n` +
            `${current.title}\n` +
            `${formatTime(current.start)} - ${formatTime(current.stop)}\n`;

        if (current.description) {

            description +=
                `\n${current.description}\n`;

        }

    }

    if (next) {

        description +=
            `\n━━━━━━━━━━━━━━\n`;

        description +=
            `⏭ Tiếp theo\n` +
            `${next.title}\n` +
            `${formatTime(next.start)} - ${formatTime(next.stop)}`;

    }

    if (!description) {

        description =
            `Nguồn: ${channel.sources.length}\n` +
            `EPG: Không có dữ liệu`;

    }

    return {

        meta: {

            id: channel.id,

            type: "tv",

            name: channel.name,

            poster:
                channel.logo ||
                "https://placehold.co/300x450/png?text=TV",

            posterShape: "square",

            logo: channel.logo,

            background: channel.logo,

            genres: [
                channel.group
            ],

            description

        }

    };

}

module.exports = createMeta;