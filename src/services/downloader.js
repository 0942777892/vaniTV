const zlib = require("zlib");

async function downloadText(url) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 15000);

    try {

        const response = await fetch(url, {

            signal: controller.signal,

            headers: {
                "User-Agent": "vaniTV/0.2"
            }

        });

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const buffer = Buffer.from(
            await response.arrayBuffer()
        );

        // File .gz là file nén sẵn (khác với Content-Encoding gzip
        // ở tầng transport mà fetch tự giải nén) nên cần tự gunzip.
        if (url.endsWith(".gz")) {
            return zlib.gunzipSync(buffer).toString("utf8");
        }

        return buffer.toString("utf8");

    }
    finally {

        clearTimeout(timeout);

    }

}

module.exports = {
    downloadText
};