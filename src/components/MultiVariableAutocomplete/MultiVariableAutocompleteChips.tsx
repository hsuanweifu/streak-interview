import { Chip } from "@mui/material";
import React from "react";

export interface MultiVariableAutocompleteChipsProps {
  value: string[][];
  onChipDelete: (index: number) => void;
  validate: (item: string[]) => boolean | void;
}

const MultiVariableAutocompleteChips = ({
  value,
  onChipDelete,
  validate,
}: MultiVariableAutocompleteChipsProps) => {
  return (
    <>
      {value.map((value, index) => {
        return (
          <Chip
            key={index}
            label={value.reduce((acc: string, cur: string, index) => {
              if (!index) {
                return cur;
              }
              return `${acc} / ${cur}`;
            }, "")}
            onDelete={() => onChipDelete(index)}
            color={validate(value) ? "default" : "warning"}
          />
        );
      })}
    </>
  );
};

export default MultiVariableAutocompleteChips;
