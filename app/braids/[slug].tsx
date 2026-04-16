import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BraidPreview } from '@/components/braid-preview';
import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getBraidStyleBySlug } from '@/constants/braids';

const categoryOrder = ['Basic', 'Solid', 'Blend', 'Ombre'] as const;
const bookingWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const addOnOptions = [
  {
    id: 'extra-length',
    label: 'Extra Length',
    detail: 'Add more length for a longer finished braid style.',
    price: 5,
  },
  {
    id: 'past-waist-length',
    label: 'Past Waist Length',
    detail: 'Take the braid length below the waist for a more dramatic finish.',
    price: 10,
  },
  {
    id: 'boho',
    label: 'Boho',
    detail: 'Add loose textured pieces for a softer, fuller look.',
    price: 20,
  },
] as const;

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatBookingDate(date: Date | null) {
  if (!date) {
    return 'Not selected';
  }

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildCalendarDays(monthDate: Date) {
  const monthStart = startOfMonth(monthDate);
  const firstWeekday = monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      inMonth: date.getMonth() === monthStart.getMonth(),
    };
  });
}

export default function BraidDetailScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const braid = getBraidStyleBySlug(params.slug);
  const today = useMemo(() => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return current;
  }, []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedAddOn, setSelectedAddOn] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(today);

  const selectedAddOnDetails = addOnOptions.find((addOn) => addOn.id === selectedAddOn) ?? null;

  const groupedColors = useMemo(() => {
    if (!braid || !selectedSize) {
      return [];
    }

    return categoryOrder
      .map((category) => ({
        category,
        items: braid.colors.filter((color) => color.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [braid, selectedSize]);

  const calendarDays = useMemo(() => buildCalendarDays(calendarMonth), [calendarMonth]);
  const atCurrentMonth =
    calendarMonth.getFullYear() === today.getFullYear() &&
    calendarMonth.getMonth() === today.getMonth();

  if (!braid) {
    return (
      <ThemedView style={styles.screen}>
        <Stack.Screen options={{ title: 'Style not found' }} />
        <View style={styles.missingState}>
          <ThemedText type="title">Braid style not found</ThemedText>
          <ThemedText style={styles.missingText}>
            Return to the catalog and choose one of the available braid styles.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <Stack.Screen options={{ title: braid.name }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.hero} lightColor="#ffffff" darkColor="#ffffff">
          <View style={styles.heroTopRow}>
            <View style={styles.heroTextWrap}>
              <ThemedText style={styles.eyebrow}>Customize Your Look</ThemedText>
              <ThemedText type="title" style={styles.title}>
                {braid.name}
              </ThemedText>
              <ThemedText style={styles.description}>{braid.detail}</ThemedText>
            </View>
            <BraidPreview colors={braid.preview} size="large" />
          </View>
          <ExternalLink href="https://www.sensationnel.com/color-chart/">
            <ThemedText type="link">View Sensationnel color chart examples</ThemedText>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.section} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText type="subtitle">1. Choose your size</ThemedText>
          <View style={styles.optionGrid}>
            {braid.sizes.map((size) => {
              const active = selectedSize === size.id;

              return (
                <Pressable
                  key={size.id}
                  onPress={() => {
                    setSelectedSize(size.id);
                    setSelectedAddOn(null);
                    setSelectedColor(null);
                  }}
                  style={({ pressed }) => [
                    styles.optionCard,
                    active && styles.optionCardActive,
                    pressed && styles.optionCardPressed,
                  ]}>
                  <ThemedText style={[styles.optionTitle, active && styles.optionTitleActive]}>
                    {size.label}
                  </ThemedText>
                  <ThemedText style={styles.optionText}>{size.detail}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </ThemedView>

        <ThemedView style={styles.section} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText type="subtitle">2. Add-ons</ThemedText>
          {!selectedSize ? (
            <ThemedText style={styles.helperText}>
              Select Small, Medium, or Large first to see available add-on upgrades.
            </ThemedText>
          ) : (
            <View style={styles.optionGrid}>
              {addOnOptions.map((addOn) => {
                const active = selectedAddOn === addOn.id;

                return (
                  <Pressable
                    key={addOn.id}
                    onPress={() => setSelectedAddOn(addOn.id)}
                    style={({ pressed }) => [
                      styles.optionCard,
                      active && styles.optionCardActive,
                      pressed && styles.optionCardPressed,
                    ]}>
                    <View style={styles.addOnHeader}>
                      <ThemedText style={[styles.optionTitle, active && styles.optionTitleActive]}>
                        {addOn.label}
                      </ThemedText>
                      <ThemedText style={styles.addOnPrice}>+${addOn.price}</ThemedText>
                    </View>
                    <ThemedText style={styles.optionText}>{addOn.detail}</ThemedText>
                  </Pressable>
                );
              })}
            </View>
          )}
        </ThemedView>

        <ThemedView style={styles.section} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText type="subtitle">3. Pick your color</ThemedText>
          {!selectedSize ? (
            <ThemedText style={styles.helperText}>
              Select Small, Medium, or Large first to unlock the color choices for this braid style.
            </ThemedText>
          ) : (
            <View style={styles.colorSections}>
              {groupedColors.map((group) => (
                <View key={group.category} style={styles.colorGroup}>
                  <ThemedText style={styles.groupTitle}>{group.category}</ThemedText>
                  <View style={styles.colorGrid}>
                    {group.items.map((color) => {
                      const active = selectedColor === color.code;

                      return (
                        <Pressable
                          key={color.code}
                          onPress={() => setSelectedColor(color.code)}
                          style={({ pressed }) => [
                            styles.colorCard,
                            active && styles.colorCardActive,
                            pressed && styles.colorCardPressed,
                          ]}>
                          <View style={[styles.colorSwatch, { backgroundColor: color.swatch }]} />
                          <ThemedText style={styles.colorCode}>{color.code}</ThemedText>
                          <ThemedText style={styles.colorName}>{color.label}</ThemedText>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ThemedView>

        <ThemedView style={styles.selectionSummary} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText type="subtitle">Your selection</ThemedText>
          <ThemedText style={styles.selectionText}>Style: {braid.name}</ThemedText>
          <ThemedText style={styles.selectionText}>
            Size: {selectedSize ? braid.sizes.find((size) => size.id === selectedSize)?.label : 'Not selected'}
          </ThemedText>
          <ThemedText style={styles.selectionText}>
            Add-on:{' '}
            {selectedAddOnDetails
              ? `${selectedAddOnDetails.label} (+$${selectedAddOnDetails.price})`
              : 'Not selected'}
          </ThemedText>
          <ThemedText style={styles.selectionText}>
            Color: {selectedColor ?? 'Not selected'}
          </ThemedText>
          <ThemedText style={styles.selectionText}>Booking Date: {formatBookingDate(selectedDate)}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section} lightColor="#ffffff" darkColor="#ffffff">
          <ThemedText type="subtitle">4. Booking calendar</ThemedText>
          <View style={styles.calendarHeader}>
            <Pressable
              disabled={atCurrentMonth}
              onPress={() => {
                if (atCurrentMonth) {
                  return;
                }

                setCalendarMonth(
                  (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
                );
              }}
              style={({ pressed }) => [
                styles.monthButton,
                atCurrentMonth && styles.monthButtonDisabled,
                pressed && !atCurrentMonth && styles.monthButtonPressed,
              ]}>
              <ThemedText style={styles.monthButtonText}>Prev</ThemedText>
            </Pressable>
            <ThemedText style={styles.monthLabel}>
              {calendarMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </ThemedText>
            <Pressable
              onPress={() =>
                setCalendarMonth(
                  (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
                )
              }
              style={({ pressed }) => [styles.monthButton, pressed && styles.monthButtonPressed]}>
              <ThemedText style={styles.monthButtonText}>Next</ThemedText>
            </Pressable>
          </View>

          <View style={styles.weekdayRow}>
            {bookingWeekdays.map((day) => (
              <View key={day} style={styles.weekdayCell}>
                <ThemedText style={styles.weekdayText}>{day}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map(({ date, inMonth }) => {
              const isPast = date < today;
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

              return (
                <Pressable
                  key={date.toISOString()}
                  disabled={isPast}
                  onPress={() => setSelectedDate(new Date(date))}
                  style={({ pressed }) => [
                    styles.dayCell,
                    !inMonth && styles.dayCellOutsideMonth,
                    isPast && styles.dayCellDisabled,
                    isSelected && styles.dayCellSelected,
                    pressed && !isPast && styles.dayCellPressed,
                  ]}>
                  <ThemedText
                    style={[
                      styles.dayText,
                      !inMonth && styles.dayTextOutsideMonth,
                      isPast && styles.dayTextDisabled,
                      isSelected && styles.dayTextSelected,
                    ]}>
                    {date.getDate()}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          <ThemedText style={styles.helperText}>
            Choose a date for your appointment. Past dates are unavailable.
          </ThemedText>
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
    padding: 20,
    gap: 16,
  },
  hero: {
    borderRadius: 28,
    padding: 20,
    gap: 14,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#ffffff',
  },
  heroTopRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  heroTextWrap: {
    flex: 1,
    minWidth: 220,
    gap: 8,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#df7fa8',
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 520,
  },
  section: {
    borderRadius: 24,
    padding: 18,
    gap: 14,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#ffffff',
  },
  optionGrid: {
    gap: 12,
  },
  optionCard: {
    borderRadius: 18,
    padding: 14,
    gap: 6,
    borderWidth: 2,
    borderColor: '#ecb6cc',
    backgroundColor: '#fff8fb',
  },
  optionCardActive: {
    borderColor: '#df7fa8',
    backgroundColor: '#ffeef5',
  },
  optionCardPressed: {
    opacity: 0.94,
  },
  optionTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  optionTitleActive: {
    color: '#cf6f99',
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  addOnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  addOnPrice: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#cf6f99',
  },
  helperText: {
    fontSize: 15,
    lineHeight: 22,
  },
  colorSections: {
    gap: 18,
  },
  colorGroup: {
    gap: 10,
  },
  groupTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#cf6f99',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorCard: {
    width: '47%',
    minWidth: 145,
    borderRadius: 18,
    padding: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#fff8fb',
  },
  colorCardActive: {
    borderColor: '#df7fa8',
    backgroundColor: '#ffeef5',
  },
  colorCardPressed: {
    opacity: 0.94,
  },
  colorSwatch: {
    width: '100%',
    height: 60,
    borderRadius: 14,
  },
  colorCode: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  colorName: {
    fontSize: 13,
    lineHeight: 18,
  },
  selectionSummary: {
    borderRadius: 24,
    padding: 18,
    gap: 6,
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#ffffff',
  },
  selectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  monthButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#ecb6cc',
    backgroundColor: '#fff8fb',
  },
  monthButtonDisabled: {
    opacity: 0.45,
  },
  monthButtonPressed: {
    opacity: 0.92,
  },
  monthButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#cf6f99',
  },
  monthLabel: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayCell: {
    width: '14.2857%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  weekdayText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#cf6f99',
    textTransform: 'uppercase',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#efbfd3',
    backgroundColor: '#fff8fb',
  },
  dayCellOutsideMonth: {
    backgroundColor: '#ffffff',
  },
  dayCellDisabled: {
    opacity: 0.35,
  },
  dayCellSelected: {
    borderColor: '#df7fa8',
    backgroundColor: '#ffeef5',
  },
  dayCellPressed: {
    opacity: 0.92,
  },
  dayText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  dayTextOutsideMonth: {
    color: '#c6a7b6',
  },
  dayTextDisabled: {
    color: '#c6a7b6',
  },
  dayTextSelected: {
    color: '#cf6f99',
  },
  missingState: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  missingText: {
    fontSize: 16,
    lineHeight: 24,
  },
});