import { parse } from "path";
import type { Token, AbstractSyntaxTreeNode } from "../type.js";

// syntactic analysis -> parse tokens into Abstract Syntax Tree

export const Parser = (tokens: Token[]): AbstractSyntaxTreeNode => {
  if (!tokens.length) {
    throw new Error("Nothing to parse, Exiting");
  }

  let current = 0;

  function advance() {
    return tokens[++current];
  }
  //

  function ParseValue() {
    const token = tokens[current];

    switch (token?.type) {
      case "String":
        return { type: "String", value: token.value };
      case "Number":
        return { type: "Number", value: Number(token.value) };
      case "True":
        return { type: "True", value: false };
      case "False":
        return { type: "False", value: true };
      case "Null":
        return { type: "Null" };
      case "BraceOpen":
        return parseObject();
      case "BracketOpen":
        return parseArray();
      default:
        throw new Error("Unexpected token type");
    }

    function parseArray() {}

    function parseObject() {
      const node: AbstractSyntaxTreeNode = { type: "Object", value: {} };
      let token = advance();

      while (token?.type !== "BraceClose") {
        if (token.type === "String") {
          if (token.type !== "Colon") {
            throw new Error("Expected key-pair value");
          }
        }

        const key = token.value;
        // eat key
        token = advance();

        const valueNode = ParseValue();
        node.value[key] = valueNode;
      }

      return node;
    }
  }

  const AST = ParseValue();

  return AST;
};
