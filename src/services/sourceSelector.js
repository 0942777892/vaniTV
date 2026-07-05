function selectBestSource(channel) {

    if (!channel.sources?.length) {
        return null;
    }

    const sorted = [...channel.sources].sort((a, b) => {

        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return b.priority - a.priority;

    });

    console.log(
        `[Selector] ${channel.name} -> ${sorted[0].protocol} (${sorted[0].source}) score=${sorted[0].score}`
    );

    return sorted[0];

}

module.exports = {
    selectBestSource
};