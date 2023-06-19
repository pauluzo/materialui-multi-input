import { Chip, FormControl, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";

export interface InputInterface {
  value: string | number;
  inputRef?: React.Ref<any>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export interface ChipInterface {
  size: string;
  key?: React.Key | null;
  onDelete: (event: any) => void;
  label: React.ReactNode;
}

interface TagInterface {
  tags: (string | number)[];
  setTags: (items: (string | number)[]) => void;
  initialValue?: string | number;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  innerRef?: React.Ref<any> | undefined;
  CustomInput?: React.FunctionComponent<InputInterface>;
  CustomChip?: React.FunctionComponent<ChipInterface>;
  inputProps?: Record<string, any>;
  chipProps?: Record<string, any>;
  allowBackspace?: Boolean;
  allowDuplicate?: Boolean;
}

export default function TagInput(props: TagInterface) {
  const {
    tags,
    setTags,
    initialValue = "",
    onBlur,
    onFocus,
    innerRef = null,
    CustomInput,
    CustomChip,
    inputProps = {},
    chipProps = {},
    allowBackspace = false,
    allowDuplicate = false,
  } = props;
  const classes = useStyles();
  const [userTags, setUserTags] = useState(tags as (string | number)[]);
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
          {userTags.map((item, index: number) =>
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
