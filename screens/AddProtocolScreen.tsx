import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Protocol } from '../types';
import { useLocale } from '../context/LocaleContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons';
import { LabeledInput, LabeledSelect, LabeledTextarea } from '../components/forms';
import { Button } from '../components/Button';
import { dataService } from '../services/dataService';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AddProtocolScreen: React.FC = () => {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialTitle = location.state?.initialTitle || '';

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Canine' | 'Feline' | 'Exotic' | 'Custom'>('Custom');
  const [content, setContent] = useState('');

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  
  const errors = useMemo(() => {
      const err: { [key: string]: string | null } = {};
      if (!title.trim()) err.title = t('protocol.error.titleRequired');
      if (!description.trim()) err.description = t('protocol.error.descriptionRequired');
      if (!content.trim()) err.content = t('protocol.error.contentRequired');
      return err;
  }, [title, description, content, t]);

  const isFormValid = Object.values(errors).every(e => e === null);

  const handleBlur = (field: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    setTouched({ title: true, description: true, content: true });
    
    if (!isFormValid) {
      toast.error(t('toast.error.requiredFields'));
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

    await dataService.saveCustomProtocol(newProtocol);
    toast.success(t('toast.protocol.saved'));
    navigate('/protocols');
  };
  
  const getFieldState = (field: 'title' | 'description' | 'content') => {
      const hasError = touched[field] && errors[field];
      const isSuccess = touched[field] && !errors[field];
      return hasError ? 'error' : isSuccess ? 'success' : '';
  };

  const categoryOptions = [
    { value: 'Custom', label: t('custom') },
    { value: 'Canine', label: t('chipCanine') },
    { value: 'Feline', label: t('chipFeline') },
    { value: 'Exotic', label: t('chipExotic') },
  ];

  return (
    <div>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-4 justify-between border-b border-border">
          <button onClick={() => navigate('/protocols')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-muted transition-colors">
            {locale === 'fa' ? <ArrowRightIcon className="text-xl" /> : <ArrowLeftIcon className="text-xl" />}
          </button>
          <h1 className="text-2xl font-extrabold text-heading">{t('addProtocolTitle')}</h1>
          <div className="w-10"></div>
        </div>
      </header>
      <main className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl p-6 space-y-4">
          <div>
              <LabeledInput
                label={t('form.titleLabel')}
                id="protocolTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur('title')}
                placeholder={t('form.titlePlaceholder')}
                required
                className={getFieldState('title')}
              />
               <AnimatePresence>
                  {touched.title && errors.title && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.title}</motion.p>
                  )}
               </AnimatePresence>
          </div>
          <div>
              <LabeledInput
                label={t('form.descriptionLabel')}
                id="protocolDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur('description')}
                placeholder={t('form.descriptionPlaceholder')}
                required
                className={getFieldState('description')}
              />
              <AnimatePresence>
                  {touched.description && errors.description && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.description}</motion.p>
                  )}
               </AnimatePresence>
          </div>
          <LabeledSelect
            label={t('form.categoryLabel')}
            id="protocolCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </LabeledSelect>
          <div>
              <LabeledTextarea
                label={t('form.contentLabel')}
                id="protocolContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={() => handleBlur('content')}
                placeholder={t('form.contentPlaceholder')}
                rows={10}
                required
                className={getFieldState('content')}
              />
              <AnimatePresence>
                  {touched.content && errors.content && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 mt-1 text-start">{errors.content}</motion.p>
                  )}
               </AnimatePresence>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleSave} variant="primary" className="w-full" disabled={!isFormValid}>
            {t('form.saveProtocol')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddProtocolScreen;