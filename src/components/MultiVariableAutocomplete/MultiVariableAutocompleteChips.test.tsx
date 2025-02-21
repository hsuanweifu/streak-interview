import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { mockMultiVariableAutocompleteValues } from "./MultiVariableAutocomplete.mock";
import MultiVariableAutocompleteChips from "./MultiVariableAutocompleteChips";

describe("MultiVariableAutocompleteChips", () => {
  describe("render", () => {
    it("filled", () => {
      const { container } = render(
        <MultiVariableAutocompleteChips
          value={mockMultiVariableAutocompleteValues}
          onChipDelete={() => {}}
          validate={() => {}}
        ></MultiVariableAutocompleteChips>,
      );

      const chip1 = screen.queryByText("Name / is / John Doe");
      const chip2 = screen.queryByText("Age / > / 100");
      const deleteIcons =
        container.getElementsByClassName("MuiChip-deleteIcon");

      expect(chip1).toBeInTheDocument();
      expect(chip2).toBeInTheDocument();
      expect(deleteIcons.length).toBe(
        mockMultiVariableAutocompleteValues.length,
      );
    });

    it("empty", () => {
      const { container } = render(
        <MultiVariableAutocompleteChips
          value={[]}
          onChipDelete={() => {}}
          validate={() => {}}
        ></MultiVariableAutocompleteChips>,
      );

      const chip1 = screen.queryByText("Name / is / John Doe");
      const chip2 = screen.queryByText("Age / > / 100");
      const deleteIcons =
        container.getElementsByClassName("MuiChip-deleteIcon");

      expect(chip1).toBeNull();
      expect(chip2).toBeNull();
      expect(deleteIcons.length).toBe(0);
    });
  });

  it("onClick", () => {
    const handleChipDelete = jest.fn();

    const { container } = render(
      <MultiVariableAutocompleteChips
        value={mockMultiVariableAutocompleteValues}
        onChipDelete={handleChipDelete}
        validate={() => {}}
      ></MultiVariableAutocompleteChips>,
    );

    const deleteIcons = container.getElementsByClassName("MuiChip-deleteIcon");

    fireEvent.click(deleteIcons[0]);

    expect(handleChipDelete).toHaveBeenCalledTimes(1);
  });
});
