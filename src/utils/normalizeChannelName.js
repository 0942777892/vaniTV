function normalizeChannelName(text) {

    if (!text) {
        return "";
    }

    return text

        .toLowerCase()

        // bỏ nội dung trong ngoặc
        .replace(/\(.*?\)/g, "")

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