const { XMLParser } = require("fast-xml-parser");

const Programme = require("../models/Programme");

const parser = new XMLParser({

    ignoreAttributes: false,

    attributeNamePrefix: ""

});

function parseXmltv(text) {

    const xml = parser.parse(text);

    const programmes = xml.tv?.programme || [];

    const list = Array.isArray(programmes)
        ? programmes
        : [programmes];

    return list.map(item => new Programme({

        channel: item.channel,

        title:
            typeof item.title === "object"
                ? item.title["#text"] || ""
                : item.title || "",

        description:
            typeof item.desc === "object"
                ? item.desc["#text"] || ""
                : item.desc || "",

        start: item.start,

        stop: item.stop

    }));

}

module.exports = {
    parseXmltv
};