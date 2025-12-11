// scripts/update-data.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join(__dirname, "..", "app", "public", "data.json");
const API_URL = process.env.API_URL || "https://api.coindesk.com/v1/bpi/currentprice.json";
const API_KEY = process.env.API_KEY;

function ensureFile() {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readJson() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch {
        return [];
    }
}

function writeJson(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function fetchExternal() {
    const headers = {};
    if (API_KEY) headers["Authorization"] = `Bearer ${API_KEY}`;

    const res = await fetch(API_URL, { headers });
    if (!res.ok) throw new Error("API request failed " + res.status);
    return res.json();
}

async function main() {
    ensureFile();
    const data = readJson();
    const payload = await fetchExternal();

    data.push({
        id: crypto.randomUUID(),
        fetchedAt: new Date().toISOString(),
        payload
    });

    writeJson(data);
    console.log("Updated data.json. Total:", data.length);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
