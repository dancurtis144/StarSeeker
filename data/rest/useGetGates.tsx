import { useCallback, useState } from "react";
import { DEFAULT_ENV_URL, TOKEN } from "../constants";
import { Gate } from "./useGetGate";


const useGetGates = () => {
  const [error, setError] = useState(false);
  const [gates, setGates] = useState<Array<Gate>>([]);
  const [loading, setLoading] = useState(false);

  const getGates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${DEFAULT_ENV_URL}/gates`, {
        method: "GET",
        headers: {
          'x-api-key': `${TOKEN}`,
        },
      });
      const data = await response.json();
      setGates(data);
    } catch (e) {
      setError(true);
      console.log(`getGates error: ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    getGates,
    gates,
    loading,
  };
};

export default useGetGates;
