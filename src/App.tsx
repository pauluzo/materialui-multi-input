import "./App.css";
import TagsInput from "./Example";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import TagInput from "./TagInput";
import { useState } from "react";

const App = () => {
  const theme = createTheme();
  const [tags, setTags] = useState(["Tags1", "Tags2"]);

  function handleSelecetedTags(items: any) {
    console.log("Handle selected items is called: ", items);
    setTags(items);
  }
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
            setUserTags={handleSelecetedTags}
            userTags={tags}
            initialValue="The initial value"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
