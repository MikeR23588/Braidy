import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BraidPreview } from '@/components/braid-preview';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { braidStyles } from '@/constants/braids';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.hero} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText style={styles.eyebrow}>Style Catalog</ThemedText>
          <ThemedText type="title" style={styles.title}>
            Braidy
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Browse braid ideas with color combinations and quick visual previews.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.listSection}>
          {braidStyles.map((style) => (
            <Link key={style.slug} href={`/braids/${style.slug}`} asChild>
              <Pressable style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressed]}>
                <ThemedView
                  style={styles.card}
                  lightColor="#ffffff"
                  darkColor="#ffffff">
                  <BraidPreview colors={style.preview} />
                  <View style={styles.cardContent}>
                    <ThemedText type="subtitle" style={styles.cardTitle}>
                      {style.name}
                    </ThemedText>
                    <ThemedText style={styles.description}>{style.description}</ThemedText>
                    <View style={styles.metaRow}>
                      <ThemedText style={styles.metaText}>Sizes: Small, Medium, Large</ThemedText>
                      <ThemedText style={styles.metaText}>Tap to customize</ThemedText>
                    </View>
                    <View style={styles.colorRow}>
                      {style.colors.slice(0, 3).map((color) => (
                        <View key={`${style.name}-${color.code}`} style={styles.colorChipWrap}>
                          <View style={[styles.colorDot, { backgroundColor: color.swatch }]} />
                          <ThemedText style={styles.colorLabel}>{color.code}</ThemedText>
                        </View>
                      ))}
                    </View>
                  </View>
                </ThemedView>
              </Pressable>
            </Link>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 18,
  },
  hero: {
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 24,
    gap: 10,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#ffffff',
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#df7fa8',
  },
  title: {
    fontSize: 42,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 520,
  },
  listSection: {
    gap: 14,
  },
  cardPressable: {
    borderRadius: 24,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.992 }],
  },
  card: {
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#cf6f99',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  colorChipWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fff6fa',
    borderWidth: 2,
    borderColor: '#f1c7d8',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  colorLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
});
