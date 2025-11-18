import type { Token, AbstractSyntaxTreeNode } from "../type.js";

// syntactic analysis -> parse tokens into AST

export const Parser = (tokens: Token[]): AbstractSyntaxTreeNode => {
  if (!tokens.length) {
    throw new Error("Nothing to parse, Exiting");
  }

  let current = 0;

  function advance() {
    return tokens[++current];
  }

  function ParseValue() {
    const token = tokens[current];

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
