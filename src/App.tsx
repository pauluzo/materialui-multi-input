import "./App.css";
import TagsInput from "./Example";
import { Button, Chip, Input, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import TagInput from "./TagInput";
import { useEffect, useRef, useState } from "react";
import { useStyles } from "./appStyle";

const App = () => {
  const theme = createTheme();
  const [tags, setTags] = useState(["Tags1", "Tags2"]);
  const inputForwardRef: any = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    inputForwardRef.current?.focus?.();
  }, [tags]);

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

  const customInput = ({
    value,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    inputRef,
  }: any) => (
    <input
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      id="custom_input"
      onKeyDown={(e) => {
        onKeyDown(e);
      }}
      ref={inputForwardRef}
    />
  );
  const customChip = Chip;

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
            innerRef={inputForwardRef}
            CustomInput={customInput}
            inputProps={{
              id: "tag_input",
              type: "text",
              placeholder: "Enter tag",
              style: {
                fontSize: "24px",
              },
            }}
            chipProps={{
              variant: "outlined",
              color: "primary",
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
