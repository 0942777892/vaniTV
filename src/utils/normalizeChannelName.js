function normalizeChannelName(text) {

    if (!text) {
        return "";
    }

    return text

        .toLowerCase()

        // bỏ hậu tố chất lượng kiểu "@sd"/"@hd" (iptv-org dùng
        // tvg-id dạng "tenkenh.vn@sd")
        .replace(/@[a-z0-9]+$/, "")

        // bỏ hậu tố mã quốc gia kiểu ".vn"
        .replace(/\.[a-z]{2}$/, "")

        // bỏ nội dung trong ngoặc (vd "(1080p)")
        .replace(/\(.*?\)/g, "")

        // bỏ nội dung trong ngoặc vuông (vd "[Geo-blocked]")
        .replace(/\[.*?\]/g, "")

        // chuẩn hóa dấu phân cách
        .replace(/[_-]/g, " ")

        // bỏ các hậu tố chất lượng
        .replace(/\b(uhd|fhd|hd|sd|4k|8k|hevc|hdr|h265|h264|av1)\b/g, "")

        // bỏ từ "backup"
        .replace(/\bbackup\b/g, "")

        // gom khoảng trắng
        .replace(/\s+/g, " ")

        .trim();

}

module.exports = {
    normalizeChannelName
};