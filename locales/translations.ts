// FIX: Created the translations file to be imported by the LocaleContext.
// FIX: The original type definition for translations only allowed for a single level of nesting,
// causing type errors for any nested objects (e.g., `animalSpecies`, `myMedList`).
// The `TranslationBlock` type is a recursive type that allows for arbitrarily nested
// translation strings, which correctly models the data structure and resolves all type errors in this file.
type TranslationBlock = {
    [key: string]: string | TranslationBlock;
};

export const translations: { [key: string]: TranslationBlock } = {
  en: {
    // General
    appName: "Vet Pocket Pal",
    back: "Back",
    kg: "kg",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    noBreedsFound: "No breeds found",
    moreInfo: "More info",

    // Navigation
    navHome: "Home",
    navProtocols: "Protocols",
    navMyDrugs: "My Meds",
    navSettings: "Settings",

    // Species
    species: "Species",
    animalSpecies: {
        CAT: "Cat",
        DOG: "Dog",
    },
    speciesCat: "Cat",
    speciesDog: "Dog",
    speciesBird: "Bird",
    speciesMammal: "Mammal",
    speciesReptile: "Reptile",
    speciesAmphibian: "Amphibian",
    speciesFish: "Fish",

    // Home Screen
    selectSpeciesPrompt: "Select a species to get started",

    // Patient Info Form
    weight: "Weight",
    enterWeight: "e.g., 5.4",
    gender: "Gender",
    male: "Male",
    female: "Female",
    unknown: "Unknown",
    breedOptional: "Breed (Optional)",
    enterBreed: "Enter breed...",
    placeholderGermanShepherd: "e.g., German Shepherd",
    placeholderPersianCat: "e.g., Persian",
    placeholderCockatiel: "e.g., Cockatiel",
    placeholderHollandLop: "e.g., Holland Lop",
    placeholderRedEyedTreeFrog: "e.g., Red-eyed Tree Frog",
    placeholderGoldfish: "e.g., Goldfish",
    placeholderBeardedDragon: "e.g., Bearded Dragon",
    ageGroup: "Age Group",
    neonate: "Neonate",
    pediatric: "Pediatric",
    adult: "Adult",
    geriatric: "Geriatric",
    clinicalSignsOptional: "Clinical Signs (Optional)",
    enterClinicalSigns: "e.g., lethargy, vomiting...",

    // Vet Tools
    tools: "Vet Tools",
    drugDoseCalculator: "Drug Dose Calculator",
    drugDoseDesc: "Calculate dosages accurately",
    fluidTherapyCalculator: "Fluid Therapy",
    fluidTherapyDesc: "Plan fluid rates and deficits",
    bloodPressureCalculator: "Blood Pressure",
    bloodPressureDesc: "Assess hypertension risk",
    bloodTransfusionCalculator: "Blood Transfusion",
    bloodTransfusionDesc: "Calculate transfusion volumes",
    petAgeCalculator: "Pet Age Calculator",
    petAgeDesc: "Convert pet age to human years",
    feedbackPrompt: "Feedback functionality coming soon!",

    // Protocols Screen
    protocolsTitle: "Protocols",
    searchProtocols: "Search protocols...",
    chipAll: "All",
    chipCanine: "Canine",
    chipFeline: "Feline",
    chipExotic: "Exotic",
    protocolsCommon: "Common Protocols",
    protocolsAdvanced: "Advanced Protocols",

    // My Meds Screen
    myMedList: {
        title: "My Med List",
        maxGoldenRetriever: "Max (Golden Retriever)",
        lunaPersianCat: "Luna (Persian Cat)",
        meloxicamSuspension: "1.5 mg/ml Suspension",
        meloxicamInstructions: "0.27 ml by mouth once daily",
        clavamoxTablets: "62.5mg Tablets",
        clavamoxInstructions: "1 tablet by mouth twice daily",
        deleteProfileConfirm: "Are you sure you want to delete this profile and all its medications?",
        deleteMedConfirm: "Are you sure you want to delete this medication?",
        profileFor: "Profile for",
        addMedication: "Add Medication",
        noMedications: "No Medications Added",
        getStarted: "Add a medication to get started.",
        yourTools: "Your Tools",
        featureInteractionsTitle: "Drug Interaction Checker",
        featureInteractionsDesc: "Check for potential drug interactions.",
        featureAlertsTitle: "Dosing Alerts & Reminders",
        featureAlertsDesc: "Set up reminders for medication doses.",
        featureReportsTitle: "Generate Medication Reports",
        featureReportsDesc: "Create summaries for client communication.",
    },
    profileModal: {
        title: "Create Pet Profile",
        editTitle: "Edit Pet Profile",
        nameLabel: "Pet's Name",
        namePlaceholder: "e.g., Max",
        imageUrlLabel: "Image URL (Optional)",
        imageUrlPlaceholder: "https://example.com/image.png",
        create: "Create Profile",
    },
    medicationModal: {
        addTitle: "Add Medication",
        editTitle: "Edit Medication",
        nameLabel: "Medication Name",
        namePlaceholder: "e.g., Meloxicam",
        formulationLabel: "Formulation & Strength",
        formulationPlaceholder: "e.g., 1.5 mg/ml Suspension",
        instructionsLabel: "Dosing Instructions",
        instructionsPlaceholder: "e.g., 0.5 ml by mouth once daily",
        add: "Add Medication",
    },
    
    // Settings Screen
    settingsGeneral: "General",
    language: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    themeSystemDescription: "System theme will automatically match your device's appearance setting.",
    settingsNotifications: "Notifications",
    pushNotifications: "Push Notifications",
    emailNotifications: "Email Notifications",
    settingsDataPrivacy: "Data & Privacy",
    syncFrequency: "Sync Frequency",
    automatic: "Automatic",
    clearCache: "Clear Cache",
    cacheCleared: "Cache cleared successfully!",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    settingsCalculatorDefaults: "Calculator Defaults",
    defaultWeightUnit: "Default Weight Unit",

    // Auth & Profile
    auth: {
        welcomeTitle: "Welcome to Vet Pocket Pal",
        welcomeSubtitle: "Your professional veterinary assistant.",
        emailPlaceholder: "Enter your email or mobile number",
        continue: "Continue",
        continueWithGoogle: "Continue with Google",
        or: "OR",
        otp: {
            titleEmail: "Check your email",
            titleSms: "Check your messages",
            subtitle: "We've sent a 6-digit code to {identity}.",
            noCode: "Didn't receive a code?",
            resend: "Resend",
            back: "Use a different method"
        },
        error: {
            invalidEmail: "Please enter a valid email or mobile number.",
            invalidCode: "The code you entered is incorrect. Please try again."
        }
    },
    profile: {
        view: {
            title: "My Profile",
            editButton: "Edit Profile",
            logoutButton: "Log Out"
        },
        form: {
            title: "Complete Your Profile",
            subtitle: "Please provide some additional information to get started.",
            saveButton: "Save and Continue",
            identityLabel: "Login ID",
            cancelButton: "Cancel",
            fullNameLabel: "Full Name",
            fullNamePlaceholder: "e.g., Dr. Jane Doe",
            roleLabel: "I am a...",
            rolePlaceholder: "Select your role",
            universityLabel: "University",
            universityPlaceholder: "e.g., University of Veterinary Medicine",
            studentIdLabel: "Student ID Number",
            studentIdPlaceholder: "Enter your student ID",
            provinceLabel: "Province/State",
            provincePlaceholder: "e.g., California",
            licenseNumberLabel: "Veterinary License Number",
            licenseNumberPlaceholder: "Enter your license number",
            role: {
                student: "Veterinary Student",
                dvm: "Veterinarian (DVM)"
            }
        },
        error: {
            required: "This field is required"
        }
    },

    // Drug Calculator
    drugCalculator: {
        title: "Drug Dose Calculator",
        searchPlaceholder: "Search for a drug...",
        allCategories: "All",
        notFound: "No drugs found.",
        selectDrugPrompt: "Select a drug from the list to begin calculations.",
        formulation: "Formulation",
        rangeRoute: "Range & Route",
        dosePerKg: "Dose (mg/kg)",
        noDoseForSpecies: "No dosage information available for the selected species and formulation.",
        amountToAdminister: "Amount to Administer",
        totalDose: "Total Dose",
        simpleForm: {
            tablet: "Tablet",
            capsule: "Capsule",
            sachet: "Sachet",
            suspension: "Suspension",
            injection: "Injection",
        },
    },
    units: {
        mg: 'mg',
        g: 'g',
        mcg: 'mcg',
        ml: 'ml',
        tablet: 'tablet(s)',
        capsule: 'capsule(s)',
        sachet: 'sachet(s)'
    },
    drugNotes: {
        amoxRabbitWarning: "Note: Use with caution in hindgut fermenters. Can cause fatal enterotoxemia.",
        ivermectinContraindication: "CONTRAINDICATED in this species. Can cause severe neurotoxicity and death."
    },

    // Fluid Calculator
    calculatorFluidTherapyTitle: "Fluid Therapy Calculator",
    missingWeightWarning: "Patient weight is required. Please enter it on the Home screen.",
    fluid: {
        planTitle: "Fluid Plan",
        resultsTitle: "Calculation Results",
        fluidType: "Fluid Type",
        fluidVolume: "Bag Volume",
        dripSet: "Drip Set",
        types: {
            lrs: "Lactated Ringer's (LRS)",
            normalSaline: "0.9% NaCl (Normal Saline)",
            normosolR: "Normosol-R",
            plasmalyteA: "Plasmalyte-A",
            d5w: "5% Dextrose in Water (D5W)",
            dextroseSaline: "Dextrose 5% in 0.9% Saline",
            halfSaline: "0.45% NaCl",
            hetastarch: "Hetastarch 6%",
            vetstarch: "VetStarch",
            hypertonicSaline: "7.5% Hypertonic Saline",
            wholeBlood: "Whole Blood",
            prbc: "Packed Red Blood Cells (PRBC)",
            ffp: "Fresh Frozen Plasma (FFP)",
            buretrol: "(Buretrol)",
        },
        dehydration: {
            title: "Add Dehydration Deficit"
        },
        ongoingLosses: {
            title: "Add Ongoing Losses"
        },
        replaceTimeTitle: "Replacement Timeframe",
        replaceTime: "Replace deficit over",
        volume: {
            hours: "hours",
        },
        maintenance: {
            title: "Maintenance Rate",
            dosageDaily: "Dosage (Daily)",
            initialRate: "Initial Rate (Total)",
        },
        shock: {
            title: "Shock Therapy",
            dosage: "Dosage (ml/kg)",
        },
        surgical: {
            title: "Surgical Fluids",
            dosage: "Dosage (ml/kg/hr)",
        },
    },

    // BP Calculator
    bp: {
        title: "Blood Pressure",
        about: "About this calculator",
        guidelines: "Based on 2018 ACVIM Consensus Statement Guidelines",
        unsupportedSpecies: "This calculator is intended for use in cats and dogs only.",
        enterInformation: "Enter Measurement Information",
        data: "Enter Pressure Readings",
        riskOfTod: "Risk of Target-Organ Damage (TOD)",
        patientPosition: "Patient Position",
        positionOptions: {
            lateral: "Lateral",
            sternal: "Sternal",
            standing: "Standing",
            sitting: "Sitting",
        },
        cuffPosition: "Cuff Position",
        cuffPositionOptions: {
            rightFront: "Right Forelimb",
            leftFront: "Left Forelimb",
            rightRear: "Right Hindlimb",
            leftRear: "Left Hindlimb",
            tail: "Tail Base",
        },
        cuffSize: "Cuff Size (cm)",
        time: "Time",
        stressLevel: "Stress Level",
        stressLevelOptions: {
            relaxed: "Relaxed",
            tense: "Tense",
            nervous: "Nervous",
            veryNervous: "Very Nervous",
            aggressive: "Aggressive",
        },
        measurementMethod: "Method",
        methodOptions: {
            doppler: "Doppler",
            oscillometric: "Oscillometric",
        },
        location: "Location",
        dvmTech: "DVM/Technician",
        pressure: "Pressure",
        meanSystolic: "Mean Systolic Blood Pressure (SBP)",
        sbpMmHg: "SBP (mmHg)",
        category: "Category",
        normotensive: "Normotensive",
        borderline: "Prehypertensive",
        hypertensive: "Hypertensive",
        severelyHypertensive: "Severely Hypertensive",
        minimal: "Minimal",
        low: "Low",
        moderate: "Moderate",
        high: "High",
        sbpAbbr: "SBP: Systolic Blood Pressure",
        todAbbr: "TOD: Target-Organ Damage",
        infoModal: {
            title: "About Blood Pressure Measurement",
            p1: "This tool assists in classifying hypertension based on the 2018 ACVIM consensus statement.",
            p2: "It is crucial to follow standardized protocols for measurement to ensure accuracy, including using the correct cuff size (40% of limb circumference), allowing the patient to acclimate, and taking multiple readings.",
            p3: "The calculated mean SBP discards the highest and lowest values if more than 5 readings are entered, as recommended by the guidelines.",
        },
    },

    // Transfusion Calculator
    transfusion: {
        title: "Blood Transfusion",
        desiredPcv: "Desired PCV",
        currentPcv: "Patient's Current PCV",
        donorPcv: "Donor PCV",
        bloodVolumeNeeded: "Blood Volume Needed",
        about: {
            title: "About This Calculator",
            formulaTitle: "Calculation Formula",
            formula: "Volume (ml) = Weight (kg) * N * (Desired PCV - Patient PCV) / Donor PCV",
            formulaN: "N = 90 for dogs, 60 for cats (blood volume constant)",
        },
        rate: {
            title: "Transfusion Rates",
            startLabel: "Start Rate (first 15-30 min)",
            startValue: "0.25 ml/kg/hr",
            dogsLabel: "Dogs (if no reaction)",
            dogsValue: "5-10 ml/kg/hr",
            catsLabel: "Cats (if no reaction)",
            catsValue: "3-5 ml/kg/hr",
        },
        monitoring: {
            title: "Monitoring",
            step1: { title: "Baseline", text: "Record Temp, Pulse, Resp, CRT before starting." },
            step2: { title: "Every 15-30 min", text: "Repeat vitals, observe for reactions." },
            step3: { title: "Post-Transfusion", text: "Monitor for 1-4 hours after completion." },
            step4: { title: "Stop Immediately", text: "If any reaction occurs, stop the transfusion." },
        },
        reactions: {
            title: "Transfusion Reactions",
            immuneHemolytic: { title: "Acute Immune-Mediated Hemolytic", summary: "Most severe. Type B cat gets Type A blood.", signsTitle: "Signs", signs: "Fever, tachycardia, hypotension, vomiting, collapse." },
            immuneNonHemolytic: { title: "Febrile Non-Hemolytic", summary: "Most common. Reaction to WBCs or platelets.", signsTitle: "Signs", signs: "Fever, urticaria, pruritus." },
        }
    },
    errors: {
        unsupportedSpecies: "This calculator is not intended for the selected species.",
    },

    // Pet Age Calculator
    otherPage: {
        ageCalculator: {
            pageTitle: "Pet Age Calculator",
            currentAgeTitle: "Calculate Current Age",
            humanYearsTitle: "Calculate Age in Human Years",
            calendarType: "Calendar Type",
            gregorian: "Gregorian",
            jalali: "Jalali",
            year: "Year",
            month: "Month",
            day: "Day",
            currentAgeResult: "Current Age",
            units: { years: "year(s)", months: "month(s)", days: "day(s)" },
            calculationMethod: "Calculation Method",
            formula: "Modern Formula (Dog)",
            table: "Traditional Table",
            dogFormulaTitle: "Dog Age (Logarithmic Formula)",
            enterDogAge: "Enter dog's age in years",
            ageInHumanYears: "Equivalent Human Age",
            petAgeLabel: "Enter pet's age (years)",
            speciesLabel: "Species",
            dogWeightLabel: "Dog's Adult Weight (lbs)",
            weightRanges: {
                "0-20": "0-20 lbs",
                "20-50": "21-50 lbs",
                "50-90": "51-90 lbs",
                ">90": ">90 lbs",
            },
            viewTableButton: "View full age comparison table",
            traditionalTableTitle: "Pet to Human Age Comparison",
            tableHeaders: {
                petYears: "Pet Years",
                feline: "Feline",
                canine: "Canine Weight (lbs)",
            },
            formulaModalTitle: "About the Modern Formula",
            dogFormulaDesc: "This modern formula is based on a 2020 study that analyzed epigenetic changes in dog DNA (methylation) and compared them to humans. It suggests that dogs age much more rapidly at first and then their aging slows down. It is considered more accurate for physiological age than the old '1 dog year = 7 human years' rule.",
            reference: "Reference:",
            referenceLinkText: "Cell Systems, Wang et al.",
        }
    },
    gregorianMonths: { "1": "January", "2": "February", "3": "March", "4": "April", "5": "May", "6": "June", "7": "July", "8": "August", "9": "September", "10": "October", "11": "November", "12": "December" },
    jalaliMonths: { "1": "Farvardin", "2": "Ordibehesht", "3": "Khordad", "4": "Tir", "5": "Mordad", "6": "Shahrivar", "7": "Mehr", "8": "Aban", "9": "Azar", "10": "Dey", "11": "Bahman", "12": "Esfand" },

  },
  fa: {
    // General
    appName: "همیار دامپزشک",
    back: "بازگشت",
    kg: "ک‌گ",
    edit: "ویرایش",
    delete: "حذف",
    cancel: "انصراف",
    saveChanges: "ذخیره تغییرات",
    noBreedsFound: "نژادی یافت نشد",
    moreInfo: "اطلاعات بیشتر",

    // Navigation
    navHome: "خانه",
    navProtocols: "پروتکل‌ها",
    navMyDrugs: "داروهای من",
    navSettings: "تنظیمات",

    // Species
    species: "گونه",
    animalSpecies: {
        CAT: "گربه",
        DOG: "سگ",
    },
    speciesCat: "گربه",
    speciesDog: "سگ",
    speciesBird: "پرنده",
    speciesMammal: "پستاندار",
    speciesReptile: "خزنده",
    speciesAmphibian: "دوزیست",
    speciesFish: "ماهی",

    // Home Screen
    selectSpeciesPrompt: "برای شروع، یک گونه را انتخاب کنید",

    // Patient Info Form
    weight: "وزن",
    enterWeight: "مثال: ۵.۴",
    gender: "جنسیت",
    male: "نر",
    female: "ماده",
    unknown: "نامشخص",
    breedOptional: "نژاد (اختیاری)",
    enterBreed: "نژاد را وارد کنید...",
    placeholderGermanShepherd: "مثال: ژرمن شپرد",
    placeholderPersianCat: "مثال: پرشین",
    placeholderCockatiel: "مثال: عروس هلندی",
    placeholderHollandLop: "مثال: لوپ هلندی",
    placeholderRedEyedTreeFrog: "مثال: قورباغه درختی چشم‌قرمز",
    placeholderGoldfish: "مثال: ماهی گلدفیش",
    placeholderBeardedDragon: "مثال: اژدهای ریش‌دار",
    ageGroup: "رده سنی",
    neonate: "نوزاد",
    pediatric: "طفل",
    adult: "بالغ",
    geriatric: "سالمند",
    clinicalSignsOptional: "علائم بالینی (اختیاری)",
    enterClinicalSigns: "مثال: بی‌حالی، استفراغ...",

    // Vet Tools
    tools: "ابزارهای دامپزشکی",
    drugDoseCalculator: "ماشین‌حساب دوز دارو",
    drugDoseDesc: "دوزها را با دقت محاسبه کنید",
    fluidTherapyCalculator: "مایع درمانی",
    fluidTherapyDesc: "برنامه‌ریزی نرخ و کمبود مایعات",
    bloodPressureCalculator: "فشار خون",
    bloodPressureDesc: "ارزیابی خطر فشار خون بالا",
    bloodTransfusionCalculator: "انتقال خون",
    bloodTransfusionDesc: "محاسبه حجم انتقال خون",
    petAgeCalculator: "محاسبه‌گر سن حیوان",
    petAgeDesc: "تبدیل سن حیوان به سال انسانی",
    feedbackPrompt: "قابلیت بازخورد به زودی اضافه می‌شود!",

    // Protocols Screen
    protocolsTitle: "پروتکل‌ها",
    searchProtocols: "جستجوی پروتکل‌ها...",
    chipAll: "همه",
    chipCanine: "سگ‌سانان",
    chipFeline: "گربه‌سانان",
    chipExotic: "اگزوتیک",
    protocolsCommon: "پروتکل‌های رایج",
    protocolsAdvanced: "پروتکل‌های پیشرفته",

    // My Meds Screen
    myMedList: {
        title: "لیست داروهای من",
        maxGoldenRetriever: "مکس (گلدن رتریور)",
        lunaPersianCat: "لونا (گربه پرشین)",
        meloxicamSuspension: "سوسپانسیون ۱.۵ میلی‌گرم/میلی‌لیتر",
        meloxicamInstructions: "۰.۲۷ میلی‌لیتر خوراکی یک بار در روز",
        clavamoxTablets: "قرص ۶۲.۵ میلی‌گرم",
        clavamoxInstructions: "۱ قرص خوراکی دو بار در روز",
        deleteProfileConfirm: "آیا از حذف این پروفایل و تمام داروهای آن مطمئن هستید؟",
        deleteMedConfirm: "آیا از حذف این دارو مطمئن هستید؟",
        profileFor: "پروفایل برای",
        addMedication: "افزودن دارو",
        noMedications: "دارویی اضافه نشده است",
        getStarted: "برای شروع، یک دارو اضافه کنید.",
        yourTools: "ابزارهای شما",
        featureInteractionsTitle: "بررسی تداخلات دارویی",
        featureInteractionsDesc: "تداخلات دارویی احتمالی را بررسی کنید.",
        featureAlertsTitle: "هشدارها و یادآورهای دوز",
        featureAlertsDesc: "برای دوزهای دارو یادآور تنظیم کنید.",
        featureReportsTitle: "ایجاد گزارش دارویی",
        featureReportsDesc: "خلاصه‌ای برای ارتباط با صاحب حیوان ایجاد کنید.",
    },
    profileModal: {
        title: "ایجاد پروفایل حیوان",
        editTitle: "ویرایش پروفایل حیوان",
        nameLabel: "نام حیوان",
        namePlaceholder: "مثال: مکس",
        imageUrlLabel: "آدرس تصویر (اختیاری)",
        imageUrlPlaceholder: "https://example.com/image.png",
        create: "ایجاد پروفایل",
    },
    medicationModal: {
        addTitle: "افزودن دارو",
        editTitle: "ویرایش دارو",
        nameLabel: "نام دارو",
        namePlaceholder: "مثال: ملوکسیکام",
        formulationLabel: "شکل و قدرت دارو",
        formulationPlaceholder: "مثال: سوسپانسیون ۱.۵ میلی‌گرم/میلی‌لیتر",
        instructionsLabel: "دستورالعمل مصرف",
        instructionsPlaceholder: "مثال: ۰.۵ میلی‌لیتر خوراکی یک بار در روز",
        add: "افزودن دارو",
    },
    
    // Settings Screen
    settingsGeneral: "عمومی",
    language: "زبان",
    theme: "پوسته",
    themeLight: "روشن",
    themeDark: "تیره",
    themeSystem: "سیستم",
    themeSystemDescription: "پوسته سیستم به طور خودکار با تنظیمات ظاهری دستگاه شما مطابقت پیدا می‌کند.",
    settingsNotifications: "اعلان‌ها",
    pushNotifications: "اعلان‌های പുഷ്",
    emailNotifications: "اعلان‌های ایمیل",
    settingsDataPrivacy: "داده و حریم خصوصی",
    syncFrequency: "فرکانس همگام‌سازی",
    automatic: "خودکار",
    clearCache: "پاک کردن حافظه پنهان",
    cacheCleared: "حافظه پنهان با موفقیت پاک شد!",
    privacyPolicy: "سیاست حفظ حریم خصوصی",
    termsOfService: "شرایط خدمات",
    settingsCalculatorDefaults: "پیش‌فرض‌های ماشین‌حساب",
    defaultWeightUnit: "واحد وزن پیش‌فرض",
    
    // Auth & Profile
    auth: {
        welcomeTitle: "به همیار دامپزشک خوش آمدید",
        welcomeSubtitle: "دستیار دامپزشکی حرفه‌ای شما.",
        emailPlaceholder: "ایمیل یا شماره موبایل خود را وارد کنید",
        continue: "ادامه",
        continueWithGoogle: "ادامه با گوگل",
        or: "یا",
        otp: {
            titleEmail: "ایمیل خود را بررسی کنید",
            titleSms: "پیامک‌های خود را بررسی کنید",
            subtitle: "یک کد ۶ رقمی به {identity} ارسال کردیم.",
            noCode: "کدی دریافت نکردید؟",
            resend: "ارسال مجدد",
            back: "استفاده از روش دیگر"
        },
        error: {
            invalidEmail: "لطفا یک ایمیل یا شماره موبایل معتبر وارد کنید.",
            invalidCode: "کد وارد شده صحیح نیست. لطفا دوباره تلاش کنید."
        }
    },
    profile: {
        view: {
            title: "پروفایل من",
            editButton: "ویرایش پروفایل",
            logoutButton: "خروج از حساب"
        },
        form: {
            title: "پروفایل خود را کامل کنید",
            subtitle: "لطفاً برای شروع اطلاعات بیشتری ارائه دهید.",
            saveButton: "ذخیره و ادامه",
            identityLabel: "شناسه ورود",
            cancelButton: "انصراف",
            fullNameLabel: "نام کامل",
            fullNamePlaceholder: "مثال: دکتر سارا احمدی",
            roleLabel: "من یک ... هستم",
            rolePlaceholder: "نقش خود را انتخاب کنید",
            universityLabel: "دانشگاه",
            universityPlaceholder: "مثال: دانشگاه علوم دامپزشکی",
            studentIdLabel: "شماره دانشجویی",
            studentIdPlaceholder: "شماره دانشجویی خود را وارد کنید",
            provinceLabel: "استان",
            provincePlaceholder: "مثال: تهران",
            licenseNumberLabel: "شماره نظام دامپزشکی",
            licenseNumberPlaceholder: "شماره نظام خود را وارد کنید",
            role: {
                student: "دانشجوی دامپزشکی",
                dvm: "دامپزشک (DVM)"
            }
        },
        error: {
            required: "این فیلد الزامی است"
        }
    },

    // Drug Calculator
    drugCalculator: {
        title: "ماشین‌حساب دوز دارو",
        searchPlaceholder: "جستجوی دارو...",
        allCategories: "همه",
        notFound: "دارویی یافت نشد.",
        selectDrugPrompt: "برای شروع محاسبه، یک دارو از لیست انتخاب کنید.",
        formulation: "شکل دارو",
        rangeRoute: "دامنه و مسیر",
        dosePerKg: "دوز (میلی‌گرم/کیلوگرم)",
        noDoseForSpecies: "اطلاعات دوز برای گونه و شکل داروی انتخاب شده موجود نیست.",
        amountToAdminister: "مقدار مصرفی",
        totalDose: "دوز کل",
        simpleForm: {
            tablet: "قرص",
            capsule: "کپسول",
            sachet: "ساشه",
            suspension: "سوسپانسیون",
            injection: "تزریقی",
        },
    },
    units: {
        mg: 'میلی‌گرم',
        g: 'گرم',
        mcg: 'میکروگرم',
        ml: 'میلی‌لیتر',
        tablet: 'قرص',
        capsule: 'کپسول',
        sachet: 'ساشه'
    },
    drugNotes: {
        amoxRabbitWarning: "توجه: در حیوانات با تخمیر در روده پسین (hindgut fermenters) با احتیاط مصرف شود. می‌تواند باعث انتروتوکسمی کشنده شود.",
        ivermectinContraindication: "در این گونه منع مصرف دارد. می‌تواند باعث سمیت عصبی شدید و مرگ شود."
    },

    // Fluid Calculator
    calculatorFluidTherapyTitle: "ماشین‌حساب مایع درمانی",
    missingWeightWarning: "وزن بیمار الزامی است. لطفاً آن را در صفحه اصلی وارد کنید.",
    fluid: {
        planTitle: "برنامه مایع درمانی",
        resultsTitle: "نتایج محاسبه",
        fluidType: "نوع مایع",
        fluidVolume: "حجم سرم",
        dripSet: "ست سرم",
        types: {
            lrs: "رینگر لاکتات (LRS)",
            normalSaline: "نرمال سالین ۰.۹٪",
            normosolR: "نورموسول-آر",
            plasmalyteA: "پلاسمالایت-آ",
            d5w: "دکستروز ۵٪ در آب",
            dextroseSaline: "دکستروز ۵٪ در سالین ۰.۹٪",
            halfSaline: "سدیم کلراید ۰.۴۵٪",
            hetastarch: "هتااستارچ ۶٪",
            vetstarch: "وت‌استارچ",
            hypertonicSaline: "سالین هایپرتونیک ۷.۵٪",
            wholeBlood: "خون کامل",
            prbc: "گلبول قرمز فشرده (PRBC)",
            ffp: "پلاسمای منجمد تازه (FFP)",
            buretrol: "(میکروست)",
        },
        dehydration: {
            title: "افزودن کم‌آبی (دهیدراتاسیون)"
        },
        ongoingLosses: {
            title: "افزودن تلفات مداوم"
        },
        replaceTimeTitle: "بازه زمانی جایگزینی",
        replaceTime: "جایگزینی کمبود در",
        volume: {
            hours: "ساعت",
        },
        maintenance: {
            title: "نرخ نگهدارنده",
            dosageDaily: "دوز (روزانه)",
            initialRate: "نرخ اولیه (کل)",
        },
        shock: {
            title: "شوک درمانی",
            dosage: "دوز (ml/kg)",
        },
        surgical: {
            title: "مایعات حین جراحی",
            dosage: "دوز (ml/kg/hr)",
        },
    },

    // BP Calculator
    bp: {
        title: "فشار خون",
        about: "درباره این ماشین‌حساب",
        guidelines: "بر اساس دستورالعمل بیانیه اجماع ACVIM 2018",
        unsupportedSpecies: "این ماشین‌حساب فقط برای استفاده در سگ و گربه در نظر گرفته شده است.",
        enterInformation: "اطلاعات اندازه‌گیری را وارد کنید",
        data: "خوانش‌های فشار را وارد کنید",
        riskOfTod: "خطر آسیب به ارگان هدف (TOD)",
        patientPosition: "وضعیت بیمار",
        positionOptions: {
            lateral: "خوابیده به پهلو",
            sternal: "خوابیده روی سینه",
            standing: "ایستاده",
            sitting: "نشسته",
        },
        cuffPosition: "محل کاف",
        cuffPositionOptions: {
            rightFront: "دست راست",
            leftFront: "دست چپ",
            rightRear: "پای راست",
            leftRear: "پای چپ",
            tail: "قاعده دم",
        },
        cuffSize: "اندازه کاف (سانتی‌متر)",
        time: "زمان",
        stressLevel: "سطح استرس",
        stressLevelOptions: {
            relaxed: "آرام",
            tense: "مضطرب",
            nervous: "عصبی",
            veryNervous: "بسیار عصبی",
            aggressive: "تهاجمی",
        },
        measurementMethod: "روش",
        methodOptions: {
            doppler: "داپلر",
            oscillometric: "اسیلومتریک",
        },
        location: "مکان",
        dvmTech: "دامپزشک/تکنسین",
        pressure: "فشار",
        meanSystolic: "میانگین فشار خون سیستولیک (SBP)",
        sbpMmHg: "SBP (mmHg)",
        category: "دسته‌بندی",
        normotensive: "نرمال",
        borderline: "پیش-پرفشاری",
        hypertensive: "پرفشاری خون",
        severelyHypertensive: "پرفشاری شدید",
        minimal: "حداقل",
        low: "کم",
        moderate: "متوسط",
        high: "زیاد",
        sbpAbbr: "SBP: فشار خون سیستولیک",
        todAbbr: "TOD: آسیب به ارگان هدف",
        infoModal: {
            title: "درباره اندازه‌گیری فشار خون",
            p1: "این ابزار به طبقه‌بندی فشار خون بالا بر اساس بیانیه اجماع ACVIM 2018 کمک می‌کند.",
            p2: "برای اطمینان از دقت، پیروی از پروتکل‌های استاندارد اندازه‌گیری، از جمله استفاده از اندازه کاف صحیح (۴۰٪ محیط اندام)، اجازه دادن به بیمار برای سازگاری با محیط و گرفتن چندین خوانش، بسیار مهم است.",
            p3: "میانگین SBP محاسبه شده، بالاترین و پایین‌ترین مقادیر را در صورتی که بیش از ۵ خوانش وارد شود، مطابق با دستورالعمل‌ها، نادیده می‌گیرد.",
        },
    },

     // Transfusion Calculator
    transfusion: {
        title: "انتقال خون",
        desiredPcv: "PCV هدف",
        currentPcv: "PCV فعلی بیمار",
        donorPcv: "PCV اهداکننده",
        bloodVolumeNeeded: "حجم خون مورد نیاز",
        about: {
            title: "درباره این ماشین‌حساب",
            formulaTitle: "فرمول محاسبه",
            formula: "حجم (میلی‌لیتر) = وزن (کیلوگرم) * N * (PCV هدف - PCV بیمار) / PCV اهداکننده",
            formulaN: "N = ۹۰ برای سگ، ۶۰ برای گربه (ثابت حجم خون)",
        },
        rate: {
            title: "نرخ‌های انتقال",
            startLabel: "نرخ شروع (۱۵-۳۰ دقیقه اول)",
            startValue: "۰.۲۵ ml/kg/hr",
            dogsLabel: "سگ‌ها (در صورت عدم واکنش)",
            dogsValue: "۵-۱۰ ml/kg/hr",
            catsLabel: "گربه‌ها (در صورت عدم واکنش)",
            catsValue: "۳-۵ ml/kg/hr",
        },
        monitoring: {
            title: "نظارت",
            step1: { title: "پایه", text: "ثبت دما، نبض، تنفس، CRT قبل از شروع." },
            step2: { title: "هر ۱۵-۳۰ دقیقه", text: "تکرار علائم حیاتی، مشاهده برای واکنش‌ها." },
            step3: { title: "پس از انتقال", text: "نظارت برای ۱-۴ ساعت پس از اتمام." },
            step4: { title: "توقف فوری", text: "در صورت بروز هرگونه واکنش، انتقال را متوقف کنید." },
        },
        reactions: {
            title: "واکنش‌های انتقال",
            immuneHemolytic: { title: "همولیتیک حاد با واسطه ایمنی", summary: "شدیدترین. گربه گروه B خون گروه A دریافت کند.", signsTitle: "علائم", signs: "تب، تاکی‌کاردی، افت فشار، استفراغ، کلاپس." },
            immuneNonHemolytic: { title: "تب‌دار غیر همولیتیک", summary: "شایع‌ترین. واکنش به گلبول‌های سفید یا پلاکت‌ها.", signsTitle: "علائم", signs: "تب، کهیر، خارش." },
        }
    },
    errors: {
        unsupportedSpecies: "این ماشین‌حساب برای گونه انتخاب شده در نظر گرفته نشده است.",
    },

     // Pet Age Calculator
    otherPage: {
        ageCalculator: {
            pageTitle: "ماشین‌حساب سن حیوان",
            currentAgeTitle: "محاسبه سن فعلی",
            humanYearsTitle: "محاسبه سن به سال انسانی",
            calendarType: "نوع تقویم",
            gregorian: "میلادی",
            jalali: "شمسی (جلالی)",
            year: "سال",
            month: "ماه",
            day: "روز",
            currentAgeResult: "سن فعلی",
            units: { years: "سال", months: "ماه", days: "روز" },
            calculationMethod: "روش محاسبه",
            formula: "فرمول مدرن (سگ)",
            table: "جدول سنتی",
            dogFormulaTitle: "سن سگ (فرمول لگاریتمی)",
            enterDogAge: "سن سگ را به سال وارد کنید",
            ageInHumanYears: "معادل سن انسانی",
            petAgeLabel: "سن حیوان را وارد کنید (سال)",
            speciesLabel: "گونه",
            dogWeightLabel: "وزن بالغ سگ (lbs)",
            weightRanges: {
                "0-20": "۰-۲۰ پوند",
                "20-50": "۲۱-۵۰ پوند",
                "50-90": "۵۱-۹۰ پوند",
                ">90": "بیش از ۹۰ پوند",
            },
            viewTableButton: "مشاهده جدول کامل مقایسه سن",
            traditionalTableTitle: "مقایسه سن حیوان با انسان",
            tableHeaders: {
                petYears: "سن حیوان",
                feline: "گربه",
                canine: "وزن سگ (lbs)",
            },
            formulaModalTitle: "درباره فرمول مدرن",
            dogFormulaDesc: "این فرمول مدرن بر اساس مطالعه‌ای در سال ۲۰۲۰ است که تغییرات اپی‌ژنتیکی در DNA سگ (متیلاسیون) را تجزیه و تحلیل کرده و آن را با انسان مقایسه می‌کند. این نشان می‌دهد که سگ‌ها در ابتدا بسیار سریع‌تر پیر می‌شوند و سپس روند پیری آن‌ها کند می‌شود. این روش برای سن فیزیولوژیکی دقیق‌تر از قانون قدیمی '۱ سال سگ = ۷ سال انسان' در نظر گرفته می‌شود.",
            reference: "مرجع:",
            referenceLinkText: "Cell Systems, Wang et al.",
        }
    },
    gregorianMonths: { "1": "ژانویه", "2": "فوریه", "3": "مارس", "4": "آوریل", "5": "مه", "6": "ژوئن", "7": "ژوئیه", "8": "اوت", "9": "سپتامبر", "10": "اکتبر", "11": "نوامبر", "12": "دسامبر" },
    jalaliMonths: { "1": "فروردین", "2": "اردیبهشت", "3": "خرداد", "4": "تیر", "5": "مرداد", "6": "شهریور", "7": "مهر", "8": "آبان", "9": "آذر", "10": "دی", "11": "بهمن", "12": "اسفند" },

  }
};