import { Chip, FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./style";

export default function TagInput({ ...props }) {
  const {
    tags,
    setTags,
    initialValue = "",
    onBlur = null,
    onFocus = null,
    innerRef = null,
  } = props;
  const classes = useStyles();
  const [userTags, setUserTags] = useState(tags as string[]);
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setUserTags(tags);
  }, [tags]);

  const handleDelete = (index: number) => {
    const newArray = [...userTags];
    newArray.splice(index, 1);

    setUserTags(newArray);
    setTags(newArray);
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
      const duplicate = userTags.indexOf(value.trim());

      if (duplicate !== -1) {
        setInputValue("");
        return;
      }

      if (!value.replace(/\s/g, "").length) return;

      e.persist();
      const newList = [...userTags];
      newList.push(value.trim());
      setUserTags(newList);
      setTags(newList);
      setInputValue("");
    }

    // If the backspace key is clicked on
    if (userTags.length && !value.length && e.key === "Backspace") {
      let index = userTags.length - 1;
      handleDelete(index);
    }
  };

  return (
    <div>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <div className={classes.rootContainer}>
          {userTags.map((item: string, index: number) => (
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
          onBlur={onBlur}
          onFocus={onFocus}
          inputRef={innerRef}
        />
      </FormControl>
    </div>
  );
}
