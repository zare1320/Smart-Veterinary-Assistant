import React from 'react';
import { useLocale } from '../../context/LocaleContext';
import { SyringeIcon, CheckIcon } from '../Icons';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <h3 className="text-2xl font-bold mb-4 text-heading border-b-4 border-[var(--primary-300)] dark:border-[var(--primary-700)] pb-2">{title}</h3>
    <div className="space-y-4 text-foreground/90 leading-relaxed">{children}</div>
  </section>
);

const CoreVaccine: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <div className="bg-muted/50 p-4 rounded-lg border-s-4 border-[var(--primary-500)] flex items-start gap-4 transition-all hover:shadow-md hover:border-[var(--primary-600)]">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-full text-[var(--primary-600)] dark:text-[var(--primary-300)]">
            <SyringeIcon className="text-xl"/>
        </div>
        <div>
            <h4 className="font-bold text-heading text-lg">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

export const CanineVaccinationContent: React.FC = () => {
    const { t } = useLocale();

    return (
        <div className="max-w-none">
            <Section title={t('canineVaccinationContent.coreVaccinesTitle')}>
                <p>{t('canineVaccinationContent.coreVaccinesDesc')}</p>
                <div className="space-y-4">
                    <CoreVaccine name={t('canineVaccinationContent.cdvName')} description={t('canineVaccinationContent.cdvDesc')} />
                    <CoreVaccine name={t('canineVaccinationContent.cav2Name')} description={t('canineVaccinationContent.cav2Desc')} />
                    <CoreVaccine name={t('canineVaccinationContent.cpv2Name')} description={t('canineVaccinationContent.cpv2Desc')} />
                    <CoreVaccine name={t('canineVaccinationContent.rabiesName')} description={t('canineVaccinationContent.rabiesDesc')} />
                </div>
            </Section>

            <Section title={t('canineVaccinationContent.puppyScheduleTitle')}>
                <p>{t('canineVaccinationContent.puppyScheduleDesc')}</p>
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-start">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-4 font-semibold uppercase text-sm text-muted-foreground text-start">{t('canineVaccinationContent.tableHeaderAge')}</th>
                                    <th className="p-4 font-semibold uppercase text-sm text-muted-foreground text-start">{t('canineVaccinationContent.tableHeaderRecs')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr className="transition-colors hover:bg-muted/30">
                                    <td className="p-4 font-semibold text-heading whitespace-nowrap">{t('canineVaccinationContent.scheduleRow1Age')}</td>
                                    <td className="p-4">{t('canineVaccinationContent.scheduleRow1Recs')}</td>
                                </tr>
                                 <tr className="transition-colors hover:bg-muted/30">
                                    <td className="p-4 font-semibold text-heading whitespace-nowrap">{t('canineVaccinationContent.scheduleRow2Age')}</td>
                                    <td className="p-4">{t('canineVaccinationContent.scheduleRow2Recs')}</td>
                                </tr>
                                 <tr className="transition-colors hover:bg-muted/30">
                                    <td className="p-4 font-semibold text-heading whitespace-nowrap">{t('canineVaccinationContent.scheduleRow3Age')}</td>
                                    <td className="p-4">{t('canineVaccinationContent.scheduleRow3Recs')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
            
             <Section title={t('canineVaccinationContent.boostersTitle')}>
                <p>{t('canineVaccinationContent.boostersDesc')}</p>
                <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full text-emerald-600 dark:text-emerald-300 mt-1">
                            <CheckIcon className="w-3 h-3"/>
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: t('canineVaccinationContent.boosterPoint1') }} />
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full text-emerald-600 dark:text-emerald-300 mt-1">
                            <CheckIcon className="w-3 h-3"/>
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: t('canineVaccinationContent.boosterPoint2') }} />
                    </li>
                </ul>
            </Section>
        </div>
    );
};

export default CanineVaccinationContent;