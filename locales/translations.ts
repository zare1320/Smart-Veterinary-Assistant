
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
    appName: "Smart Veterinary Assistant",
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
    protocolNotFound: "No protocol found for your search.",
    addProtocol: "Add New Protocol",
    addProtocolTitle: "Add New Protocol",
    form: {
        titleLabel: "Title",
        titlePlaceholder: "e.g., Canine Parvovirus Treatment",
        descriptionLabel: "Short Description",
        descriptionPlaceholder: "A brief summary of the protocol.",
        categoryLabel: "Category",
        contentLabel: "Content (Markdown Supported)",
        contentPlaceholder: "Enter the full protocol details here...",
        saveProtocol: "Save Protocol",
    },
    custom: "Custom",

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
    settings: {
        account: "Account",
        logout: "Log Out",
        logoutDescription: "Sign out of your current session.",
        appVersion: "Version",
        languageDescription: "Choose the display language for the app.",
        themeDescription: "Select a light, dark, or system-default theme.",
        pushNotificationsDescription: "Receive alerts for important updates.",
        emailNotificationsDescription: "Get summaries and news in your inbox.",
        syncDescription: "Manage how your data syncs across devices.",
        privacyDescription: "Read our policy on how we handle your data.",
        termsDescription: "Review the terms and conditions for using the app.",
        weightUnitDescription: "Set the default unit for patient weight.",
        about: "About",
    },

    // Auth & Profile
    auth: {
        welcomeTitle: "Smart Veterinary Assistant",
        welcomeSubtitle: "Specialized tools, treatment protocols, and precise calculators in your hands.",
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

    // Drug Interaction Checker
    interactions: {
        title: "Drug Interaction Checker",
        intro1: "This tool is intended to identify potential interactions. Not all drugs interact with each other.",
        intro2: "Some interactions may not require stopping medication but rather careful management. Always consult with a pharmacist or specialist.",
        searchPlaceholder: "Enter a drug name to add it to the list...",
        selectedDrugs: "Selected Drugs for Checking",
        noDrugsSelected: "Add at least two drugs to check for interactions.",
        resultsTitle: "Interaction Results",
        noInteractions: "No interactions were found among the selected drugs.",
        severity: {
            major: "Major",
            moderate: "Moderate",
            minor: "Minor"
        },
        meloxicamKetoconazole: {
            summary: "Increased risk of GI ulceration and nephrotoxicity.",
            detail: "Concurrent use of ketoconazole (an azole antifungal) can inhibit the metabolism of meloxicam (an NSAID), leading to increased plasma levels. This elevates the risk of gastrointestinal side effects, such as ulcers and bleeding, as well as potential kidney damage. Monitor renal function and clinical signs of GI distress closely. Dose reduction of meloxicam may be necessary."
        },
        meloxicamWarfarin: {
            summary: "Increased risk of bleeding.",
            detail: "NSAIDs like meloxicam can displace warfarin from plasma proteins and inhibit platelet function, significantly increasing the anticoagulant effect and the risk of severe bleeding. This combination should be avoided if possible. If unavoidable, frequent monitoring of coagulation parameters (PT/INR) is essential."
        },
        ketoconazoleCyclosporine: {
            summary: "Increased cyclosporine levels and risk of toxicity.",
            detail: "Ketoconazole is a potent inhibitor of the CYP3A4 enzyme, which is responsible for metabolizing cyclosporine. Concurrent use can lead to dangerously high levels of cyclosporine, increasing the risk of nephrotoxicity and other side effects. Cyclosporine dose reduction (often by 50-75%) and therapeutic drug monitoring are required."
        }
    },
    medicationReport: {
        title: "Medication Report",
        prescription: "Veterinary Prescription",
        patientInfo: "Patient Information",
        patientName: "Patient Name",
        medications: "Prescribed Medications",
        additionalNotes: "Additional Notes",
        notesPlaceholder: "Enter any additional instructions or notes here...",
        signature: "Veterinarian's Signature",
        disclaimer: "This prescription is based on the information provided for the above-named patient and is intended for their use only. Please administer all medications as directed and contact your veterinarian if you have any questions or if the patient's condition worsens. Keep all medications out of reach of children and other animals.",
        printReport: "Print Report",
        issuedOn: "Issued on",
    },
    // New Translations
    sync: {
        title: "Data Sync",
        lastSync: "Last sync",
        syncNow: "Sync Now",
        syncing: "Syncing...",
        autoSync: "Automatic Sync",
        frequency: "Frequency",
        daily: "Daily",
        weekly: "Weekly",
        onOpen: "On app open",
        dataUsage: "Data Usage",
        wifiOnly: "Sync only on Wi-Fi",
        wifiOnlyDesc: "Prevent syncing over cellular data to save usage.",
    },
    privacy: {
        lastUpdated: "Last updated: July 29, 2024",
        introduction: {
            title: "Introduction",
            p1: "Smart Veterinary Assistant is built to help you deliver high-quality care by providing fast, reliable calculations in any setting, so you can focus on your patients, not your math. It gives you seamless access to both essential calculation tools and trusted veterinary guidance in one convenient place."
        },
        informationWeCollect: {
            title: "Information We Collect",
            p1: "We may collect information about you in a variety of ways. The information we may collect via the Application includes:",
            l1: { title: "Personal Data", desc: "Personally identifiable information, such as your name, email address, and professional credentials (e.g., license number, student ID) that you voluntarily give to us when you register with the Application." },
            l2: { title: "Patient Data", desc: "Information you provide about your patients, such as species, weight, clinical signs, and medications. This data is stored locally on your device and can be optionally synced to our secure servers if you enable the sync feature." },
            l3: { title: "Usage Data", desc: "Information our servers automatically collect when you access the Application, such as your IP address, browser type, operating system, and the pages you have viewed." },
        },
        howWeUse: {
            title: "How We Use Your Information",
            p1: "Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:",
            l1: "Create and manage your account.",
            l2: "Provide the core functionality of the app, such as calculators and protocols.",
            l3: "Compile anonymous statistical data and analysis for internal use to improve the Application.",
        },
        dataSecurity: {
            title: "Data Security",
            p1: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable."
        },
        contact: {
            title: "Contact Us",
            p1: "If you have questions or comments about this Privacy Policy, please contact us at: support@vetpocketpal.com"
        }
    },
    terms: {
        lastUpdated: "Last updated: July 29, 2024",
        acceptance: {
            title: "1. Acceptance of Terms",
            p1: "By accessing or using the Vet Pocket Pal application ('Service'), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service."
        },
        useOfService: {
            title: "2. Use of the Service",
            p1: "Vet Pocket Pal is intended as a clinical decision-support tool for qualified veterinary professionals and students. The information provided is for educational and reference purposes only and is not a substitute for professional veterinary judgment, diagnosis, or treatment.",
            p2: "You are solely responsible for verifying the accuracy of all calculations and information before clinical application. The developers assume no liability for any errors or omissions, or for any outcomes resulting from the use of this application."
        },
        disclaimer: {
            title: "3. Disclaimer of Warranties",
            p1: "The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis. Your use of the Service is at your sole risk. The Service is provided without warranties of any kind, whether express or implied."
        },
        governingLaw: {
            title: "4. Governing Law",
            p1: "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the developer is based, without regard to its conflict of law provisions."
        }
    },
    weightUnits: {
        kg: {
            label: "Kilograms (kg)",
            description: "Metric standard unit of mass."
        },
        lb: {
            label: "Pounds (lb)",
            description: "Imperial unit of mass (1 kg ≈ 2.20462 lb)."
        }
    }
  },
  fa: {
    // General
    appName: "دستیار هوشمند دامپزشک",
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
    protocolNotFound: "پروتکلی برای جستجوی شما یافت نشد.",
    addProtocol: "افزودن پروتکل جدید",
    addProtocolTitle: "افزودن پروتکل جدید",
    form: {
        titleLabel: "عنوان",
        titlePlaceholder: "مثال: درمان پاروویروس سگ",
        descriptionLabel: "توضیح کوتاه",
        descriptionPlaceholder: "خلاصه‌ای کوتاه از پروتکل.",
        categoryLabel: "دسته‌بندی",
        contentLabel: "محتوا (پشتیبانی از مارک‌داون)",
        contentPlaceholder: "جزئیات کامل پروتکل را اینجا وارد کنید...",
        saveProtocol: "ذخیره پروتکل",
    },
    custom: "شخصی",

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
    pushNotifications: "اعلان‌های پوش",
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
    settings: {
        account: "حساب کاربری",
        logout: "خروج از حساب",
        logoutDescription: "از جلسه فعلی خود خارج شوید.",
        appVersion: "نسخه",
        languageDescription: "زبان نمایش برنامه را انتخاب کنید.",
        themeDescription: "پوسته روشن، تیره یا پیش‌فرض سیستم را انتخاب کنید.",
        pushNotificationsDescription: "هشدارهایی برای به‌روزرسانی‌های مهم دریافت کنید.",
        emailNotificationsDescription: "خلاصه‌ها و اخبار را در ایمیل خود دریافت کنید.",
        syncDescription: "نحوه همگام‌سازی داده‌های خود را مدیریت کنید.",
        privacyDescription: "سیاست ما در مورد نحوه مدیریت داده‌های شما را بخوانید.",
        termsDescription: "شرایط و ضوابط استفاده از برنامه را مرور کنید.",
        weightUnitDescription: "واحد پیش‌فرض وزن بیمار را تنظیم کنید.",
        about: "درباره",
    },
    
    // Auth & Profile
    auth: {
        welcomeTitle: "دستیار هوشمند دامپزشک",
        welcomeSubtitle: "ابزارهای تخصصی، پروتکل‌های درمانی و ماشین‌حساب‌های دقیق در دستان شما.",
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
                dvm: "دکتر دامپزشک"
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

     // Drug Interaction Checker
    interactions: {
        title: "بررسی تداخلات دارویی",
        intro1: "این ابزار برای شناسایی تداخلات بالقوه طراحی شده است. همه داروها با یکدیگر تداخل ندارند.",
        intro2: "برخی تداخل‌ها ممکن است نیاز به قطع دارو نداشته باشند، بلکه فقط نیازمند مدیریت دقیق هستند. همیشه با داروساز یا متخصص مشورت کنید.",
        searchPlaceholder: "نام دارو را برای افزودن به لیست وارد کنید...",
        selectedDrugs: "داروهای انتخاب شده برای بررسی",
        noDrugsSelected: "برای بررسی تداخلات، حداقل دو دارو اضافه کنید.",
        resultsTitle: "نتایج تداخلات",
        noInteractions: "هیچ تداخلی بین داروهای انتخاب شده یافت نشد.",
        severity: {
            major: "عمده",
            moderate: "متوسط",
            minor: "جزئی"
        },
        meloxicamKetoconazole: {
            summary: "افزایش خطر زخم گوارشی و سمیت کلیوی.",
            detail: "استفاده همزمان از کتوکونازول (یک ضد قارچ آزولی) می‌تواند متابولیسم ملوکسیکام (یک NSAID) را مهار کرده و منجر به افزایش سطح پلاسمایی آن شود. این امر خطر عوارض جانبی گوارشی مانند زخم و خونریزی و همچنین آسیب احتمالی کلیه را افزایش می‌دهد. عملکرد کلیه و علائم بالینی مشکلات گوارشی را به دقت تحت نظر بگیرید. ممکن است کاهش دوز ملوکسیکام ضروری باشد."
        },
        meloxicamWarfarin: {
            summary: "افزایش خطر خونریزی.",
            detail: "NSAIDها مانند ملوکسیکام می‌توانند وارفارین را از پروتئین‌های پلاسما جابجا کرده و عملکرد پلاکت‌ها را مهار کنند، که به طور قابل توجهی اثر ضد انعقادی و خطر خونریزی شدید را افزایش می‌دهد. در صورت امکان باید از این ترکیب اجتناب شود. در صورت غیرقابل اجتناب بودن، نظارت مکرر بر پارامترهای انعقادی (PT/INR) ضروری است."
        },
        ketoconazoleCyclosporine: {
            summary: "افزایش سطح سیکلوسپورین و خطر سمیت.",
            detail: "کتوکونازول یک مهارکننده قوی آنزیم CYP3A4 است که مسئول متابولیسم سیکلوسپورین است. استفاده همزمان می‌تواند منجر به سطوح خطرناک بالای سیکلوسپورین شده و خطر سمیت کلیوی و سایر عوارض جانبی را افزایش دهد. کاهش دوز سیکلوسپورین (اغلب به میزان ۵۰-۷۵٪) و پایش درمانی دارو الزامی است."
        }
    },
    medicationReport: {
        title: "گزارش دارویی",
        prescription: "نسخه دامپزشکی",
        patientInfo: "اطلاعات بیمار",
        patientName: "نام بیمار",
        medications: "داروهای تجویز شده",
        additionalNotes: "ملاحظات",
        notesPlaceholder: "دستورالعمل‌ها یا ملاحظات اضافی را اینجا وارد کنید...",
        signature: "امضای دامپزشک",
        disclaimer: "این نسخه بر اساس اطلاعات ارائه شده برای بیمار فوق صادر شده و فقط برای استفاده او می‌باشد. لطفاً تمام داروها را طبق دستور مصرف کرده و در صورت داشتن هرگونه سوال یا بدتر شدن وضعیت بیمار با دامپزشک خود تماس بگیرید. تمام داروها را دور از دسترس کودکان و سایر حیوانات نگهداری کنید.",
        printReport: "چاپ گزارش",
        issuedOn: "تاریخ صدور",
    },
    // New Translations
    sync: {
        title: "همگام‌سازی داده",
        lastSync: "آخرین همگام‌سازی",
        syncNow: "همگام‌سازی کن",
        syncing: "در حال همگام‌سازی...",
        autoSync: "همگام‌سازی خودکار",
        frequency: "فرکانس",
        daily: "روزانه",
        weekly: "هفتگی",
        onOpen: "هنگام باز کردن برنامه",
        dataUsage: "مصرف داده",
        wifiOnly: "فقط با وای-فای همگام‌سازی شود",
        wifiOnlyDesc: "برای صرفه‌جویی در مصرف، از همگام‌سازی با داده تلفن همراه جلوگیری کنید.",
    },
    privacy: {
        lastUpdated: "آخرین به‌روزرسانی: ۲۹ جولای ۲۰۲۴",
        introduction: {
            title: "مقدمه",
            p1: "دستیار هوشمند دامپزشک برای کمک به شما در ارائه مراقبت‌های باکیفیت، از طریق فراهم آوردن محاسبات سریع و قابل اعتماد در هر شرایطی ساخته شده است تا بتوانید به جای محاسبات، بر روی بیماران خود تمرکز کنید. این برنامه دسترسی یکپارچه‌ای به ابزارهای محاسباتی ضروری و راهنمایی‌های معتبر دامپزشکی را در یک مکان مناسب برای شما فراهم می‌کند."
        },
        informationWeCollect: {
            title: "اطلاعاتی که جمع‌آوری می‌کنیم",
            p1: "ما ممکن است اطلاعات شما را به روش‌های مختلفی جمع‌آوری کنیم. اطلاعاتی که ممکن است از طریق برنامه جمع‌آوری کنیم شامل موارد زیر است:",
            l1: { title: "داده‌های شخصی", desc: "اطلاعات قابل شناسایی شخصی، مانند نام، آدرس ایمیل و مدارک حرفه‌ای شما (مانند شماره نظام، شماره دانشجویی) که به صورت داوطلبانه هنگام ثبت‌نام در اختیار ما قرار می‌دهید." },
            l2: { title: "داده‌های بیمار", desc: "اطلاعاتی که در مورد بیماران خود ارائه می‌دهید، مانند گونه، وزن، علائم بالینی و داروها. این داده‌ها به صورت محلی در دستگاه شما ذخیره می‌شوند و در صورت فعال کردن قابلیت همگام‌سازی، می‌توانند به صورت اختیاری با سرورهای امن ما همگام‌سازی شوند." },
            l3: { title: "داده‌های استفاده", desc: "اطلاعاتی که سرورهای ما به طور خودکار هنگام دسترسی شما به برنامه جمع‌آوری می‌کنند، مانند آدرس IP، نوع مرورگر، سیستم عامل و صفحاتی که مشاهده کرده‌اید." },
        },
        howWeUse: {
            title: "چگونه از اطلاعات شما استفاده می‌کنیم",
            p1: "داشتن اطلاعات دقیق به ما امکان می‌دهد تا تجربه‌ای روان، کارآمد و سفارشی را برای شما فراهم کنیم. به طور خاص، ما ممکن است از اطلاعات جمع‌آوری شده در مورد شما از طریق برنامه برای موارد زیر استفاده کنیم:",
            l1: "ایجاد و مدیریت حساب کاربری شما.",
            l2: "ارائه قابلیت‌های اصلی برنامه، مانند ماشین‌حساب‌ها و پروتکل‌ها.",
            l3: "جمع‌آوری داده‌ها و تحلیل‌های آماری ناشناس برای استفاده داخلی جهت بهبود برنامه.",
        },
        dataSecurity: {
            title: "امنیت داده‌ها",
            p1: "ما از اقدامات امنیتی اداری، فنی و فیزیکی برای کمک به حفاظت از اطلاعات شخصی شما استفاده می‌کنیم. در حالی که ما اقدامات معقولی را برای ایمن‌سازی اطلاعات شخصی که به ما ارائه می‌دهید انجام داده‌ایم، لطفاً آگاه باشید که علی‌رغم تلاش‌های ما، هیچ اقدام امنیتی کامل یا غیرقابل نفوذ نیست."
        },
        contact: {
            title: "تماس با ما",
            p1: "اگر در مورد این سیاست حفظ حریم خصوصی سوال یا نظری دارید، لطفاً با ما تماس بگیرید: support@vetpocketpal.com"
        }
    },
    terms: {
        lastUpdated: "آخرین به‌روزرسانی: ۲۹ جولای ۲۰۲۴",
        acceptance: {
            title: "۱. پذیرش شرایط",
            p1: "با دسترسی یا استفاده از برنامه همیار دامپزشک ('سرویس')، شما موافقت می‌کنید که به این شرایط خدمات متعهد باشید. اگر با هر بخشی از شرایط مخالف هستید، مجاز به دسترسی به سرویس نیستید."
        },
        useOfService: {
            title: "۲. استفاده از سرویس",
            p1: "همیار دامپزشک به عنوان یک ابزار پشتیبانی از تصمیم‌گیری بالینی برای متخصصان و دانشجویان دامپزشکی واجد شرایط در نظر گرفته شده است. اطلاعات ارائه شده فقط برای اهداف آموزشی و مرجع است و جایگزین قضاوت، تشخیص یا درمان حرفه‌ای دامپزشکی نیست.",
            p2: "شما تنها مسئول تأیید صحت تمام محاسبات و اطلاعات قبل از کاربرد بالینی هستید. توسعه‌دهندگان هیچ مسئولیتی در قبال هرگونه خطا یا حذفیات، یا برای هرگونه نتیجه ناشی از استفاده از این برنامه بر عهده نمی‌گیرند."
        },
        disclaimer: {
            title: "۳. سلب مسئولیت ضمانت‌ها",
            p1: "این سرویس بر اساس 'همانطور که هست' و 'همانطور که در دسترس است' ارائه می‌شود. استفاده شما از سرویس به عهده خودتان است. سرویس بدون هیچ‌گونه ضمانتی، اعم از صریح یا ضمنی، ارائه می‌شود."
        },
        governingLaw: {
            title: "۴. قانون حاکم",
            p1: "این شرایط مطابق با قوانین حوزه قضایی که توسعه‌دهنده در آن مستقر است، بدون توجه به مفاد تعارض قوانین آن، اداره و تفسیر می‌شود."
        }
    },
    weightUnits: {
        kg: {
            label: "کیلوگرم (kg)",
            description: "واحد استاندارد متریک برای جرم."
        },
        lb: {
            label: "پوند (lb)",
            description: "واحد امپریال برای جرم (۱ کیلوگرم ≈ ۲.۲۰۴۶۲ پوند)."
        }
    }
  }
};
