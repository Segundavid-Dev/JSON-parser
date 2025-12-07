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

  function ParseValue() {
    const token = tokens[current];

    switch (token?.type) {
      case "String":
        return { type: "String" as const, value: token.value };
      case "Number":
        return { type: "Number" as const, value: Number(token.value) };
      case "True":
        return { type: "Boolean" as const, value: true };
      case "False":
        return { type: "Boolean" as const, value: false };
      case "Null":
        return { type: "Null" as const };
      case "BraceOpen":
        return parseObject();
      case "BracketOpen":
        return parseArray();
      default:
        throw new Error("Unexpected token type");
    }
  }

  function parseArray() {
    const node: AbstractSyntaxTreeNode = { type: "Array", value: [] };

    let token = advance();

    while (token.type !== "BracketClose") {
      const value = ParseValue();
      node.value.push(value);
      token = advance();
      if (token.type === "Comma") token = advance();
    }
    return node;
  }

  function parseObject() {
    const node: AbstractSyntaxTreeNode = { type: "Object", value: {} };
    let token = advance(); // Eat '{'

    while (token?.type !== "BraceClose") {
      if (token.type === "String") {
        const key = token.value;
        token = advance(); // Eat key
        if (token.type !== "Colon") throw new Error("Expected key-value pair");

        token = advance(); // Eat :
        const value = ParseValue();
        node.value[key] = value;
      } else {
        throw new Error("Expected string key in object");
      }
      token = advance();
      if (token.type === "Comma") token = advance();
    }

    return node;
  }

  const AST = ParseValue();
  return AST;
};
