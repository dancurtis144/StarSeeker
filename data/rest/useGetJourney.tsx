import { useCallback, useState } from "react";
import { DEFAULT_ENV_URL, TOKEN } from "../constants";

type Journey = {
  currency: string;
  journeyCost: number;
  parkingFee: number;
  recommendedTransport: {
    capacity: number;
    name: string;
    ratePerAu: number;
  };
};

const useGetJourney = () => {
  const [error, setError] = useState(false);
  const [journey, setJourney] = useState<Journey | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getJourney = useCallback(
    async (distance: number, number: number, days: number) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${DEFAULT_ENV_URL}/transport/${distance}?passengers=${number}&parking=${days}`,
          {
            method: "GET",
            headers: {
              "x-api-key": `${TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setJourney(data);
      } catch (e) {
        setError(true);
        console.log(`getJourneyCost error: ${e}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    error,
    getJourney,
    journey,
    loading,
  };
};

export default useGetJourney;
