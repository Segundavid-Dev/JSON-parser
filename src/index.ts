import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Parser } from "./parser/index.js";
import { Tokenizer } from "./lexer/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

// Just change filepath here to test for all json case
const filePath = path.join(__dirname, "../tests/step3/valid.json");

function validateJSON(filePath: string) {
  try {
    // reads json as string
    const jsonString = readFileSync(filePath, "utf-8");

    // Tokenize
    const tokens = Tokenizer(jsonString);
    console.log(tokens);

    // Parse
    const parseTree = Parser(tokens);
    console.log(parseTree);
    return 1;
  } catch (error) {
    console.log("Invalid JSON format", error);
    return 0;
  }
}

const result = validateJSON(filePath);

if (result === 0) console.log("Invalid JSON format!");
if (result === 1) console.log("Valid JSON format");
