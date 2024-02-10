const fs = require('fs/promise');

function render() {
    const html = fs.readFile('./frontend.html')
    return html;
}

async function main(args) {
    try {
        return { body: render() };
    } catch (e) {
        return { body: e.stack };
    }
}
