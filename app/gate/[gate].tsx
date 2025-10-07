import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import useGetGate from '@/data/rest/useGetGate';
import { Stack, useLocalSearchParams } from 'expo-router';


export default function GateScreen() {
  const { gate: code } = useLocalSearchParams();
  const { getGate, gate } = useGetGate();

  useEffect(() => {
    if (code) {
      getGate(code as string);
    }
  }, [code, getGate]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{  headerBackTitle: "Back", title: gate?.name || 'Gate Details' }} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title">
          {gate?.name}
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 30
  },
});
