const { XMLParser } = require("fast-xml-parser");

const Programme = require("../models/Programme");

const parser = new XMLParser({

    ignoreAttributes: false,

    attributeNamePrefix: ""

});

function toArray(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

function textOf(value) {

    if (typeof value === "object") {
        return value["#text"] || "";
    }

    return value || "";

}

function parseXmltv(text) {

    const xml = parser.parse(text);

    const channelList = toArray(xml.tv?.channel);

    // channels: id -> tên hiển thị (vd "411383" -> "VTV1 HD")
    // Cần thiết vì một số nguồn EPG (vd epg.pw) dùng số nội bộ
    // làm channel id, tên kênh thật chỉ nằm ở display-name.
    const channels = channelList.map(item => ({

        id: item.id,

        name: textOf(
            Array.isArray(item["display-name"])
                ? item["display-name"][0]
                : item["display-name"]
        )

    }));

    const programmeList = toArray(xml.tv?.programme);

    const programmes = programmeList.map(item => new Programme({

        channel: item.channel,

        title: textOf(item.title),

        description: textOf(item.desc),

        start: item.start,

        stop: item.stop

    }));

    return { channels, programmes };

}

module.exports = {
    parseXmltv
};