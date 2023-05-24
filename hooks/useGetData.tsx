import { Field, UserData } from "@/models";
import { useEffect, useState } from "react";

export function useGetData(url: string) {
  const [data, setData] = useState<Field[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };

  async function fetchData() {
    try {
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  }
}
