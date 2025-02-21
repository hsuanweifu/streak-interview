import { MultiVariableAutocompleteOptions } from "./MultiVariableAutocomplete.type";

export const mockMultiVariableAutocompleteOptions: MultiVariableAutocompleteOptions[] =
  [
    [undefined, ["Name", "Age", "Birthday", "Nationality", "Color Blind"]],
    ["Name", ["is", "is not"]],
    ["Age", [">", "<", "=", "!="]],
    ["Birthday", "date"],
    ["Nationality", ["Canada", "USA"]],
    ["Color Blind", "boolean"],
    ["is", "string"],
    ["is not", "string"],
    [">", "number"],
    ["<", "number"],
    ["=", "number"],
    ["!=", "number"],
  ];

export const mockMultiVariableAutocompleteValues: string[][] = [
  ["Name", "is", "John Doe"],
  ["Age", ">", "100"],
];
