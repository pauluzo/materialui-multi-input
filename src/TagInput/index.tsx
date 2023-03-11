import { Chip, FormControl, Input } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./style";

export default function TagInput() {
  const classes = useStyles();
  const [values, setValues] = useState([] as string[]);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (index: number) => {
    setValues((prevState) => {
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

    if (e.key === "Enter" && value) {
      e.persist();
      let newList = values;
      newList.push(value);
      setValues(newList);
      setInputValue("");
    }
  };

  return (
    <div>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <div className={classes.rootContainer}>
          {values.map((item: string, index: number) => (
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
