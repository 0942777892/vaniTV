const fs = require("fs");
const path = require("path");

const config = require("../../config/app");
const epgs = require("../../config/epg.json");

const { parseXmltv } = require("../parser/xmltv");
const { downloadText } = require("./downloader");

async function loadEpg() {

    const channels = [];
    const programmes = [];

    for (const epg of epgs) {

        if (!epg.enabled) {
            continue;
        }

        try {

            let text;

            switch (epg.type) {

                case "file":

                    text = fs.readFileSync(

                        path.join(
                            process.cwd(),
                            config.playlist.folder,
                            epg.path
                        ),

                        "utf8"

                    );

                    break;

                case "url":

                    text = await downloadText(
                        epg.path
                    );

                    break;

                default:

                    console.warn(
                        `[EPG] Unknown type: ${epg.type}`
                    );

                    continue;

            }

            const parsed = parseXmltv(text);

            console.log(
                `Loaded ${parsed.programmes.length} programmes from ${epg.name}`
            );

            channels.push(...parsed.channels);
            programmes.push(...parsed.programmes);

        }
        catch (err) {

            console.error(
                `[EPG] ${epg.name}: ${err.message}`
            );

        }

    }

    return { channels, programmes };

}

module.exports = {
    loadEpg
};