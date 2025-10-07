import { useCallback, useState } from "react";
import { DEFAULT_ENV_URL, TOKEN } from "../constants";

export type GateLink = {
    code: string;
    hu: number
}

export type Gate = {
    code: string;
    createdAt: string;
    links: GateLink[];
    name: string;
    updatedAt: string;
    uuid: string;
}

const useGetGate = () => {
  const [error, setError] = useState(false);
  const [gate, setGate] = useState<Gate | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getGate = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${DEFAULT_ENV_URL}/gates/${code.toUpperCase()}`, {
        method: "GET",
        headers: {
          'x-api-key': `${TOKEN}`,
        },
      });
      const data = await response.json();
      setGate(data);
    } catch (e) {
      setError(true);
      console.log(`getGate error: ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    getGate,
    gate,
    loading,
  };
};

export default useGetGate;
