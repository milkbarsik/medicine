const { Parser } = require("node-sql-parser");
const fs = require("fs");
const glob = require("glob");

const parser = new Parser();

// если маска не передана — используем *.sql в корне server
const pattern = process.argv[2] || "./*.sql";

// ищем файлы через glob (сам разворачивает маску!)
const files = glob.sync(pattern);

if (files.length === 0) {
  console.error(`No SQL files found for pattern: ${pattern}`);
  process.exit(1);
}

let hasError = false;

for (const file of files) {
  try {
    const sql = fs.readFileSync(file, "utf8");
    parser.astify(sql, { database: "postgresql" });

    console.log(`✔ ${file} — OK`);
  } catch (e) {
    hasError = true;
    console.error(`✖ ${file} — syntax error in ${file}`);
    console.error(String(e.message || e));
  }
}

process.exit(hasError ? 1 : 0);
