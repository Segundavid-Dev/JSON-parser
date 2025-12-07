export type TokenType =
  | "BraceOpen"
  | "BraceClose"
  | "String"
  | "Colon"
  | "Number"
  | "True"
  | "False"
  | "Null"
  | "BracketOpen";

export type Token = {
  type: TokenType;
  value: string;
};

// recursive
export type AbstractSyntaxTreeNode =
  | {
      type: "Object";
      value: { [key: string]: AbstractSyntaxTreeNode };
    }
  | { type: "String"; value: string }
  | { type: "Number"; value: number }
  | { type: "Boolean"; value: boolean }
  | { type: "Null"; value: null };
