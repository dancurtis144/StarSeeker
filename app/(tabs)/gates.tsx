import AsyncStorage from '@react-native-async-storage/async-storage';
import { memo, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedFlatList } from '@/components/themed-flatlist';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import { Gate } from '@/data/rest/useGetGate';
import { useRouter } from 'expo-router';

const GateCard = memo(({ gate }: { gate: Gate }) => {
  const route = useRouter()
  return (
    <Pressable onPress={() => { route.navigate({ pathname: `/gate/[gate]`, params: { gate: gate.code } }) }}>
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">{gate.name}</ThemedText>
        <ThemedText>{gate.code}</ThemedText>
      </ThemedView>
    </Pressable>
  );
});

export default function GatesScreen() {
  const [gates, setGates] = useState<Gate[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('gates').then((storedGates) => {
      setGates(storedGates ? JSON.parse(storedGates) : []);
    });
  }, [])

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Gates
        </ThemedText>
      </ThemedView>
    <ThemedFlatList data={gates} renderItem={({ item }: { item: Gate }) => (<GateCard gate={item} />)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 60
  },
});
