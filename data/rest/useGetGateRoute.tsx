import { useCallback, useState } from "react";
import { DEFAULT_ENV_URL, TOKEN } from "../constants";
import { Gate } from "./useGetGate";

type GateRoute = {
    from: Gate;
    to: Gate;
    totalCost: number;
}

const useGetGateRoute = () => {
  const [error, setError] = useState(false);
  const [gateRoute, setGateRoute] = useState<GateRoute | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getGateRoute = useCallback(async (code: string, targetCode: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${DEFAULT_ENV_URL}/gates/${code.toUpperCase()}/to/${targetCode.toUpperCase()}`, {
        method: "GET",
        headers: {
          'x-api-key': `${TOKEN}`,
        },
      });
      const data = await response.json();
      setGateRoute(data);
    } catch (e) {
      setError(true);
      console.log(`getGateRoute error: ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    getGateRoute,
    gateRoute,
    loading,
  };
};

export default useGetGateRoute;
