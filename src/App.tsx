import "./App.css";
import TagsInput from "./Example";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const App = () => {
  const theme = createTheme();

  function handleSelecetedTags(items: any) {
    console.log(items);
  }
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          padding: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          Tags input example. Testing starts...
        </div>
        <div>
          <TagsInput
            selectedTags={handleSelecetedTags}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="add Tags"
            label="tags"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
