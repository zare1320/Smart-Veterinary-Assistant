import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';
import { LabeledInput, LabeledSelect, LabeledTextarea } from '../components/forms';
import { Button } from '../components/Button';

const CUSTOM_PROTOCOLS_KEY = 'vet_custom_protocols';

const AddProtocolScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialTitle = location.state?.initialTitle || '';

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Canine' | 'Feline' | 'Exotic' | 'Custom'>('Custom');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      alert('Please fill out all required fields.'); // Simple validation
      return;
    }

    const newProtocol: Protocol = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category: category,
      content: content.trim(),
      imageUrl: 'https://i.postimg.cc/P5gLp2f0/default-pet.png', // A default image
    };

    const existingProtocols: Protocol[] = JSON.parse(localStorage.getItem(CUSTOM_PROTOCOLS_KEY) || '[]');
    localStorage.setItem(CUSTOM_PROTOCOLS_KEY, JSON.stringify([...existingProtocols, newProtocol]));

    navigate('/protocols');
  };

  const categoryOptions = [
    { value: 'Custom', label: t('custom') },
    { value: 'Canine', label: t('chipCanine') },
    { value: 'Feline', label: t('chipFeline') },
    { value: 'Exotic', label: t('chipExotic') },
  ];

  return (
    <div>
      <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between border-b border-slate-200 dark:border-slate-800">
          <button onClick={() => navigate('/protocols')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-xl font-bold">{t('addProtocolTitle')}</h1>
          <div className="w-10"></div>
        </div>
      </header>
      <main className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 space-y-4">
          <LabeledInput
            label={t('form.titleLabel')}
            id="protocolTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('form.titlePlaceholder')}
            required
          />
          <LabeledInput
            label={t('form.descriptionLabel')}
            id="protocolDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('form.descriptionPlaceholder')}
            required
          />
          <LabeledSelect
            label={t('form.categoryLabel')}
            id="protocolCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </LabeledSelect>
          <LabeledTextarea
            label={t('form.contentLabel')}
            id="protocolContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('form.contentPlaceholder')}
            rows={10}
            required
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleSave} variant="primary" className="w-full">
            {t('form.saveProtocol')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddProtocolScreen;