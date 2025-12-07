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

    if (/[a-z]/.test(char)) {
      let value = "";

      while (current < input.length && /[a-z]/.test(input[current])) {
        value += input[current];
        current++;
      }

      if (value === "true") {
        tokens.push({ type: "True", value });
      } else if (value === "false") {
        tokens.push({ type: "False", value });
      } else if (value === "null") {
        tokens.push({ type: "Null", value });
      } else {
        throw new Error(`Unexpected keyword: ${value}`);
      }
      continue;
    }

    if (/[0-9-]/.test(char)) {
      let value = "";

      while (current < input.length && /[0-9.\-eE+]/.test(input[current])) {
        value += input[current];
        current++;
      }

      tokens.push({ type: "Number", value });
      continue;
    }

    if (char === '"') {
      // tricky part -> Handling strings
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
