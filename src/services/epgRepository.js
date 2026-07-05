const programmes = new Map();

function loadProgrammes(list) {

    programmes.clear();

    for (const programme of list) {

        if (!programmes.has(programme.channel)) {
            programmes.set(programme.channel, []);
        }

        programmes
            .get(programme.channel)
            .push(programme);

    }

    // Sắp xếp theo thời gian bắt đầu
    for (const list of programmes.values()) {

        list.sort((a, b) => {

            return a.start.localeCompare(b.start);

        });

    }

}

function getProgrammes(channel) {

    return programmes.get(channel) || [];

}

function getCurrentProgramme(channel) {

    const list = getProgrammes(channel);

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

function getNextProgramme(channel) {

    const list = getProgrammes(channel);

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

    const text = value.substring(0, 14);

    const year = Number(text.substring(0, 4));
    const month = Number(text.substring(4, 6)) - 1;
    const day = Number(text.substring(6, 8));
    const hour = Number(text.substring(8, 10));
    const minute = Number(text.substring(10, 12));
    const second = Number(text.substring(12, 14));

    return new Date(
        year,
        month,
        day,
        hour,
        minute,
        second
    );

}

module.exports = {

    loadProgrammes,

    getProgrammes,

    getCurrentProgramme,

    getNextProgramme

};