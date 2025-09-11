import React, { useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';
import { CanineVaccinationContent } from '../components/protocol-content/CanineVaccinationContent';

// This data would typically come from a shared service or API call
const CUSTOM_PROTOCOLS_KEY = 'vet_custom_protocols';
const getProtocols = (t: (key: string) => string): Protocol[] => [
  {
    id: 'canine-vaccination',
    category: 'Canine',
    title: t('protocols.canineVaccination.title'),
    description: t('protocols.canineVaccination.description'),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLHKS_aeCW713LBzYhgOSJuYpqQd1P8XwEG0rDxJzzKLxbxeykbPbRuZ6NlP4Ibv3PfhKFcUTd0qzUHYHeZZtZjutQfLbMvP6FYpZ09ji3_xYAsATXVKjuZWdvzcTCn3Z_B8vQud2ezwQ4DUtUx9PtsLbuCqSVnRZw7DONWeLxzPBhrPdf0ny9d5cPt2ahTjDTd0rc9C7k7mKh5GuKlD1uKfATm3YmWKVXVsadoZZSVWOUGtGS04gOtnXuF9XRxU6DRilKPr3JvHZG',
    content: <CanineVaccinationContent />,
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

const ProtocolDetailScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const { protocolId } = useParams<{ protocolId: string }>();

  const protocol = useMemo(() => {
    const standardProtocols = getProtocols(t);
    const customProtocols: Protocol[] = JSON.parse(localStorage.getItem(CUSTOM_PROTOCOLS_KEY) || '[]');
    const allProtocols = [...standardProtocols, ...customProtocols];
    return allProtocols.find(p => p.id === protocolId);
  }, [protocolId, t]);


  if (!protocol) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-heading">Protocol Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested protocol could not be found.</p>
        <Link to="/protocols" className="mt-4 inline-block text-[var(--primary-600)] hover:underline">Back to Protocols</Link>
      </div>
    );
  }

  return (
    <div>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between border-b border-border">
          <button onClick={() => navigate('/protocols')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-lg font-bold text-center text-heading truncate px-2">{protocol.title}</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 text-start">
        <div className="mb-6">
          <img src={protocol.imageUrl} alt={protocol.title} className="w-full h-48 object-cover rounded-2xl shadow-lg" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-heading mb-2">{protocol.title}</h2>
        <p className="text-muted-foreground mb-6">{protocol.description}</p>

        <div className="prose dark:prose-invert max-w-none">
          {typeof protocol.content === 'string' ? (
            <p>{protocol.content}</p> // Simple rendering for string content
          ) : (
            protocol.content // Render React node directly
          )}
        </div>
        
        {!protocol.content && (
            <div className="text-center bg-muted p-8 rounded-lg mt-8">
                <p className="text-muted-foreground">Detailed content for this protocol is not yet available.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ProtocolDetailScreen;