import "./App.css";
import TagsInput from "./Example";
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import TagInput from "./TagInput";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const theme = createTheme();
  const [tags, setTags] = useState(["Tags1", "Tags2"]);
  const inputRef: any = useRef(null);

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  const handleSelecetedTags = (items: any) => {
    setTags(items);
  };

  const handleBlur = (event: any) => {
    const { value } = event.target;

    console.log("The blur event is called: ", value);
  };

  const handleFocus = (event: any) => {
    const { value } = event.target;

    console.log("The focus event is called: ", value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          padding: "20px",
        }}
      >
        <div>
          {/* <TagsInput
            selectedTags={handleSelecetedTags}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="add Tags"
            label="tags"
          /> */}
          <TagInput
            setTags={handleSelecetedTags}
            tags={tags}
            initialValue="The initial value"
            onBlur={handleBlur}
            onFocus={handleFocus}
            innerRef={inputRef}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
