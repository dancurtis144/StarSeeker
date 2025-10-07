import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from './themed-text';

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  text: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  onPress,
  text,
  ...rest
}: ThemedButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Pressable
            style={styles.input}
            onPress={onPress}
        >
            <ThemedText type="subtitle">{text}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
  },
});