// scripts/update-data.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join(__dirname, "..", "public", "data.json");
const FRED_API_KEY = process.env.API_KEY || "089008ad0f401bb844a1e4adf24ad2bb";
const FRED_BASE_URL = "https://api.stlouisfed.org/fred";

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

async function fetchFredData() {
    const url = `${FRED_BASE_URL}/series/observations?series_id=FEDFUNDS&api_key=${FRED_API_KEY}&file_type=json&observation_start=2015-06-01`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error("FRED API request failed " + res.status);
    return res.json();
}

async function main() {
    ensureFile();
    const data = readJson();
    const payload = await fetchFredData();

    data.push({
        id: crypto.randomUUID(),
        fetchedAt: new Date().toISOString(),
        seriesId: "FEDFUNDS",
        seriesName: "Federal Funds Effective Rate",
        payload
    });

    writeJson(data);
    console.log("Updated data.json with FRED data. Total:", data.length);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
