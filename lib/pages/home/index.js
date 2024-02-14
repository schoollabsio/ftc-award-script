const fs = require('fs')

async function render() {
    const html = await fs.readFileSync('./lib/pages/home/page.html')
        .toString()
    return html;
}

async function main(args) {
    try {
        return await render()
    } catch (e) {
        return { body: e.stack }
    }
}

module.exports = main
