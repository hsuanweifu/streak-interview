export type MultiVariableAutocompleteOptionsKey = undefined | string;
export type MultiVariableAutocompleteOptionsValue =
  | string[]
  | "string"
  | "number"
  | "date"
  | "boolean";

export type MultiVariableAutocompleteOptions = [
  MultiVariableAutocompleteOptionsKey,
  MultiVariableAutocompleteOptionsValue,
];

export type MultiVariableAutocompleteValue = string[][];
