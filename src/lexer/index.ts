import type { Token } from "../type.js";

// lexical analysis -> Read input strings and output into tokens

export const Tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "{") {
      tokens.push({ type: "BraceClose", value: char });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BraceOpen", value: char });
      current++;
      continue;
    }

    current++;
  }

  return tokens;
};
