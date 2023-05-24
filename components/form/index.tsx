import { Field } from "@/models";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface FormProps {
  data: Field[] | null;
  onSubmit?: (data: Field[]) => void;
}

let requiredField = ["firstName", "lastName", "emailAddress"];

function Form({ data, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<any>(null);
  useEffect(() => {
    setFormData(data);
  }, []);
  const handleChange = (event: any, index: number) => {
    formData[index].value = event.target.value;
    setFormData([...formData]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Typography variant="h4" component="h4" sx={{ m: "20px 10px" }}>
          Dynamic Form
        </Typography>
        {formData?.length &&
          formData.map((field: any, i: number) => {
            return (
              <Box width={"100%"}>
                <TextField
                  style={{ margin: "10px 0", width: "100%" }}
                  required={requiredField.includes(field.fieldName)}
                  type={field.type}
                  select={field.type === "select" ? true : false}
                  multiline={field.type === "multiline" ? true : false}
                  label={field.fieldName}
                  name={field.fieldName}
                  defaultValue={field.value}
                  rows={4}
                  onChange={(event) => handleChange(event, i)}
                >
                  {field.type === "select" &&
                    field.options.map((option: string) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            );
          })}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Form;
