import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
  TextField,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import {
  MultiVariableAutocompleteOptions,
  MultiVariableAutocompleteOptionsKey,
  MultiVariableAutocompleteOptionsValue,
  MultiVariableAutocompleteValue,
} from "./MultiVariableAutocomplete.type";
import MultiVariableAutocompleteChips from "./MultiVariableAutocompleteChips";

export interface MultiVariableAutocompleteProps
  extends Omit<
    AutocompleteProps<string, boolean, boolean, boolean>,
    "options" | "onChange" | "multiple" | "renderInput" | "value"
  > {
  options: MultiVariableAutocompleteOptions[];
  value: MultiVariableAutocompleteValue;
  onChange: (input: MultiVariableAutocompleteValue) => void;
}

const MultiVariableAutocomplete = ({
  options,
  value,
  onChange,
  ...props
}: MultiVariableAutocompleteProps) => {
  // current options key to the list of the autocomplete options
  const [optionsKey, setOptionsKey] =
    useState<MultiVariableAutocompleteOptionsKey>(undefined);

  // autocomplete options grouped by keys
  const optionsMap: Map<
    MultiVariableAutocompleteOptionsKey,
    MultiVariableAutocompleteOptionsValue
  > = useMemo(() => {
    return new Map<
      MultiVariableAutocompleteOptionsKey,
      MultiVariableAutocompleteOptionsValue
    >(options);
  }, [options]);

  // current selected chip values
  const [currentValue, setCurrentValue] =
    useState<MultiVariableAutocompleteValue>(value);

  // autocomplete attributes based on current options key
  const {
    autocompleteOptions,
    isFreeSolo,
    inputType,
  }: {
    autocompleteOptions: string[];
    isFreeSolo: boolean;
    inputType: string;
  } = useMemo(() => {
    const optionsValue: MultiVariableAutocompleteOptionsValue =
      optionsMap.get(optionsKey);

    // dropdown options
    if (Array.isArray(optionsValue)) {
      return {
        autocompleteOptions: optionsValue,
        isFreeSolo: false,
        inputType: "text",
      };
    }

    // boolean options
    if (optionsValue === "boolean") {
      return {
        autocompleteOptions: ["true", "false"],
        isFreeSolo: false,
        inputType: "text",
      };
    }

    // custom string, number, date input
    return {
      autocompleteOptions: [],
      isFreeSolo: true,
      inputType: optionsValue === "string" ? "text" : optionsValue,
    };
  }, [optionsMap, optionsKey]);

  /**
   * Validate chip item to ensure it has reached end of the input.
   * @param {string[]} item Item to be validated.
   * @return {boolean} if the item has reached end of the input.
   */
  const validateItem = useCallback(
    (item: string[]) => {
      return item?.length > 0 && !optionsMap.has(item[item?.length - 1]);
    },
    [optionsMap],
  );

  /**
   * Add to current value's exisiting or new chip item.
   * @param {string} input The data to be changed.
   */
  const addToCurrentValue = useCallback(
    (input: string) => {
      if (!currentValue) {
        setCurrentValue([]);
      }

      // create a new chip if none exisit or the latest is complete.
      // otherwise attach to the latest chip.
      if (
        !currentValue.length ||
        validateItem(currentValue[currentValue.length - 1])
      ) {
        currentValue.push([input]);
      } else {
        currentValue[currentValue.length - 1].push(input);
      }

      setCurrentValue(currentValue);
    },
    [currentValue, validateItem],
  );

  /**
   * Handle input change for both dropdown selection and free solo inputs.
   * @param {string} input The data to be changed.
   * @param {AutocompleteChangeReason} reason Reason for the change.
   */
  const handleChange = useCallback(
    (input: string, reason: AutocompleteChangeReason) => {
      switch (reason) {
        case "createOption":
        case "selectOption":
          // return to start if end of dropdowns
          setOptionsKey(optionsMap.has(input) ? input : undefined);

          // add to current value
          addToCurrentValue(input);
          break;
      }

      onChange([...currentValue]);
    },
    [optionsMap, currentValue],
  );

  /**
   * Handle chip delete icon click and remove it from the array.
   * @param {number} index - The index of the chip to delete from the `values` array.
   */
  const handleChipDelete = useCallback(
    (index: number) => {
      const result = [...currentValue];

      // if last chip return to start of dropdown
      if (index === result.length - 1) {
        setOptionsKey(undefined);
      }

      result.splice(index, 1);
      setCurrentValue(result);
      onChange([...currentValue]);
    },
    [currentValue],
  );

  /**
   * Handle key down event on the input.
   * @param {React.KeyboardEvent<HTMLDivElement>} e Keydown event.
   */
  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLDivElement> & {
        defaultMuiPrevented?: boolean;
      },
    ) => {
      if (
        !(e.target as HTMLInputElement).value &&
        e.key === "Backspace" &&
        currentValue.length
      ) {
        handleChipDelete(currentValue.length - 1);
      }
    },
    [optionsMap, currentValue],
  );

  return (
    <Autocomplete
      {...props}
      options={autocompleteOptions}
      getOptionLabel={(option) => (typeof option === "string" ? option : "")}
      freeSolo={isFreeSolo}
      onChange={(_e, value, reason) => {
        handleChange(value as string, reason);
      }}
      onKeyDown={handleKeyDown}
      renderInput={(params) => (
        <div className="multi-autocomplete">
          <MultiVariableAutocompleteChips
            value={currentValue}
            onChipDelete={handleChipDelete}
            validate={validateItem}
          ></MultiVariableAutocompleteChips>
          <TextField {...params} type={inputType} />
        </div>
      )}
      value={[]} // hardcodde to empty array to clear input on change
      autoSelect
    />
  );
};

export default MultiVariableAutocomplete;
