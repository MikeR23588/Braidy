export type BraidColorOption = {
  code: string;
  label: string;
  swatch: string;
  category: 'Basic' | 'Solid' | 'Blend' | 'Ombre';
};

export type BraidSizeOption = {
  id: 'small' | 'medium' | 'large';
  label: string;
  detail: string;
};

export type BraidStyle = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  preview: string[];
  sizes: BraidSizeOption[];
  colors: BraidColorOption[];
};

const standardSizes: BraidSizeOption[] = [
  {
    id: 'small',
    label: 'Small',
    detail: 'More braids, tighter sections, and the longest install time.',
  },
  {
    id: 'medium',
    label: 'Medium',
    detail: 'Balanced density with a versatile everyday finish.',
  },
  {
    id: 'large',
    label: 'Large',
    detail: 'Chunkier parts with a bolder look and quicker install.',
  },
];

export const braidStyles: BraidStyle[] = [
  {
    slug: 'box-braids',
    name: 'Box Braids',
    description: 'Classic sections with medium-long length and a neat finish.',
    detail: 'Pick your braid size first, then choose a color inspired by the Sensationnel chart.',
    preview: ['#1c1715', '#8b5e3c', '#d7a15d'],
    sizes: standardSizes,
    colors: [
      { code: '1B', label: 'Off Black', swatch: '#1c1715', category: 'Basic' },
      { code: '27', label: 'Honey Blonde', swatch: '#c99648', category: 'Solid' },
      { code: '30', label: 'Light Auburn', swatch: '#8b5e3c', category: 'Solid' },
      { code: '99J', label: 'Burgundy Wine', swatch: '#6d2037', category: 'Solid' },
      { code: 'S1B/30', label: 'Side by Side 1B/30', swatch: '#7a4a2b', category: 'Blend' },
      { code: 'OM/HONEYBLONDE', label: 'Ombre Honey Blonde', swatch: '#d7a15d', category: 'Ombre' },
    ],
  },
  {
    slug: 'knotless-braids',
    name: 'Knotless Braids',
    description: 'Lightweight braids with a natural-looking root and soft movement.',
    detail: 'Knotless styles stay soft at the scalp, with size and color combos tailored to your finish.',
    preview: ['#101010', '#4b3326', '#c79252'],
    sizes: standardSizes,
    colors: [
      { code: '1', label: 'Jet Black', swatch: '#101010', category: 'Basic' },
      { code: '2', label: 'Dark Brown', swatch: '#2a1b15', category: 'Basic' },
      { code: '4', label: 'Medium Brown', swatch: '#4b3326', category: 'Basic' },
      { code: '27', label: 'Honey Blonde', swatch: '#c79252', category: 'Solid' },
      { code: 'M1B/350', label: 'Fullmix 1B/350', swatch: '#7a2f24', category: 'Blend' },
      { code: 'OM/LTGOLDENBROWN', label: 'Ombre Golden Brown', swatch: '#b98047', category: 'Ombre' },
    ],
  },
  {
    slug: 'boho-braids',
    name: 'Boho Braids',
    description: 'Textured braids with loose curls woven through for a softer look.',
    detail: 'Boho installs can be worn small, medium, or large, then finished with bright or natural color blends.',
    preview: ['#2a1d18', '#a1663f', '#e0c7a6'],
    sizes: standardSizes,
    colors: [
      { code: '1B', label: 'Off Black', swatch: '#2a1d18', category: 'Basic' },
      { code: '613', label: 'Platinum Blonde', swatch: '#e0c7a6', category: 'Solid' },
      { code: 'BG', label: 'Blonde Gold', swatch: '#d7b16a', category: 'Solid' },
      { code: 'ROSEGOLD', label: 'Rose Gold', swatch: '#d58d7b', category: 'Blend' },
      { code: 'COPPERTRIO', label: 'Copper Trio', swatch: '#b96838', category: 'Blend' },
      { code: 'OM/COPPER', label: 'Ombre Copper', swatch: '#a1663f', category: 'Ombre' },
    ],
  },
  {
    slug: 'cornrows',
    name: 'Cornrows',
    description: 'Close-to-scalp rows with a clean pattern and low-maintenance wear.',
    detail: 'Choose your braid scale and then match it with natural or statement colors.',
    preview: ['#161616', '#5a3825', '#7f1d3f'],
    sizes: standardSizes,
    colors: [
      { code: '1', label: 'Jet Black', swatch: '#161616', category: 'Basic' },
      { code: '4', label: 'Medium Brown', swatch: '#5a3825', category: 'Basic' },
      { code: '33', label: 'Dark Auburn', swatch: '#7d4025', category: 'Solid' },
      { code: '99J', label: 'Burgundy Wine', swatch: '#7f1d3f', category: 'Solid' },
      { code: 'S4/30', label: 'Side by Side 4/30', swatch: '#865137', category: 'Blend' },
      { code: 'OM/AUBURN', label: 'Ombre Auburn', swatch: '#8e4b32', category: 'Ombre' },
    ],
  },
  {
    slug: 'fulani-braids',
    name: 'Fulani Braids',
    description: 'Signature center braid styling with beads and curved side details.',
    detail: 'Pair your Fulani size choice with highlighted or warm-toned color options.',
    preview: ['#231915', '#8a3f26', '#d9a441'],
    sizes: standardSizes,
    colors: [
      { code: '1B', label: 'Off Black', swatch: '#231915', category: 'Basic' },
      { code: '30', label: 'Light Auburn', swatch: '#8a3f26', category: 'Solid' },
      { code: '27', label: 'Honey Blonde', swatch: '#d9a441', category: 'Solid' },
      { code: 'HL350', label: 'Highlight 350', swatch: '#a3482c', category: 'Blend' },
      { code: 'M4/27', label: 'Fullmix 4/27', swatch: '#9a673a', category: 'Blend' },
      { code: 'OM/GOLDENBLONDE', label: 'Ombre Golden Blonde', swatch: '#d1a761', category: 'Ombre' },
    ],
  },
];

export function getBraidStyleBySlug(slug: string) {
  return braidStyles.find((style) => style.slug === slug);
}