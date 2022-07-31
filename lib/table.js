const API_KEY = process.env.AIRTABLE_API_KEY;
const Airtable = require("airtable");
const base = new Airtable({ apiKey: API_KEY }).base("appYKTCh8XuOBe3m0");

const table = base("coffee-stores");
export default table;
