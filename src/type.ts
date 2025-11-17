export type TokenType = "BraceOpen" | "BraceClose" | "String";

export type Token = {
  type: TokenType;
  value: string;
};

// recursive
export type AbstractSyntaxTreeNode = {
  type: "Object";
  value: { [key: string]: AbstractSyntaxTreeNode };
};
