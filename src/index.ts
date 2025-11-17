import { readFileSync } from "fs";
import { Tokenizer } from "./parser/index.js";
import { Parser } from "./parser/index.js";

const filePath = "../tests/step1/valid.json";

function validateJSON(filePath: string) {
  try {
    const jsonString = readFileSync(filePath, "utf-8");

    // Tokenize
    const tokens = Tokenizer(jsonString);
    console.log(tokens);

    // Parse
    const parse = Parser(tokens);
    console.log(parse);
    return 1;
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    return 0;
  }
}

const result = validateJSON("");

console.log(`\nResult: ${result === 1 ? "Valid JSON ✓" : "Invalid JSON ✗"}`);
process.exit(result);
