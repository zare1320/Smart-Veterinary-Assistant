import type { Species } from '../types';

export const getSpeciesList = (t: (key: string) => string): Species[] => [
  {
    name: t('speciesCat'),
    imageUrl: 'https://i.postimg.cc/VNSKChTB/cat-2.png',
  },
  {
    name: t('speciesDog'),
    imageUrl: 'https://i.postimg.cc/4x28nG8x/dog-2.png',
  },
  {
    name: t('speciesBird'),
    imageUrl: 'https://i.postimg.cc/4NZbVR5Z/birds-2.png',
  },
    {
    name: t('speciesMammal'),
    imageUrl: 'https://i.postimg.cc/pLLfcQ46/rabbit-2.png', // Rabbit image for mammals
  },
  {
    name: t('speciesReptile'),
    imageUrl: 'https://i.postimg.cc/FFDvR7CW/ey-J3-Ijox-NTAs-Imgi-Oj-E1-MCwi-Zml0-Ijoi-Y29ud-GFpbi-Is-Im-Zt-Ijoid2-Vic-CIs-In-Mi-Oi-Jj-Yz-Mw-ODE0-Ym-Mx-NDZm-ZTEx-ZGJk-Y2-U3-MDQ0.webp',
  },
    {
    name: t('speciesAmphibian'),
    imageUrl: 'https://i.postimg.cc/3JBjZfSG/image.png',
  },
    {
    name: t('speciesFish'),
    imageUrl: 'https://i.postimg.cc/Kjn3FvCQ/image.webp',
  },
];
