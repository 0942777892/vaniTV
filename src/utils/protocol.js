function detectProtocol(url = "") {

    url = url.toLowerCase();

    if (url.startsWith("udp://"))
        return "udp";

    if (url.startsWith("http://"))
        return "http";

    if (url.startsWith("https://"))
        return "https";

    if (url.startsWith("rtsp://"))
        return "rtsp";

    if (url.startsWith("rtmp://"))
        return "rtmp";

    return "unknown";
}

module.exports = {
    detectProtocol
};