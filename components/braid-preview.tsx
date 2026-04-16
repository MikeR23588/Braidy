import { StyleSheet, View } from 'react-native';

type BraidPreviewProps = {
  colors: string[];
  size?: 'small' | 'large';
};

export function BraidPreview({ colors, size = 'small' }: BraidPreviewProps) {
  const large = size === 'large';

  return (
    <View style={[styles.frame, large && styles.frameLarge]}>
      <View style={[styles.backdrop, large && styles.backdropLarge]}>
        {colors.map((color, index) => (
          <View
            key={`${color}-${index}`}
            style={[
              styles.strand,
              large && styles.strandLarge,
              { backgroundColor: color, transform: [{ rotate: `${index * 6 - 6}deg` }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 108,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameLarge: {
    width: 150,
  },
  backdrop: {
    width: 96,
    height: 126,
    borderRadius: 24,
    backgroundColor: '#fff6fa',
    borderWidth: 2,
    borderColor: '#efbfd3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    overflow: 'hidden',
  },
  backdropLarge: {
    width: 138,
    height: 172,
    borderRadius: 30,
    gap: 8,
  },
  strand: {
    width: 18,
    height: 100,
    borderRadius: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  strandLarge: {
    width: 24,
    height: 138,
    borderRadius: 24,
  },
});