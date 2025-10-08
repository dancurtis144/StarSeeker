import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { ThemedView } from "@/components/themed-view";

import useGetGateRoute from "@/data/rest/useGetGateRoute";
import useGetGates from "@/data/rest/useGetGates";
import useGetJourney from "@/data/rest/useGetJourney";

export default function HomeScreen() {
  const { getJourney, journey, loading: journeyCostLoading } = useGetJourney();
  const { getGates, gates } = useGetGates();
  const {
    error: gateRouteError,
    getGateRoute,
    gateRoute,
    loading: gateRouteLoading,
  } = useGetGateRoute();

  const [distance, setDistance] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [days, setDays] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    getGates();
  }, [getGates]);

  useEffect(() => {
    if (gates.length > 0) {
      AsyncStorage.setItem("gates", JSON.stringify(gates));
    }
  }, [gates]);

  const calculateRoutes = async () => {
    getGateRoute(from, to);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/spaceship.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Time to find your next journey...</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Distance (AU)</ThemedText>
        <ThemedTextInput
          inputMode="numeric"
          onChangeText={(text: string) => setDistance(Number(text))}
        />
        <ThemedText type="subtitle">Number of passengers</ThemedText>
        <ThemedTextInput
          inputMode="numeric"
          onChangeText={(text: string) => setPassengers(Number(text))}
        />
        <ThemedText type="subtitle">Parking Days</ThemedText>
        <ThemedTextInput
          inputMode="numeric"
          onChangeText={(text: string) => setDays(Number(text))}
        />
        <ThemedButton
          text="Calculate!"
          onPress={() => getJourney(distance, passengers, days)}
        />
      </ThemedView>
      {journeyCostLoading && <ActivityIndicator />}
      {!journeyCostLoading && journey && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Journey Cost: £{journey?.journeyCost.toFixed(2)}
          </ThemedText>
          <ThemedText type="subtitle">
            Parking Fee: £{journey?.parkingFee.toFixed(2)}
          </ThemedText>
          <ThemedText type="subtitle">
            Recommended Transport: {journey?.recommendedTransport.name}
          </ThemedText>
          <ThemedText type="subtitle">
            Capacity: {journey?.recommendedTransport.capacity}
          </ThemedText>
          <ThemedText type="subtitle">
            Rate per AU: £{journey?.recommendedTransport.ratePerAu.toFixed(2)}
          </ThemedText>
        </ThemedView>
      )}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How about the cheapest journey?</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Where are you leaving from?</ThemedText>
        <Picker
          selectedValue={from}
          onValueChange={(itemValue) => setFrom(itemValue)}
          style={{ backgroundColor: "transparent", color: "black" }}
        >
          <Picker.Item label="Select a departure" value="" />
          {gates.map((gate) => (
            <Picker.Item
              key={gate.code}
              label={`${gate.name} (${gate.code})`}
              value={gate.code}
            />
          ))}
        </Picker>
        <ThemedText type="subtitle">Where are you going?</ThemedText>
        <Picker
          selectedValue={to}
          onValueChange={(itemValue) => setTo(itemValue)}
          style={{ backgroundColor: "transparent", color: "black" }}
        >
          <Picker.Item label="Select a destination" value="" />
          {gates.map((gate) => (
            <Picker.Item
              key={gate.code}
              label={`${gate.name} (${gate.code})`}
              value={gate.code}
            />
          ))}
        </Picker>
        <ThemedButton text="Calculate!" onPress={calculateRoutes} />
      </ThemedView>
      {gateRouteLoading && <ActivityIndicator />}
      {gateRouteError && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Error fetching route. Please ensure both gates are selected and try
            again.
          </ThemedText>
        </ThemedView>
      )}
      {!gateRouteLoading && !gateRouteError && gateRoute && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            To get from {gateRoute.from.code} to {gateRoute.to.code}, this will
            cost
          </ThemedText>
          <ThemedText type="subtitle">
            £{gateRoute?.totalCost.toFixed(2)}
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
