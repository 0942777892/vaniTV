module.exports = {

    addon: {
        host: "127.0.0.1",
        port: 7000
    },

    relay: {

        host: "127.0.0.1",
        port: 7001,

        ffmpeg: "ffmpeg",

        output: "public/live",

        hls: {

            time: 4,

            listSize: 6,

            audioBitrate: "128k",

            flags: "independent_segments+delete_segments",

            playlistType: "event"

        }

    },

    playlist: {
        folder: "playlists"
    }

};