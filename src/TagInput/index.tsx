import { Chip, FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./style";

export default function TagInput({ ...props }) {
  const { userTags, setUserTags, initialValue = "" } = props;
  const classes = useStyles();
  const [tags, setTags] = useState(userTags as string[]);
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setUserTags(tags);
    console.log("This useEffect is called: ", tags);
  }, [tags]);

  const handleDelete = (index: number) => {
    setTags((prevState) => {
      const arr = [...prevState];
      arr.splice(index, 1);

      return arr;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleKeyDown = (e: any) => {
    const { value } = e.target;

    // If the enter key is clicked on
    if (e.key === "Enter" && value) {
      const duplicate = tags.indexOf(value.trim());

      if (duplicate !== -1) {
        setInputValue("");
        return;
      }

      if (!value.replace(/\s/g, "").length) return;

      e.persist();
      const newList = [...tags];
      newList.push(value.trim());
      setTags(newList);
      setInputValue("");
      console.log("New list", tags);
    }

    // If the backspace key is clicked on
    if (tags.length && !value.length && e.key === "Backspace") {
      let newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  return (
    <div>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <div className={classes.rootContainer}>
          {tags.map((item: string, index: number) => (
            <Chip
              key={index}
              size="small"
              onDelete={() => handleDelete(index)}
              label={item}
            />
          ))}
        </div>
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
    </div>
  );
}
