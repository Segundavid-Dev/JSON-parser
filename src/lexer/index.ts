import type { Token } from "../type.js";

// lexical analysis -> Read input strings and output token streams

export const Tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    // skip whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    if (char === "{") {
      tokens.push({ type: "BraceOpen", value: char });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BraceClose", value: char });
      current++;
      continue;
    }

    if (char === "[") {
      tokens.push({ type: "BracketOpen", value: char });
      current++;
      continue;
    }

    if (char === "]") {
      tokens.push({ type: "BracketClose", value: char });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({ type: "Colon", value: char });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "Comma", value: char });
      current++;
      continue;
    }

    // tricky part -> Handling strings
    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      current++;
      tokens.push({ type: "String", value });
      continue;
    }

    throw new Error("Unexpected character");
  }

  return tokens;
};
