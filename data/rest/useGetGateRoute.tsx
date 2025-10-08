import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCallback, useState } from "react";
import { DEFAULT_ENV_URL, TOKEN } from "../constants";
import { Gate } from "./useGetGate";

type GateRoute = {
  from: Gate;
  to: Gate;
  totalCost: number;
};

const useGetGateRoute = () => {
  const [error, setError] = useState(false);
  const [gateRoute, setGateRoute] = useState<GateRoute | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getGateRoute = useCallback(async (code: string, targetCode: string) => {
    try {
      setError(false);
      setLoading(true);
      if (code !== "" && targetCode !== "") {
        const response = await fetch(
          `${DEFAULT_ENV_URL}/gates/${code.toUpperCase()}/to/${targetCode.toUpperCase()}`,
          {
            method: "GET",
            headers: {
              "x-api-key": `${TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setGateRoute(data);
        // store previous routes
        const previousRoutes = await AsyncStorage.getItem("previousRoutes");
        let routes = previousRoutes ? JSON.parse(previousRoutes) : [];
        routes.push({
          to: targetCode.toUpperCase(),
          from: code.toUpperCase(),
          distance: data.fromToDistance,
          cost: data.totalCost,
        });
        await AsyncStorage.setItem("previousRoutes", JSON.stringify(routes));
      } else {
        setError(true);
      }
    } catch (e) {
      // this seems to not be triggered when supplying blank codes
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
