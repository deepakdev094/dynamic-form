import { useGetData } from "@/hooks/useGetData";
import Form from "@/components/form";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Field, UserData } from "@/models";

export default function Home() {
  const { data, loading, error } = useGetData(
    process.env.NEXT_PUBLIC_URL as string
  );
  const [responseData, setResponseData] = useState<UserData | null>(null);

  async function postData(data: Field[]) {
    let newData = {} as any;
    data.forEach((item: Field) => {
      console.log("item", item);
      newData[item.fieldName] = item.value;
    });
    try {
      let response = await fetch(process.env.NEXT_PUBLIC_URL as string, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let data = await response.json();
      setResponseData(data?.data);
    } catch (error) {}
  }

  return (
    <Container maxWidth="md">
      {loading && <p>Loading ....</p>}
      {!loading && !error && <Form data={data} onSubmit={postData} />}
      {responseData && (
        <Box sx={{ mt: "20px" }}>
          <Typography variant="h4">Resposne</Typography>
          <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
            {JSON.stringify(responseData)}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
