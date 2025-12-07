import type { Token } from "../type.js";

// lexical analysis -> Read input strings and output token streams

export const Tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "{") {
      tokens.push({ type: "BraceOpen", value: char });
      current++;
      continue;
    }

    // handling strings
    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      // increment token immediately to skip colon checks
      current++;

      tokens.push({ type: "String", value });
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BraceClose", value: char });
      current++;
      continue;
    }

    current++;
  }

  return tokens;
};
