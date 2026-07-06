const { normalizeEpgId } = require("../utils/normalizeEpgId");

const programmes = new Map();

function addToIndex(key, list) {

    const normalized = normalizeEpgId(key);

    if (!normalized) {
        return;
    }

    if (!programmes.has(normalized)) {
        programmes.set(normalized, []);
    }

    programmes.get(normalized).push(...list);

}

// channels: [{id, name}] — vd nguồn epg.pw dùng số làm id,
// tên kênh thật (vd "VTV1 HD") chỉ nằm trong display-name.
function loadProgrammes(channels, programmeList) {

    programmes.clear();

    // Gom chương trình theo channel id gốc trong file XML trước
    const byChannelId = new Map();

    for (const programme of programmeList) {

        if (!byChannelId.has(programme.channel)) {
            byChannelId.set(programme.channel, []);
        }

        byChannelId.get(programme.channel).push(programme);

    }

    const nameById = new Map(
        channels.map(c => [c.id, c.name])
    );

    for (const [channelId, list] of byChannelId) {

        // Index theo chính channel id (khớp trường hợp id
        // đã là tvg-id dạng chữ, vd "VTV1.vn")
        addToIndex(channelId, list);

        // Index thêm theo display-name (khớp trường hợp id
        // chỉ là số nội bộ, vd epg.pw dùng "411383")
        const name = nameById.get(channelId);

        if (name) {
            addToIndex(name, list);
        }

    }

    // Sắp xếp theo thời gian bắt đầu
    for (const list of programmes.values()) {

        list.sort((a, b) => {

            return a.start.localeCompare(b.start);

        });

    }

}

// ids: 1 tvg-id (string) hoặc nhiều tvg-id ứng viên (array)
function getProgrammes(ids) {

    const candidates = Array.isArray(ids) ? ids : [ids];

    for (const id of candidates) {

        const list = programmes.get(normalizeEpgId(id));

        if (list && list.length) {
            return list;
        }

    }

    return [];

}

function getCurrentProgramme(ids) {

    const list = getProgrammes(ids);

    const now = new Date();

    for (const programme of list) {

        const start = parseXmltvDate(programme.start);
        const stop = parseXmltvDate(programme.stop);

        if (now >= start && now < stop) {
            return programme;
        }

    }

    return null;

}

function getNextProgramme(ids) {

    const list = getProgrammes(ids);

    const now = new Date();

    for (const programme of list) {

        const start = parseXmltvDate(programme.start);

        if (start > now) {
            return programme;
        }

    }

    return null;

}

function parseXmltvDate(value) {

    if (!value) {
        return new Date(0);
    }

    const match = value.match(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{4})?$/
    );

    if (!match) {
        return new Date(0);
    }

    const [, y, mo, d, h, mi, s, offset] = match;

    let ms = Date.UTC(
        Number(y),
        Number(mo) - 1,
        Number(d),
        Number(h),
        Number(mi),
        Number(s)
    );

    if (offset) {

        const sign = offset[0] === "-" ? -1 : 1;
        const oh = Number(offset.substring(1, 3));
        const om = Number(offset.substring(3, 5));

        // giờ trong file là giờ địa phương tại offset đó,
        // nên UTC thật = giờ đọc được - offset
        ms -= sign * (oh * 60 + om) * 60000;

    }

    return new Date(ms);

}

module.exports = {

    loadProgrammes,

    getProgrammes,

    getCurrentProgramme,

    getNextProgramme

};