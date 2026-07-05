async function downloadText(url) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000);

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

        return await response.text();

    }
    finally {

        clearTimeout(timeout);

    }

}

module.exports = {
    downloadText
};