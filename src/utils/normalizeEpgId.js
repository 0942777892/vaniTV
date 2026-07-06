// Chuẩn hóa tvg-id / channel id để so khớp EPG, vì mỗi nguồn
// (playlist HTTP, playlist UDP, file EPG công cộng) đặt id khác nhau
// cho cùng 1 kênh, ví dụ:
//   "vtv1-hd"  (playlist HTTP)
//   "VTV1"     (playlist UDP)
//   "VTV1.vn"  (iptv-org EPG chuẩn quốc tế)
// Cả 3 sau khi chuẩn hóa đều thành "vtv1" để so khớp được với nhau.

function normalizeEpgId(id) {

    if (!id) {
        return "";
    }

    return id

        .toLowerCase()

        // bỏ hậu tố quốc gia kiểu ".vn"
        .replace(/\.[a-z]{2}$/, "")

        // chuẩn hóa dấu phân cách
        .replace(/[\s_]+/g, "-")

        // bỏ hậu tố chất lượng
        .replace(/-(uhd|fhd|hd|sd|4k|8k|hevc|hdr)$/, "")

        // bỏ mọi ký tự không phải chữ/số
        .replace(/[^a-z0-9]/g, "");

}

module.exports = {
    normalizeEpgId
};
