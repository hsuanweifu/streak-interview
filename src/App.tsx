import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import "./App.css";
import MultiVariableAutocomplete from "./components/MultiVariableAutocomplete";
import {
  mockMultiVariableAutocompleteOptions,
  mockMultiVariableAutocompleteValues,
} from "./components/MultiVariableAutocomplete/MultiVariableAutocomplete.mock";
import { MultiVariableAutocompleteValue } from "./components/MultiVariableAutocomplete/MultiVariableAutocomplete.type";

const App = () => {
  const [value, setValue] = useState<MultiVariableAutocompleteValue>(
    mockMultiVariableAutocompleteValues,
  );

  const jsonString = useMemo(() => {
    return JSON.stringify(value);
  }, [value]);

  return (
    <div className="App">
      <Box component="section" sx={{ p: 2 }}>
        <MultiVariableAutocomplete
          options={mockMultiVariableAutocompleteOptions}
          value={value}
          onChange={(input) => setValue(input)}
        />
      </Box>

      <Box component="section" sx={{ p: 2 }}>
        {jsonString}
      </Box>
    </div>
  );
};

export default App;
