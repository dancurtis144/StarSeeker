import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';

import useGetGates from '@/data/rest/useGetGates';
import useGetJourney from '@/data/rest/useGetJourney';

export default function HomeScreen() {
  const { getJourney, journey, loading: journeyCostLoading } = useGetJourney();
  const { getGates, gates } = useGetGates();
  // const { getGateRoute, gateRoute } = useGetGateRoute();

  const [distance, setDistance] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    getGates();
  }, [getGates]);

  useEffect(() => {
    if(gates.length > 0) {
      AsyncStorage.setItem('gates', JSON.stringify(gates));
    }
  }, [gates]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/spaceship.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Time to find your next journey</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Distance (AU)</ThemedText>
        <ThemedTextInput inputMode='numeric' onChangeText={(text: string) => setDistance(Number(text))} />
        <ThemedText type="subtitle">Number of passengers</ThemedText>
        <ThemedTextInput inputMode='numeric' onChangeText={(text: string) => setPassengers(Number(text))} />
        <ThemedText type="subtitle">Parking Days</ThemedText>
        <ThemedTextInput inputMode='numeric' onChangeText={(text: string) => setDays(Number(text))} />
        <ThemedButton text="Calculate!" onPress={() => getJourney(distance, passengers, days)} />
      </ThemedView>
      {journeyCostLoading && <ActivityIndicator />}
      {!journeyCostLoading && journey && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Journey Cost: £{journey?.journeyCost.toFixed(2)}</ThemedText>
          <ThemedText type="subtitle">Parking Fee: £{journey?.parkingFee.toFixed(2)}</ThemedText>
          <ThemedText type="subtitle">Recommended Transport: {journey?.recommendedTransport.name}</ThemedText>
          <ThemedText type="subtitle">Capacity: {journey?.recommendedTransport.capacity}</ThemedText>
          <ThemedText type="subtitle">Rate per AU: £{journey?.recommendedTransport.ratePerAu.toFixed(2)}</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
