// v1: trả thẳng link UDP multicast cho Stremio client tự kết nối.
// Chỉ chạy được trên đúng mạng ISP phát multicast đó (vd FPT/Viettel/VNPT).
// Relay (ffmpeg -> HLS) sẽ làm sau, để người NGOÀI mạng đó cũng xem được
// qua link HTTP thay vì UDP trực tiếp. Xem src/relay/ffmpeg.js.

module.exports = async (channel, source) => {

    return {

        streams: [
            {

                name: "vaniTV",

                title: channel.name,

                url: source.url

            }
        ]

    };

};