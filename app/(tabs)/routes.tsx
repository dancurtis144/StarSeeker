import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { memo, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedFlatList } from "@/components/themed-flatlist";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const RouteCard = memo(function RouteCard({ route }: { route: any }) {
  return (
    <ThemedView style={{ borderWidth: 1, borderColor: "gray", padding: 16 }}>
      <ThemedText type="subtitle">
        Route from {route.from} to {route.to}
      </ThemedText>
      <ThemedText>Cost: £{route.cost.toFixed(2)}</ThemedText>
    </ThemedView>
  );
});

export default function RoutesScreen() {
  const [previousRoutes, setPreviousRoutes] = useState([]);

  useFocusEffect(() => {
    AsyncStorage.getItem("previousRoutes").then((routes) => {
      if (routes) {
        setPreviousRoutes(JSON.parse(routes));
      }
    });
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Previous Routes</ThemedText>
      <ThemedFlatList
        data={previousRoutes}
        renderItem={({ item }) => <RouteCard route={item} />}
        renderEmptyComponent={() => (
          <ThemedView>
            <ThemedText type="subtitle">
              No previous routes available
            </ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: "gray",
    gap: 8,
    marginBottom: 8,
  },
});
