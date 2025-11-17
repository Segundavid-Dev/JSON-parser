import type { Token } from "../type.js";
import type { AbstractSyntaxTreeNode } from "../type.js";

// Function to tokenize input strings
export const Tokenizer = (input: string): Token[] => {
  // use current variable to track position in JSON string until we cover entire string length
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

// parse tokenized tokens into AST based on language grammar
export const Parser = (tokens: Token[]): AbstractSyntaxTreeNode => {
  if (!tokens.length) {
    throw new Error("Nothing to parse, Exiting");
  }

  let current = 0;

  // define move forward sequence
  function advance() {
    return tokens[++current];
  }

  function ParseValue() {
    const token = tokens[current];

    // switch statement to handle future multiple values
    switch (token?.type) {
      case "BraceOpen":
        return parseObject();
      default:
        throw new Error("Unexpected token type");
    }

    function parseObject() {
      const node: AbstractSyntaxTreeNode = { type: "Object", value: {} };
      let token = advance();

      while (token?.type !== "BraceClose") {
        if (token?.type === "String") {
          const key = token.value;
          token = advance();
        }
      }

      return node;
    }
  }

  const AST = ParseValue();

  return AST;
};
