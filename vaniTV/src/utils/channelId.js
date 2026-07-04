function createChannelId(channel) {

    const base =
        channel.tvg?.id ||
        channel.tvgId ||
        channel.name ||
        "unknown";

    return (
        "vanitv:" +
        base
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
    );

}

module.exports = {
    createChannelId
};