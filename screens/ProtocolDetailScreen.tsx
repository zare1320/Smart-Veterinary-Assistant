import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';
import { dataService } from '../services/dataService';
import { ProtocolDetailSkeleton } from '../components/skeletons/ProtocolDetailSkeleton';

const ProtocolDetailScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const { protocolId } = useParams<{ protocolId: string }>();
  const [protocol, setProtocol] = useState<Protocol | undefined | null>(undefined); // undefined for loading, null for not found

  useEffect(() => {
    const fetchProtocol = async () => {
        if (protocolId) {
            setProtocol(undefined); // Set to loading state before fetch
            const data = await dataService.getProtocolById(protocolId, t);
            setProtocol(data || null);
        }
    };
    fetchProtocol();
  }, [protocolId, t]);

  if (protocol === undefined) {
      return <ProtocolDetailSkeleton />; // Loading state
  }

  if (protocol === null) {
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
