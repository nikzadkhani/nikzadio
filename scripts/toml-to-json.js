const fs = require('fs');
const toml = require('toml');
const path = require('path');

const tomlPath = path.join(__dirname, '../data/resume.toml');
const jsonPath = path.join(__dirname, '../data/resume.json');

try {
    const tomlContent = fs.readFileSync(tomlPath, 'utf-8');
    const data = toml.parse(tomlContent);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log('Successfully converted resume.toml to resume.json');
} catch (e) {
    console.error('Error converting TOML to JSON:', e);
    process.exit(1);
}
