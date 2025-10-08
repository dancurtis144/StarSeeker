import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import useGetGate from "@/data/rest/useGetGate";

export default function GateScreen() {
  const { gate: code } = useLocalSearchParams();
  const { getGate, gate, loading } = useGetGate();

  useEffect(() => {
    if (code) {
      getGate(code as string);
    }
  }, [code, getGate]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "Back",
          title: gate?.name || "Gate Details",
        }}
      />
      <ThemedView style={styles.titleContainer}>
        {loading && (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}
        {!loading && !gate && (
          <ThemedText type="title">No gate found with code: {code}</ThemedText>
        )}
        {!loading && gate && (
          <>
            <ThemedText type="title">{gate?.name}</ThemedText>
            <ThemedText type="subtitle">Code: {gate?.code}</ThemedText>
            <ThemedText type="subtitle">Links</ThemedText>
            {gate?.links.map((link) => (
              <View
                key={link.code}
                style={{
                  marginBottom: 5,
                  borderWidth: 1,
                  borderColor: "gray",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <ThemedText>{link.code}</ThemedText>
                <ThemedText>HU: {link.hu}</ThemedText>
              </View>
            ))}
          </>
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 32,
    paddingTop: 30,
    height: "100%",
  },
});
