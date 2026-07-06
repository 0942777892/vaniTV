module.exports = {

    http: require("./http"),

    https: require("./http"),

    // v1: passthrough trực tiếp, không cần relay (xem src/stream/udp.js)
    udp: require("./udp")

    //rtsp: require("./rtsp"),

    //torrent: require("./torrent"),

    //xtream: require("./xtream")

};