const { getChannelById } = require("../services/playlist");
const { startRelay } = require("../relay/ffmpeg");

module.exports = async ({ id }) => {

    const channel = getChannelById(id);

    if (!channel) {
        return { streams: [] };
    }

    console.log(`[Stream] ${channel.name} -> ${channel.url}`);

    // HTTP/HLS phát trực tiếp
    if (
        channel.url.startsWith("http://") ||
        channel.url.startsWith("https://")
    ) {
        return {
            streams: [
                {
                    name: "vaniTV",
                    title: channel.name,
                    url: channel.url
                }
            ]
        };
    }

    // UDP -> Relay
    if (channel.url.startsWith("udp://")) {

        // Chuyển ID thành tên thư mục hợp lệ
        const safeId = id.replace(/:/g, "-");

        // Khởi động relay
        startRelay(id, channel.url);

        return {
            streams: [
                {
                    name: "vaniTV Relay",
                    title: channel.name,
                    url: `http://127.0.0.1:7001/live/${safeId}/index.m3u8`,
                    behaviorHints: {
                        notWebReady: true
                    }
                }
            ]
        };
    }

    return { streams: [] };
};