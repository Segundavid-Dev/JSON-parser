import { readFileSync } from "fs";
import { Tokenizer } from "./lexer/index.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// import { Parser } from "./parser/index.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const filePath = join(__dirname, "../tests/step1/valid.json");
const filePath = "/tests/step1/valid.json";

function validateJSON(filePath: string) {
  try {
    const jsonString = readFileSync(filePath, "utf-8");

    // Tokenize
    const tokens = Tokenizer(jsonString);
    console.log(tokens);

    // // Parse
    // const parse = Parser(tokens);
    // console.log(parse);
    return 1;
  } catch (error) {
    console.log("Invalid JSON format", error);
    return 0;
  }
}

const result = validateJSON(filePath);
console.log(result);
