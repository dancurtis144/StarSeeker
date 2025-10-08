import { type PropsWithChildren } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type Props = PropsWithChildren<{
  data: any[];
  renderItem: ({ item }: any) => React.JSX.Element;
  renderEmptyComponent: () => React.JSX.Element;
}>;

export function ThemedFlatList({
  data,
  renderItem,
  renderEmptyComponent,
  children,
}: Props) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      initialNumToRender={10}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={renderEmptyComponent}
      renderItem={renderItem}
      style={[styles.container, { backgroundColor }]}
      scrollEventThrottle={16}
      windowSize={2}
    >
      <ThemedView style={styles.content}>{children}</ThemedView>
    </FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  contentContainer: {
    gap: 20,
  },
});
