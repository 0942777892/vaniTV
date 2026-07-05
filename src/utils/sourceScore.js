function protocolScore(protocol) {

    switch (protocol) {

        case "https":
            return 300;

        case "http":
            return 200;

        case "udp":
            return 100;

        default:
            return 0;

    }

}

function qualityScore(name) {

    const text = (name || "").toLowerCase();

    if (text.includes("4k"))
        return 40;

    if (text.includes("2160"))
        return 40;

    if (text.includes("fhd"))
        return 30;

    if (text.includes("1080"))
        return 30;

    if (text.includes("hd"))
        return 20;

    if (text.includes("720"))
        return 20;

    return 0;

}

module.exports = {
    protocolScore,
    qualityScore
};