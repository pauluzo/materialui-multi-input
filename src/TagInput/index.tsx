import { Chip, FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./style";

export default function TagInput(props: any) {
  const {
    tags,
    setTags,
    initialValue = "",
    onBlur = null,
    onFocus = null,
    innerRef = null,
    CustomInput = null,
    CustomChip = null,
    inputProps = {},
    chipProps = {},
    allowBackspace = false,
    allowDuplicate = false,
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

      if (!allowDuplicate && duplicate !== -1) {
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
    if (
      !allowBackspace &&
      userTags.length &&
      !value.length &&
      e.key === "Backspace"
    ) {
      let index = userTags.length - 1;
      handleDelete(index);
    }
  };

  return (
    <div>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <div className={classes.rootContainer}>
          {userTags.map((item: string, index: number) =>
            CustomChip ? (
              <CustomChip
                key={index}
                size="small"
                onDelete={() => handleDelete(index)}
                label={item}
              />
            ) : (
              <Chip
                key={index}
                size="small"
                onDelete={() => handleDelete(index)}
                label={item}
                {...chipProps}
              />
            )
          )}
        </div>
        {CustomInput ? (
          <CustomInput
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            inputRef={innerRef}
          />
        ) : (
          <Input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            inputRef={innerRef}
            {...inputProps}
          />
        )}
      </FormControl>
    </div>
  );
}
