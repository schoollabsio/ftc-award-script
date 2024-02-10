const fs = require('fs/promise');

function render() {
    const html = fs.readFile('./frontend.html')
    return html;
}

async function main(args) {
    return { body: render() };
}
