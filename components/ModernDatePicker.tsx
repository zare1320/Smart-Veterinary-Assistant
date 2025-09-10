import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext';

type CalendarType = 'gregorian' | 'jalali';

interface ModernDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  calendarType: CalendarType;
}

// --- Robust Date Conversion Logic ---

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isJalaaliLeap(year: number): boolean {
    // Jalali years starting the 33-year rule.
    const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    const bl = breaks.length;
    let jp = breaks[0];
    let jm;
    let jump;
    let leap = -14;
    let n = year - 621;
    let i = 1;
    do {
        jm = breaks[i];
        jump = jm - jp;
        if (n < jm) {
            break;
        }
        leap += Math.floor(jump / 33) * 8 + Math.floor(jump % 33 / 4);
        jp = jm;
        i++;
    } while (i < bl);
    n = year - jp;
    leap += Math.floor(n / 33) * 8 + Math.floor(n % 33 / 4);
    if (jump % 33 === 4 && jump - n === 4) {
        leap++;
    }
    return leap % 4 === 0;
}

function jalaaliMonthLength(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  if (isJalaaliLeap(year)) return 30;
  return 29;
}

function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const gDaysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = (gy <= 1600) ? 0 : 979;
  gy -= (gy <= 1600) ? 621 : 1600;
  const gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + gDaysInMonth[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;
  const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
  return [jy, jm, jd];
}


function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
    let gy = (jy <= 979) ? 621 : 1600;
    jy -= (jy <= 979) ? 0 : 979;
    let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * Math.floor(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    gy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    const gd = days + 1;
    const gDaysInMonth = [31, (isGregorianLeap(gy) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = 0;
    for (let i = 0; i < 12; i++) {
        if (gd <= gDaysInMonth[i]) {
            gm = i + 1;
            break;
        }
        days -= gDaysInMonth[i];
    }
    return [gy, gm, days + 1];
}


// --- LabeledSelect Component (Self-contained for this file) ---
const LabeledSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; id: string; }> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1 text-start">
            {label}
        </label>
        <select id={id} {...props} className="form-input w-full">
            {children}
        </select>
    </div>
);


// --- Main DatePicker Component ---
const ModernDatePicker: React.FC<ModernDatePickerProps> = ({ value, onChange, calendarType }) => {
  const { t, localizeNumber } = useLocale();

  const [year, setYear] = useState(1);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  // Sync external `value` prop to internal displayed state
  useEffect(() => {
    const dateToSync = value || new Date();
    
    if (calendarType === 'jalali') {
      const [jy, jm, jd] = gregorianToJalali(dateToSync.getFullYear(), dateToSync.getMonth() + 1, dateToSync.getDate());
      setYear(jy);
      setMonth(jm);
      setDay(jd);
    } else {
      setYear(dateToSync.getFullYear());
      setMonth(dateToSync.getMonth() + 1);
      setDay(dateToSync.getDate());
    }
  }, [value, calendarType]);

  const handleDateChange = (newYear: number, newMonth: number, newDay: number) => {
    try {
      const [gy, gm, gd] = calendarType === 'jalali' 
        ? jalaliToGregorian(newYear, newMonth, newDay)
        : [newYear, newMonth, newDay];
      
      const newDate = new Date(gy, gm - 1, gd);
      // Check for invalid date objects
      if (isNaN(newDate.getTime())) return;

      onChange(newDate);
    } catch (e) {
      console.error("Error creating date:", e);
    }
  };
  
  const daysInMonth = useMemo(() => {
    return calendarType === 'jalali' ? jalaaliMonthLength(year, month) : new Date(year, month, 0).getDate();
  }, [year, month, calendarType]);
  
  // Handlers for each dropdown that also clamp the day value
  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number(e.target.value);
      const maxDays = calendarType === 'jalali' ? jalaaliMonthLength(newYear, month) : new Date(newYear, month, 0).getDate();
      const newDay = Math.min(day, maxDays);
      handleDateChange(newYear, month, newDay);
  };
   const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = Number(e.target.value);
      const maxDays = calendarType === 'jalali' ? jalaaliMonthLength(year, newMonth) : new Date(year, newMonth, 0).getDate();
      const newDay = Math.min(day, maxDays);
      handleDateChange(year, newMonth, newDay);
  };
   const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDay = Number(e.target.value);
      handleDateChange(year, month, newDay);
  };


  const currentYear = calendarType === 'jalali' ? gregorianToJalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())[0] : new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-3 gap-2">
      <LabeledSelect id="year-select" label={t('otherPage.ageCalculator.year')} value={year} onChange={onYearChange}>
        {yearOptions.map(y => <option key={y} value={y}>{localizeNumber(y)}</option>)}
      </LabeledSelect>
      <LabeledSelect id="month-select" label={t('otherPage.ageCalculator.month')} value={month} onChange={onMonthChange}>
        {monthOptions.map(m => <option key={m} value={m}>{t(`${calendarType}Months.${m}`)}</option>)}
      </LabeledSelect>
      <LabeledSelect id="day-select" label={t('otherPage.ageCalculator.day')} value={day} onChange={onDayChange}>
        {dayOptions.map(d => <option key={d} value={d}>{localizeNumber(d)}</option>)}
      </LabeledSelect>
    </div>
  );
};

export default ModernDatePicker;