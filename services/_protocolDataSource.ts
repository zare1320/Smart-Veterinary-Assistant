import React from 'react';
import type { Protocol } from '../types';
import { CanineVaccinationContent } from '../components/protocol-content/CanineVaccinationContent';

export const getDefaultProtocols = (t: (key: string) => string): Protocol[] => [
  {
    id: 'canine-vaccination',
    category: 'Canine',
    title: t('protocols.canineVaccination.title'),
    description: t('protocols.canineVaccination.description'),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLHKS_aeCW713LBzYhgOSJuYpqQd1P8XwEG0rDxJzzKLxbxeykbPbRuZ6NlP4Ibv3PfhKFcUTd0qzUHYHeZZtZjutQfLbMvP6FYpZ09ji3_xYAsATXVKjuZWdvzcTCn3Z_B8vQud2ezwQ4DUtUx9PtsLbuCqSVnRZw7DONWeLxzPBhrPdf0ny9d5cPt2ahTjDTd0rc9C7k7mKh5GuKlD1uKfATm3YmWKVXVsadoZZSVWOUGtGS04gOtnXuF9XRxU6DRilKPr3JvHZG',
    // FIX: Replaced JSX syntax with React.createElement to resolve a TypeScript error. This occurs because the file has a .ts extension but contains JSX, which can lead to compilation issues.
    content: React.createElement(CanineVaccinationContent),
  },
  {
    id: 'feline-leukemia',
    category: 'Feline',
    title: t('protocols.felineLeukemia.title'),
    description: t('protocols.felineLeukemia.description'),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6uaRRAb4kKLzvy8hiaaTVTQUCKCPxJhiwYhX12tARik-wZEPj24vHUfGnWcGCPfnc0Dw-jkFZ3M7wujAqgtqBjwoDn0vRHsgigWFFZU9_llLirlGDHEbXllSQmEj453YEsmiW5nG1hR6quMtRRdk0pvm1N-eJQvW1M96O9uq4cDF6rWG8k2hxrnvAwE37n0UlhMF_OVTyr5i6COdf1KPRsNfLUeO8CElRGLXMyd10JNboqjIyDOLlVHjsHsrvf6qSIGcIcz3gfwYB',
  },
    {
        id: 'canine-parvovirus',
        category: 'Canine',
        title: t('protocols.canineParvovirus.title'),
        description: t('protocols.canineParvovirus.description'),
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM8TExjl_urm0kIsn-7swrx4WcVv5KXlMjnLbqbydSeL6sEQLbnw-oQ-TUXFAPgbsrRSPooLz_Tp9UGbbjucLabA6EyimhMKQ0yLUhWc1V-F8CaHjEZmnVDKq5NnxPpEEFxQld_Pq_qkuSZ4gnR-XgCm8w1M_ElDhqyMTnkPrZ-WSMXb3azcTUk9IZKMOXE69RzEd5rw21y9yCBWIsMfq3ZfAexk63PONVgBPdWPU6WJKo9TDH_Mw4JgAydmK91AEEpW-yAckpnxyd',
    },
    {
        id: 'feline-uri',
        category: 'Feline',
        title: t('protocols.felineURI.title'),
        description: t('protocols.felineURI.description'),
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93d2X-FUi0XN_JehIrYi26AMh-ZXIOJ7NRy2h7nPGIt0zKdtsPuaY6F7Z00M6yY_jgUhLsI9yvqRDBnOnYkAvC4J0s-oymJXjnuar4OVGvseP8w7g0nME5TxeVQ1v32BKFbbWoH5pknQzaA1u4Zq71fkVHW4afoX-GOrO0sK84HfLnjQeD-FtvI2RFL2e-F_v3RTIpEBJvD2D6n8-vCGYgetRRotqSqMtaw-2gtcyzr3trr1eKSPHqf6wmL_O1OHnFNd9tH35O9z8',
    },
];