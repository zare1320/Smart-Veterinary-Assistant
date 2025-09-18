import React from 'react';
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
    comingSoon: "Coming Soon...",


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
    weightErrorInvalid: "Please enter a valid, positive weight.",

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
    protocol: {
        error: {
            titleRequired: "Title is required.",
            descriptionRequired: "Description is required.",
            contentRequired: "Content is required."
        }
    },

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
            invalidEmail: "Please enter a valid email.",
            invalidPhone: "Please enter a valid 11-digit mobile number (e.g., 09123456789).",
            invalidIdentity: "Please enter a valid email or mobile number.",
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
            provincePlaceholder: "Select a province",
            licenseNumberLabel: "Veterinary License Number",
            licenseNumberPlaceholder: "Enter your license number",
            role: {
                student: "Veterinary Student",
                dvm: "Veterinarian (DVM)"
            }
        },
        error: {
            required: "This field is required",
            invalidStudentId: "Student ID must contain only numbers.",
            invalidLicenseNumber: "License number must be a 7-digit number.",
            fullNameInvalid: "Please enter your full name (first and last name)."
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
        },
        infoModal: {
            title: "Transfusion Information",
            aboutTitle: "About & Formula",
            processingTitle: "Processing & Storage",
            crossmatchTitle: "Cross-matching",
            formula: "Volume (ml) = Weight (kg) * N * (Desired PCV - Patient PCV) / Donor PCV",
            formulaN: "N = 90 for dogs, 60 for cats (blood volume constant)",
            contentComingSoon: "Detailed information for this section is coming soon.",
            canineTitle: "Canine",
            caninePoint1: "12 canine blood types",
            caninePoint2: "Designated DEA and a number (DEA 1, DEA 2, DEA 3, etc.)",
            caninePoint3: "Most important are DEA 1.1 and 1.2",
            caninePoint4: "DEA 1.1 Positive = universal recipient",
            caninePoint5: "DEA 1.1, DEA 1.2 Negative = universal donor",
            caninePoint6: "Cross-match does not need to be performed on a first-time transfusion",
            caninePoint7: "Sensitization takes ~3 days",
            caninePoint8: "Cross-match needed 72 hours after dog receives transfusion",
            felineTitle: "Feline",
            felinePoint1: "AB blood type system",
            felinePoint2: "Types: A, B, AB (rare)",
            felinePoint3: "Have natural occurring alloantibodies to other blood groups = No universal donor",
            felinePoint4: "Type A: Weak anti-B alloantibodies, mild reaction if transfused with B blood",
            felinePoint5: "Type B: High anti-A alloantibodies, severe reaction if transfused with A blood",
            felinePoint6: "<strong>ALL CATS SHOULD BE CROSS-MATCHED</strong>"
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
    // Calories Calculator
    caloriesCalculator: {
        title: "Calories Calculator",
        description: "Estimate daily energy needs",
        weightAndBcs: "Weight & BCS",
        bcs: "Body Condition Score (BCS)",
        bcsCharts: "BCS Charts",
        bcsValue: "BCS: {value}/9",
        bcsChartTitleCanine: "Canine Body Condition Score Chart",
        bcsChartTitleFeline: "Feline Body Condition Score Chart",
        bcsChartAltText: "Body Condition Score Chart",
        merEstimates: "*Equations for MER are ESTIMATES, individual animals can vary by as much as 50% from the predicted values.",
        canine: "Canine",
        feline: "Feline",
        petCriteria: "Pet Criteria",
        results: "Results",
        rer: "RER",
        mer: "MER",
        rerSubtitle: "Resting Energy",
        merSubtitle: "Maintenance Energy",
        dailyH2O: "Daily H2O Requirement",
        feedingPlan: "Feeding Plan",
        kcalPerUnit: "Kcal per Cup or Can",
        enterCaloriesPlaceholder: "e.g., 350",
        foodAmount: "Food Amount",
        idealWeight: "Ideal Weight",
        bcsDesc: "Estimated based on BCS",
        bcsLabels: {
            thin: "Too Thin",
            ideal: "Ideal",
            heavy: "Too Heavy",
        },
        criteria: {
            neuteredAdultCanine: "Neutered Adult",
            intactAdultCanine: "Intact Adult",
            inactiveObeseCanine: "Inactive/obese",
            weightLossCanine: "Weight Loss",
            weightGainCanine: "Weight Gain",
            puppy0_4Canine: "Puppy 0-4 months",
            puppy4_12Canine: "Puppy 4-12 months",
            neuteredAdultFeline: "Neutered Adult",
            intactAdultFeline: "Intact Adult",
            inactiveObeseFeline: "Inactive/obese",
            weightLossFeline: "Weight Loss",
            weightGainFeline: "Weight Gain",
            kittenFeline: "Kitten <1 year",
        }
    },
    // Toxicity Calculator
    toxicity: {
        title: "Toxicity",
        description: "Check common poisonings",
        tabs: {
            chocolate: "Chocolate",
            rodenticides: "Rodenticides",
            xylitol: "Xylitol",
            plants: "Plants"
        },
        chocolate: {
            section1Title: "Weight - Species",
            pounds: "Pounds",
            kilograms: "Kilograms",
            selectSpecies: "Select Species",
            section2Title: "Chocolate Type Ingested",
            chocolate: "Chocolate",
            section3Title: "Volume of Chocolate Ingested",
            ouncesIngested: "Ounces Ingested",
            gramsIngested: "Grams Ingested",
            section4Title: "Results",
            results: {
                prompt: "Enter weight and amount to see results.",
                level: {
                    safe: "Safe",
                    mild: "Mild",
                    moderate: "Moderate",
                    severe: "Severe / Lethal"
                },
                symptoms: {
                    safe: "No significant effects expected at this dose.",
                    mild: "Mild signs such as vomiting, diarrhea, and polydipsia may be observed.",
                    moderate: "Cardiotoxic effects, such as tachycardia and arrhythmias, may occur.",
                    severe: "Risk of seizures, coma, and potentially lethal outcome. Immediate veterinary intervention is required."
                },
                catWarning: "Note: Cats are more sensitive to theobromine than dogs. These toxicity levels are based on dogs; veterinary consultation is strongly advised for any ingestion by a cat."
            },
            types: {
                white: "White Chocolate",
                milk: "Milk Chocolate",
                dark: "Dark Chocolate",
                semisweet: "Semi-sweet Chocolate",
                bakers: "Baker's (unsweetened)",
                dry_cocoa: "Dry Cocoa Powder",
                instant_cocoa: "Instant Cocoa Powder",
                cocoa_beans: "Cocoa Beans",
                coffee_beans: "Coffee Beans/Grounds",
                cocoa_hulls: "Cocoa Bean Hulls/Mulch"
            },
            infoModal: {
                title: "Chocolate Info",
                incidence: {
                    title: "Incidence/Prevalence",
                    p1: "ASPCA Animal Poison Control Center 2006: number 7 hazard encountered by pets.",
                    p2: "Dark chocolate is about 10 times as toxic as milk chocolate.",
                    p3: "Small dogs or dogs with a history of diabetes, pancreatitis, or heart problems are more sensitive to chocolate than larger, healthy dogs.",
                    p4: "The most cases involving chocolate toxicity are associated with dogs.",
                    p5: "More common during the holiday season due to increased availability.",
                    p6: "Cocoa shell mulch; increasing in popularity for landscaping."
                },
                methylxanthines: {
                    title: "Methylxanthines (Theobromine & Caffeine)",
                    p1: "Chocolate contains substances known as methylxanthines (specifically caffeine and theobromine), which dogs are far more sensitive to than people. Different types of chocolate contain varying amounts of methylxanthines. In general, though, the darker and more bitter the chocolate the greater the danger.",
                    p2: "The amount of toxic theobromine varies with the type of chocolate. The darker and more bitter the chocolate, the more dangerous it is to your pets. Cooking or baking chocolate and high quality dark chocolate contains between 130-450 mg of theobromine per ounce of the product, while common milk chocolate only contains about 44-58 mg/ounce.",
                    p3: "White chocolate barely poses any threat of chocolate poisoning, with only 0.25 mg of theobromine per ounce of chocolate (that said, dogs can still get sick from all that fat and sugar, resulting in pancreatitis!).",
                    p4: "This means that for a medium size dog, weighing 50 pounds it would take only 1 ounce of baker's chocolate or 8 ounces of milk chocolate to potentially show signs of poisoning."
                },
                toxicDoses: {
                    title: "Toxic Doses",
                    p1: "Theobromine toxicity are reported to be as low as 20 mg/kg, where agitation, hyperactivity and gastrointestinal signs (such as drooling, vomiting, and diarrhea - all which may smell like chocolate) can be seen.",
                    p2: "At doses > 40 mg/kg, cardiac signs can be seen, and include a racing heart rate, high blood pressure, or even heart arrhythmias.",
                    p3: "At doses > 60 mg/kg, neurologic signs can be seen, and include tremors, twitching, and even seizures.",
                    p4: "Fatalities have been seen at around 200 mg/kg (approximately 100 mg/lb), or when complications occur."
                },
                signs: {
                    title: "Signs & Symptoms",
                    p1: "\"Clinical signs of chocolate poisoning can take hours to develop and last for days.\" Clinical signs of chocolate poisoning can take several hours to develop, and even longer to go away. Clinical signs of chocolate poisoning can last for days, due to the long half-life of theobromine. The theobromine can even be re-absorbed from the bladder, so aggressive IV fluids and frequent walks may be necessary.",
                    symptoms: {
                        vomiting: "Vomiting",
                        diarrhea: "Diarrhea",
                        temp: "Increased body temperature",
                        reflex: "Increased reflex responses",
                        rigidity: "Muscle rigidity",
                        breathing: "Rapid breathing",
                        heartRate: "Increased heart rate",
                        bloodPressure: "Low blood pressure",
                        seizures: "Seizures",
                        advanced: "Advanced signs (cardiac failure, weakness, and coma)"
                    }
                },
                cats: {
                    title: "Chocolate Toxicity in Cats",
                    p1: "Although they're not normally as curious about people foods as dogs are, cat (and kittens in particular) can sometimes eat things they aren't supposed to eat, including chocolate. Derived from the roasted seeds of the cacao plant, certain properties in chocolate can be toxic to cats when they're ingested, specifically, caffeine and theobromine. Eating these ingredients can lead to a number of medical complications—some of which may be serious—in your cat. These symptoms will be similar as in dogs and vary, based on the amount and type of chocolate that is ingested and can influence the severity of the condition. Varieties of chocolate that can be especially poisonous to cats are milk chocolate, semi-sweet chocolate and baking chocolate."
                },
                diagnosis: {
                    title: "Common Diagnosis",
                    p1: "If you suspect your pet has ingested chocolate and is experiencing any of the above symptoms, bring it to your veterinarian immediately. You can expect your vet to perform a complete physical exam, including a chemical blood profile, an electrolyte panel, and a urinalysis to help determine if your cat has overdosed on caffeine and theobromine. Your veterinarian may also perform an ECG to help determine if the heart is showing any abnormalities in rhythm or conduction of heart beats. Blood biochemistry and blood profile may also be needed."
                },
                treatment: {
                    title: "General Treatment",
                    p1: "Treatment depends on the amount and type of chocolate eaten. If treated early, removal of the chocolate from the stomach by administering medications to induce vomiting and administration of activated charcoal to block absorption of theobromine into the body may be all that is necessary. It is very common to provide supportive treatments such as intravenous fluid therapy to help dilute the toxin and promote its excretion. All pets ingesting chocolate should be closely monitored for any signs of agitation, vomiting, diarrhea, nervousness, irregular heart rhythm, and high blood pressure. Often, medications to slow the heart rate (e.g., beta-blockers) may be necessary to treat the elevated heart rate and arrhythmia."
                },
                prevention: {
                    title: "Prevention",
                    p1: "The best form of preventing chocolate toxicity is to always keep chocolate out of your Pet's reach and be aware of feeding them anything that might contain chocolate."
                },
                conclusion: {
                    title: "Conclusion",
                    p1: "Remember, with any poisoning, it's always cheaper, less invasive, and has a better prognosis/outcome if you treat early. Once your pet has already developed clinical signs and is affected by the poison, it makes for a much more expensive veterinary visit!"
                },
                references: {
                    title: "References",
                    p1: "\"CAFFEINE & THEOBROMINE.\" The Hershey Company. N.p., n.d. Web. 12 Sept. 2013."
                }
            }
        },
        rodenticides: {
            typeIngested: "Rodenticide Type Ingested",
            volumeIngested: "Volume of Rodenticide Ingested",
            rodenticide: "Rodenticide",
            categories: {
                bromethalin: "Bromethalin",
                vitamin_d3: "Vitamin D3",
                second_gen: "2nd Generation Anticoagulants",
                first_gen: "1st Generation Anticoagulants"
            },
            types: {
                warfarin_0025: "Warfarin (0.025%)",
                bromadiolone_0005: "Bromadiolone (0.005%)",
                cholecalciferol: "Cholecalciferol",
                bromethalin_001: "Bromethalin (0.01%)",
                bromethalin_0025: "Bromethalin (0.025%)",
                difethialone_00025: "Difethialone (0.0025%)",
                brodifacoum_0005: "Brodifacoum (0.005%)",
                diphacinone_0005: "Diphacinone (0.005%)",
                chlorphacinone_0005: "Chlorphacinone (0.005%)",
            },
            results: {
                notes: {
                    safe: "No treatment may be necessary. Many rodenticide exposures lack information on the total volume ingested.",
                    mild: "Appropriate supportive treatment with induction of emesis and activated charcoal may be prudent.",
                    moderate: "Vitamin K1 therapy is recommended. Monitor coagulation parameters (PT) closely.",
                    severe: "Immediate veterinary intervention is required. Hospitalization, intensive monitoring, and aggressive therapy are necessary."
                }
            },
            infoModal: {
                title: "Rodenticide Poisoning Information",
                intro1: "Many different types of rodenticides are available in a wide variety of colors and formulations. Different rodenticides may look alike but contain different types of poison.",
                intro2: "Accurate identification of the active ingredient is crucial as this will determine the risk and need for treatment. If not clearly visible on the packaging, use the EPA registration number to identify the ingredient.",
                anticoagulants: {
                    title: "ANTICOAGULANTS",
                    main: "Anticoagulant rodenticides are divided into first- (short-acting, e.g., warfarin) and second-generations (long-acting, e.g., brodifacoum). They work by inhibiting Vitamin K1 epoxide reductase, decreasing active clotting factors (2, 7, 9, 10) and causing uncontrolled bleeding. Signs of poisoning typically appear 3-5 days after ingestion.",
                    signsTitle: "Common Signs:",
                    signsContent: "Initially, blood loss is internal with signs like lethargy, exercise intolerance, coughing, and pale gums. Less common signs include vomiting, diarrhea, nosebleeds, bruising, bloody urine, swollen joints, and bleeding gums.",
                    treatmentTitle: "Antidote and Treatment:",
                    treatmentContent: "Vitamin K1 (phytonadione) is the antidote. Vitamin K3 and dietary vitamin K are not sufficient. Treatment involves oral Vitamin K1 for 5-10 days (short-acting) or 21-30 days (long-acting). Prothrombin time (PT) should be checked two days after the last dose.",
                    threatTitle: "Threat:",
                    threatContent: "Cats are more resistant than dogs. The toxic dose varies greatly between ingredients; some require a very small amount to be lethal (e.g., brodifacoum). Animals with liver disease, the very young, or the very old are at higher risk."
                },
                cholecalciferol: {
                    title: "CHOLECALCIFEROL (VITAMIN D3)",
                    main: "For dogs and cats, this is one of the most dangerous rodenticides on the market and is gaining in popularity due to EPA restrictions on second-generation anticoagulants.",
                    mechanismTitle: "Mechanism of Action:",
                    mechanismContent: "This poison causes hypercalcemia and hyperphosphatemia, resulting in acute kidney failure and other tissue damage secondary to metastatic mineralization.",
                    signsTitle: "Common Signs:",
                    signsContent: "PU/PD, weakness, lethargy, decreased appetite, and halitosis ('uremic' breath). Acute kidney failure develops 2-3 days after ingestion, by which point significant and permanent damage has often already occurred.",
                    treatmentTitle: "Antidote and Treatment:",
                    treatmentContent: "This poisoning is challenging to treat and often requires hospitalization and expensive therapy. There is no specific antidote. Treatment includes aggressive IV fluids and drugs (diuretics, steroids, bisphosphonates) to decrease calcium concentration. Frequent blood work monitoring is needed for 2-6 weeks.",
                    threatTitle: "Threat:",
                    threatContent: "Cholecalciferol has a very narrow margin of safety. Even small ingestions can cause severe clinical signs or death. Toxic ingestions must be treated quickly to prevent kidney failure."
                },
                bromethalin: {
                    title: "BROMETHALIN",
                    main: "This neurotoxic rodenticide causes cerebral edema. Its name can be easily mistaken for long-acting anticoagulants like brodifacoum.",
                    mechanismTitle: "Mechanism of Action:",
                    mechanismContent: "Bromethalin works by uncoupling oxidative phosphorylation in the brain and liver mitochondria, which can result in cerebral edema.",
                    signsTitle: "Common Signs:",
                    signsContent: "Incoordination (ataxia), tremors, seizures, paralysis, and eventually death. Signs can develop within 2 hours or be delayed for 3-4 days depending on the dose. Medical monitoring for at least 24 hours is often necessary.",
                    treatmentTitle: "Antidote and Treatment:",
                    treatmentContent: "In-hospital care for several days may be necessary due to the poison's long half-life. Treatment may include multiple doses of activated charcoal, IV fluids, and specific drugs to decrease brain swelling.",
                    threatTitle: "Threat:",
                    threatContent: "Cats are more sensitive to bromethalin than dogs. As this type of rodenticide has a narrow margin of safety, prompt therapy is often needed in all species."
                }
            }
        },
        xylitol: {
            aboutTitle: "About Xylitol Toxicity",
            aboutContent: "Hypoglycemia can occur within 30 minutes of ingestion of xylitol containing products. Signs may include anorexia, vomiting, diarrhea, lethargy, ataxia, restlessness, collapse, seizures, and coma. Dogs with liver involvement may or may not show signs of hypoglycemia prior to developing clinical signs of hepatic insufficiency or failure.Signs of hepatic injury (icterus, vomiting, diarrhea, abdominal pain) may occur within 12-72 hours after exposure. Evidence of other severe complications (Coagulopathy, hepatic encephalopathy) can also develop.",
            section1Title: "Volume (mg or grams) per Unit/Serving",
            mgPerServing: "Mgs per serving",
            gramsPerServing: "Grams per serving",
            section2Title: "Number of Units/Servings Ingested",
            servingsIngested: "Servings or Units Ingested",
            section3Title: "mg/kg Results",
            resultsTitle: "Xylitol Toxicity",
            riskHypoglycemia: "Ingestion of doses > 0.1 g/kg (100 mg/kg) are at risk for developing Hypoglycemia.",
            riskLiverFailure: "Ingestion of > 0.5 g/kg (500 mg/kg) may develop acute liver failure with or without Hypoglycemia.",
            signsTitle: "Signs occassionay include:",
            signsContent: "Agitation, hyperactivity, and possibly drooling",
            infoModal: {
                title: "About Xylitol Volume and Units",
                p1: "Products containing Xylitol list the volume (in grams or mg's) per serving in two ways:",
                l1Title: "1. As Xylitol only",
                l1Content: "Use the Xylitol value in Total Carbs. (the value of 0.9 grams or 900mgs of Xylitol per serving in the image below) when entering volume ingested.",
                l2Title: "2. As Sugar Alcohols",
                l2Content1: "Sugar Alcohols include both Xylitol and other related sugar alcohols (e.g. Sorbitol).",
                l2Content2: "If Xylitol is listed first in the ingredients list, use the total Sugar Alcohols volume in your calculation.",
                l2Content3: "If Xylitol is listed second, divide the total Sugar Alcohol volume by 2 for a rough estimate of Xylitol volume (in the image below, 1 gram ÷ 2 = 500mg of Xylitol per serving)",
                close: "Close"
            }
        },
        plants: {
            title: "Poisonous Plants",
            searchPlaceholder: "Search Plants...",
            intro: "Search the list of Poisonous Plants below by Name or Common Name. The icons indicate if the plant is <strong>Toxic</strong> {toxicIcon} or <strong>Non-toxic</strong> {nonToxicIcon} in <strong>Dogs</strong> {dogIcon} or <strong>Cats</strong> {catIcon}. Each plant listed links to the ASPCA Poisonous Plant page.",
            legendTitle: "Poisonous Plants List",
            commonNames: "Common Names",
            scientificName: "Scientific Names",
            family: "Family"
        }
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
    },
    protocols: {
      canineVaccination: {
        title: "Vaccination Protocol for Puppies",
        description: "A comprehensive guide to the principles and schedules of modern canine vaccination for puppies."
      },
      felineLeukemia: {
        title: "Feline Leukemia Virus (FeLV) Treatment",
        description: "Detailed protocol for managing FeLV in cats, including medication and supportive care."
      },
      canineParvovirus: {
        title: "Canine Parvovirus Treatment",
        description: "Intensive care protocol for treating parvovirus in dogs, focusing on hydration and symptom management."
      },
      felineURI: {
        title: "Feline Upper Respiratory Infection (URI) Protocol",
        description: "Treatment guidelines for managing URI in cats, including antibiotics and supportive care."
      }
    },
    canineVaccinationContent: {
      coreVaccinesTitle: "Core Vaccines",
      coreVaccinesDesc: "Core vaccines are recommended for all puppies and dogs with an unknown vaccination history. These protect against diseases that are common, have high morbidity/mortality rates, and are a public health risk.",
      cdvName: "Canine Distemper Virus (CDV)",
      cdvDesc: "A severe, highly contagious viral disease affecting the respiratory, gastrointestinal, and nervous systems.",
      cav2Name: "Canine Adenovirus-2 (CAV-2)",
      cav2Desc: "Protects against infectious canine hepatitis (caused by CAV-1) and is a component of the kennel cough complex.",
      cpv2Name: "Canine Parvovirus (CPV-2)",
      cpv2Desc: "A highly contagious and often fatal viral disease that causes severe vomiting and diarrhea, particularly in puppies.",
      rabiesName: "Rabies Virus",
      rabiesDesc: "A fatal viral disease of the nervous system that can affect all mammals, including humans. Vaccination is legally required in most areas.",
      puppyScheduleTitle: "Puppy Vaccination Schedule",
      puppyScheduleDesc: "This is a general guideline. Your veterinarian will tailor a specific protocol for your puppy based on their individual risk factors and your geographic location.",
      tableHeaderAge: "Age",
      tableHeaderRecs: "Recommended Vaccines",
      scheduleRow1Age: "6-8 Weeks",
      scheduleRow1Recs: "DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus) - 1st dose",
      scheduleRow2Age: "10-12 Weeks",
      scheduleRow2Recs: "DHPP - 2nd dose. Optional: Leptospirosis, Bordetella, Canine Influenza based on risk.",
      scheduleRow3Age: "14-16 Weeks",
      scheduleRow3Recs: "DHPP - 3rd (final puppy) dose. Rabies (as required by law, often around 16 weeks). Optional: Leptospirosis, Bordetella, Canine Influenza boosters.",
      boostersTitle: "Post-Puppy Boosters",
      boostersDesc: "After the initial puppy series, boosters are required to maintain immunity.",
      boosterPoint1: "<strong>1 Year Old:</strong> A booster dose of DHPP and Rabies is typically given one year after the final puppy vaccination.",
      boosterPoint2: "<strong>Adult Dogs (after 1-year booster):</strong> Rabies vaccine is typically boosted every 1-3 years, depending on the vaccine label and local laws. DHPP is often boosted every 3 years. Other non-core vaccines may require annual boosters."
    },
    toast: {
        profile: {
            updated: "Profile updated successfully!",
            created: "Profile created successfully!",
            deleted: "Profile deleted."
        },
        medication: {
            added: "Medication added.",
            updated: "Medication updated.",
            deleted: "Medication deleted."
        },
        protocol: {
            saved: "Protocol saved successfully!"
        },
        error: {
            requiredFields: "Please fill out all required fields."
        }
    },
    provinces: {
      "alborz": "Alborz",
      "ardabil": "Ardabil",
      "bushehr": "Bushehr",
      "chaharmahal_bakhtiari": "Chaharmahal and Bakhtiari",
      "east_azerbaijan": "East Azerbaijan",
      "fars": "Fars",
      "gilan": "Gilan",
      "golestan": "Golestan",
      "hamadan": "Hamadan",
      "hormozgan": "Hormozgan",
      "ilam": "Ilam",
      "isfahan": "Isfahan",
      "kerman": "Kerman",
      "kermanshah": "Kermanshah",
      "khuzestan": "Khuzestan",
      "kohgiluyeh_boyer_ahmad": "Kohgiluyeh and Boyer-Ahmad",
      "kurdistan": "Kurdistan",
      "lorestan": "Lorestan",
      "markazi": "Markazi",
      "mazandaran": "Mazandaran",
      "north_khorasan": "North Khorasan",
      "qazvin": "Qazvin",
      "qom": "Qom",
      "razavi_khorasan": "Razavi Khorasan",
      "semnan": "Semnan",
      "sistan_baluchestan": "Sistan and Baluchestan",
      "south_khorasan": "South Khorasan",
      "tehran": "Tehran",
      "west_azerbaijan": "West Azerbaijan",
      "yazd": "Yazd",
      "zanjan": "Zanjan"
    },
  },
  fa: {
    // General
    appName: "دستیار هوشمند دامپزشک",
    back: "بازگشت",
    kg: "kg",
    edit: "ویرایش",
    delete: "حذف",
    cancel: "انصراف",
    saveChanges: "ذخیره تغییرات",
    noBreedsFound: "نژادی یافت نشد",
    moreInfo: "اطلاعات بیشتر",
    comingSoon: "به زودی...",

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
    weightErrorInvalid: "لطفاً یک وزن معتبر و مثبت وارد کنید.",

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
    protocol: {
        error: {
            titleRequired: "عنوان الزامی است.",
            descriptionRequired: "توضیحات الزامی است.",
            contentRequired: "محتوا الزامی است."
        }
    },

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
            invalidEmail: "لطفا یک ایمیل معتبر وارد کنید.",
            invalidPhone: "لطفا یک شماره موبایل ۱۱ رقمی معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).",
            invalidIdentity: "لطفا یک ایمیل یا شماره موبایل معتبر وارد کنید.",
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
            provincePlaceholder: "یک استان را انتخاب کنید",
            licenseNumberLabel: "شماره نظام دامپزشکی",
            licenseNumberPlaceholder: "شماره نظام خود را وارد کنید",
            role: {
                student: "دانشجوی دامپزشکی",
                dvm: "دکتر دامپزشک"
            }
        },
        error: {
            required: "این فیلد الزامی است",
            invalidStudentId: "شماره دانشجویی باید فقط شامل عدد باشد.",
            invalidLicenseNumber: "شماره نظام دامپزشکی باید یک عدد ۷ رقمی باشد.",
            fullNameInvalid: "لطفاً نام و نام خانوادگی خود را به طور کامل وارد کنید."
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
        },
        infoModal: {
            title: "اطلاعات انتقال خون",
            aboutTitle: "درباره و فرمول",
            processingTitle: "فرآوری و نگهداری",
            crossmatchTitle: "کراس مچینگ",
            formula: "حجم (میلی‌لیتر) = وزن (کیلوگرم) * N * (PCV هدف - PCV بیمار) / PCV اهداکننده",
            formulaN: "N = ۹۰ برای سگ، ۶۰ برای گربه (ثابت حجم خون)",
            contentComingSoon: "اطلاعات دقیق این بخش به زودی اضافه خواهد شد.",
            canineTitle: "سگ",
            caninePoint1: "۱۲ گروه خونی در سگ‌ها",
            caninePoint2: "با نام DEA و یک شماره مشخص می‌شوند (DEA 1, DEA 2, DEA 3, و غیره)",
            caninePoint3: "مهم‌ترین‌ها DEA 1.1 و 1.2 هستند",
            caninePoint4: "DEA 1.1 مثبت = گیرنده عمومی",
            caninePoint5: "DEA 1.1، DEA 1.2 منفی = اهداکننده عمومی",
            caninePoint6: "کراس مچ برای انتقال خون بار اول نیازی نیست",
            caninePoint7: "حساس شدن حدود ۳ روز طول می‌کشد",
            caninePoint8: "کراس مچ ۷۲ ساعت پس از دریافت خون توسط سگ، لازم است",
            felineTitle: "گربه",
            felinePoint1: "سیستم گروه خونی AB",
            felinePoint2: "گروه‌ها: A, B, AB (نادر)",
            felinePoint3: "دارای آلوآنتی‌بادی‌های طبیعی علیه سایر گروه‌های خونی = اهداکننده عمومی وجود ندارد",
            felinePoint4: "گروه A: آلوآنتی‌بادی‌های ضد B ضعیف، واکنش خفیف در صورت انتقال خون B",
            felinePoint5: "گروه B: آلوآنتی‌بادی‌های ضد A قوی، واکنش شدید در صورت انتقال خون A",
            felinePoint6: "<strong>تمام گربه‌ها باید کراس مچ شوند</strong>"
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
    // Calories Calculator
     caloriesCalculator: {
        title: "محاسبه‌گر کالری",
        description: "تخمین نیاز روزانه به انرژی",
        weightAndBcs: "وزن و BCS",
        bcs: "نمره وضعیت بدنی (BCS)",
        bcsCharts: "نمودارهای BCS",
        bcsValue: "BCS: {value}/9",
        bcsChartTitleCanine: "نمودار نمره وضعیت بدنی سگ",
        bcsChartTitleFeline: "نمودار نمره وضعیت بدنی گربه",
        bcsChartAltText: "نمودار نمره وضعیت بدنی",
        merEstimates: "*معادلات MER تخمینی هستند، حیوانات مختلف می‌توانند تا ۵۰٪ با مقادیر پیش‌بینی شده تفاوت داشته باشند.",
        canine: "سگ",
        feline: "گربه",
        petCriteria: "معیار حیوان",
        results: "نتایج",
        rer: "RER",
        mer: "MER",
        rerSubtitle: "انرژی استراحت",
        merSubtitle: "انرژی نگهدارنده",
        dailyH2O: "نیاز روزانه به آب",
        feedingPlan: "برنامه غذایی",
        kcalPerUnit: "کیلوکالری در هر فنجان یا قوطی",
        enterCaloriesPlaceholder: "مثال: ۳۵۰",
        foodAmount: "مقدار غذا",
        idealWeight: "وزن ایده‌آل",
        bcsDesc: "تخمین بر اساس BCS",
        bcsLabels: {
            thin: "لاغر",
            ideal: "ایده‌آل",
            heavy: "چاق",
        },
        criteria: {
            neuteredAdultCanine: "بالغ عقیم شده",
            intactAdultCanine: "بالغ عقیم نشده",
            inactiveObeseCanine: "غیرفعال/چاق",
            weightLossCanine: "کاهش وزن",
            weightGainCanine: "افزایش وزن",
            puppy0_4Canine: "توله ۰-۴ ماه",
            puppy4_12Canine: "توله ۴-۱۲ ماه",
            neuteredAdultFeline: "بالغ عقیم شده",
            intactAdultFeline: "بالغ عقیم نشده",
            inactiveObeseFeline: "غیرفعال/چاق",
            weightLossFeline: "کاهش وزن",
            weightGainFeline: "افزایش وزن",
            kittenFeline: "بچه گربه < ۱ سال",
        }
    },
    // Toxicity Calculator
    toxicity: {
        title: "مسمومیت",
        description: "بررسی مسمومیت‌های رایج",
        tabs: {
            chocolate: "شکلات",
            rodenticides: "جونده‌کش‌ها",
            xylitol: "زایلیتول",
            plants: "گیاهان"
        },
        chocolate: {
            section1Title: "وزن - گونه",
            pounds: "پوند",
            kilograms: "کیلوگرم",
            selectSpecies: "انتخاب گونه",
            section2Title: "نوع شکلات مصرفی",
            chocolate: "شکلات",
            section3Title: "حجم شکلات مصرفی",
            ouncesIngested: "اونس مصرفی",
            gramsIngested: "گرم مصرفی",
            section4Title: "نتایج",
            results: {
                prompt: "وزن و مقدار را برای مشاهده نتایج وارد کنید.",
                level: {
                    safe: "بی‌خطر",
                    mild: "خفیف",
                    moderate: "متوسط",
                    severe: "شدید / کشنده"
                },
                symptoms: {
                    safe: "در این دوز اثرات قابل توجهی انتظار نمی‌رود.",
                    mild: "علائم خفیف مانند استفراغ، اسهال و پرنوشی ممکن است مشاهده شود.",
                    moderate: "اثرات قلبی-سمی، مانند تاکی‌کاردی و آریتمی، ممکن است رخ دهد.",
                    severe: "خطر تشنج، کما و نتیجه بالقوه کشنده. مداخله فوری دامپزشکی لازم است."
                },
                catWarning: "توجه: گربه‌ها به تئوبرومین حساس‌تر از سگ‌ها هستند. این سطوح سمیت بر اساس سگ‌ها است؛ برای هرگونه مصرف توسط گربه، مشاوره دامپزشکی به شدت توصیه می‌شود."
            },
            types: {
                white: "شکلات سفید",
                milk: "شکلات شیری",
                dark: "شکلات تلخ",
                semisweet: "شکلات نیمه‌شیرین",
                bakers: "شکلات پخت‌وپز (بدون شکر)",
                dry_cocoa: "پودر کاکائو خشک",
                instant_cocoa: "پودر کاکائو فوری",
                cocoa_beans: "دانه‌های کاکائو",
                coffee_beans: "دانه‌ها/پودر قهوه",
                cocoa_hulls: "پوسته/مالچ دانه کاکائو"
            },
            infoModal: {
                title: "اطلاعات شکلات",
                incidence: {
                    title: "شیوع/بروز",
                    p1: "مرکز کنترل سموم حیوانات ASPCA ۲۰۰۶: خطر شماره ۷ که حیوانات خانگی با آن مواجه می‌شوند.",
                    p2: "شکلات تلخ حدود ۱۰ برابر سمی‌تر از شکلات شیری است.",
                    p3: "سگ‌های کوچک یا سگ‌هایی با سابقه دیابت، پانکراتیت یا مشکلات قلبی نسبت به سگ‌های بزرگتر و سالم، به شکلات حساس‌تر هستند.",
                    p4: "بیشترین موارد مسمومیت با شکلات مربوط به سگ‌ها است.",
                    p5: "در فصول تعطیلات به دلیل افزایش دسترسی، شایع‌تر است.",
                    p6: "مالچ پوسته کاکائو؛ که محبوبیت آن برای محوطه‌سازی در حال افزایش است."
                },
                methylxanthines: {
                    title: "متیل‌گزانتین‌ها (تئوبرومین و کافئین)",
                    p1: "شکلات حاوی موادی به نام متیل‌گزانتین‌ها (به ویژه کافئین و تئوبرومین) است که سگ‌ها بسیار بیشتر از انسان‌ها به آن حساس هستند. انواع مختلف شکلات حاوی مقادیر متفاوتی از متیل‌گزانتین‌ها هستند. با این حال، به طور کلی، هر چه شکلات تیره‌تر و تلخ‌تر باشد، خطر آن بیشتر است.",
                    p2: "مقدار تئوبرومین سمی بسته به نوع شکلات متفاوت است. هر چه شکلات تیره‌تر و تلخ‌تر باشد، برای حیوانات خانگی شما خطرناک‌تر است. شکلات پخت و پز و شکلات تلخ با کیفیت بالا حاوی ۱۳۰-۴۵۰ میلی‌گرم تئوبرومین در هر اونس محصول است، در حالی که شکلات شیری معمولی فقط حدود ۴۴-۵۸ میلی‌گرم در هر اونس دارد.",
                    p3: "شکلات سفید به سختی تهدیدی برای مسمومیت با شکلات ایجاد می‌کند، زیرا فقط ۰.۲۵ میلی‌گرم تئوبرومین در هر اونس شکلات دارد (با این حال، سگ‌ها همچنان می‌توانند از چربی و قند زیاد آن بیمار شوند و دچار پانکراتیت شوند!).",
                    p4: "این بدان معناست که برای یک سگ با اندازه متوسط به وزن ۵۰ پوند، تنها ۱ اونس شکلات پخت و پز یا ۸ اونس شکلات شیری برای نشان دادن علائم بالقوه مسمومیت کافی است."
                },
                toxicDoses: {
                    title: "دوزهای سمی",
                    p1: "سمیت تئوبرومین از دوزهای پایین ۲۰ میلی‌گرم بر کیلوگرم گزارش شده است که در آن بی‌قراری، بیش‌فعالی و علائم گوارشی (مانند آبریزش دهان، استفراغ و اسهال - که همگی ممکن است بوی شکلات بدهند) دیده می‌شود.",
                    p2: "در دوزهای > ۴۰ میلی‌گرم بر کیلوگرم، علائم قلبی دیده می‌شود و شامل ضربان قلب سریع، فشار خون بالا یا حتی آریتمی قلبی است.",
                    p3: "در دوزهای > ۶۰ میلی‌گرم بر کیلوگرم، علائم عصبی دیده می‌شود و شامل لرزش، انقباض عضلانی و حتی تشنج است.",
                    p4: "مرگ و میر در حدود ۲۰۰ میلی‌گرم بر کیلوگرم (تقریباً ۱۰۰ میلی‌گرم بر پوند) یا زمانی که عوارض رخ می‌دهد، دیده شده است."
                },
                signs: {
                    title: "علائم و نشانه‌ها",
                    p1: "\"علائم بالینی مسمومیت با شکلات ممکن است ساعت‌ها طول بکشد تا ایجاد شود و روزها ادامه یابد.\" علائم بالینی مسمومیت با شکلات می‌تواند چندین ساعت طول بکشد تا ایجاد شود و حتی بیشتر طول بکشد تا از بین برود. به دلیل نیمه‌عمر طولانی تئوبرومین، علائم بالینی مسمومیت با شکلات می‌تواند روزها ادامه یابد. تئوبرومین حتی می‌تواند از مثانه بازجذب شود، بنابراین ممکن است مایعات وریدی تهاجمی و پیاده‌روی‌های مکرر ضروری باشد.",
                    symptoms: {
                        vomiting: "استفراغ",
                        diarrhea: "اسهال",
                        temp: "افزایش دمای بدن",
                        reflex: "افزایش پاسخ‌های رفلکسی",
                        rigidity: "سفتی عضلات",
                        breathing: "تنفس سریع",
                        heartRate: "افزایش ضربان قلب",
                        bloodPressure: "فشار خون پایین",
                        seizures: "تشنج",
                        advanced: "علائم پیشرفته (نارسایی قلبی، ضعف و کما)"
                    }
                },
                cats: {
                    title: "مسمومیت با شکلات در گربه‌ها",
                    p1: "اگرچه آن‌ها به طور معمول به اندازه سگ‌ها به غذاهای انسانی کنجکاو نیستند، اما گربه‌ها (و به ویژه بچه‌گربه‌ها) گاهی اوقات چیزهایی را که نباید بخورند، از جمله شکلات، می‌خورند. خواص خاصی در شکلات که از دانه‌های بو داده کاکائو به دست می‌آید، می‌تواند هنگام مصرف برای گربه‌ها سمی باشد، به ویژه کافئین و تئوبرومین. خوردن این مواد می‌تواند منجر به تعدادی از عوارض پزشکی شود که برخی از آن‌ها ممکن است در گربه شما جدی باشند. این علائم مشابه سگ‌ها خواهد بود و بسته به مقدار و نوع شکلات مصرفی متفاوت است و می‌تواند بر شدت وضعیت تأثیر بگذارد. انواع شکلات که می‌توانند به خصوص برای گربه‌ها سمی باشند، شکلات شیری، شکلات نیمه شیرین و شکلات پخت و پز هستند."
                },
                diagnosis: {
                    title: "تشخیص رایج",
                    p1: "اگر مشکوک هستید که حیوان خانگی شما شکلات خورده است و هر یک از علائم فوق را تجربه می‌کند، فوراً آن را نزد دامپزشک خود ببرید. می‌توانید انتظار داشته باشید که دامپزشک شما یک معاینه فیزیکی کامل، شامل پروفایل شیمیایی خون، پانل الکترولیت و آنالیز ادرار انجام دهد تا مشخص شود آیا گربه شما بیش از حد کافئین و تئوبرومین مصرف کرده است یا خیر. دامپزشک شما همچنین ممکن است یک ECG انجام دهد تا مشخص شود آیا قلب ناهنجاری در ریتم یا هدایت ضربان‌ها نشان می‌دهد یا خیر. بیوشیمی خون و پروفایل خون نیز ممکن است مورد نیاز باشد."
                },
                treatment: {
                    title: "درمان عمومی",
                    p1: "درمان به مقدار و نوع شکلات خورده شده بستگی دارد. در صورت درمان زودهنگام، خارج کردن شکلات از معده با تجویز داروهایی برای ایجاد استفراغ و تجویز زغال فعال برای جلوگیری از جذب تئوبرومین به بدن ممکن است تمام آن چیزی باشد که لازم است. ارائه درمان‌های حمایتی مانند مایع درمانی وریدی برای کمک به رقیق شدن سم و ترویج دفع آن بسیار رایج است. تمام حیوانات خانگی که شکلات مصرف می‌کنند باید از نظر هرگونه علائم بی‌قراری، استفراغ، اسهال، عصبانیت، ریتم نامنظم قلب و فشار خون بالا به دقت تحت نظر باشند. اغلب، داروهایی برای کاهش ضربان قلب (مانند بتا-بلاکرها) ممکن است برای درمان ضربان قلب بالا و آریتمی لازم باشد."
                },
                prevention: {
                    title: "پیشگیری",
                    p1: "بهترین راه برای پیشگیری از مسمومیت با شکلات این است که همیشه شکلات را دور از دسترس حیوان خانگی خود نگه دارید و از دادن هر چیزی که ممکن است حاوی شکلات باشد به آن‌ها آگاه باشید."
                },
                conclusion: {
                    title: "نتیجه‌گیری",
                    p1: "به یاد داشته باشید، در مورد هرگونه مسمومیت، اگر زود درمان کنید، همیشه ارزان‌تر، کمتر تهاجمی و با پیش‌آگهی/نتیجه بهتری همراه است. هنگامی که حیوان خانگی شما قبلاً علائم بالینی را ایجاد کرده و تحت تأثیر سم قرار گرفته است، این به یک ویزیت دامپزشکی بسیار گران‌تر تبدیل می‌شود!"
                },
                references: {
                    title: "منابع",
                    p1: "\"کافئین و تئوبرومین.\" شرکت هرشی. وب. ۱۲ سپتامبر ۲۰۱۳."
                }
            }
        },
        rodenticides: {
            typeIngested: "نوع جونده‌کش مصرفی",
            volumeIngested: "حجم جونده‌کش مصرفی",
            rodenticide: "جونده‌کش",
            categories: {
                bromethalin: "برومتالین",
                vitamin_d3: "ویتامین D3",
                second_gen: "ضدانعقادهای نسل دوم",
                first_gen: "ضدانعقادهای نسل اول"
            },
            types: {
                warfarin_0025: "وارفارین (۰.۰۲۵٪)",
                bromadiolone_0005: "برومادیولون (۰.۰۰۵٪)",
                cholecalciferol: "کلکلسیفرول",
                bromethalin_001: "برومتالین (۰.۰۱٪)",
                bromethalin_0025: "برومتالین (۰.۰۲۵٪)",
                difethialone_00025: "دیفتیالون (۰.۰۰۲۵٪)",
                brodifacoum_0005: "برودیفاکوم (۰.۰۰۵٪)",
                diphacinone_0005: "دیفاسینون (۰.۰۰۵٪)",
                chlorphacinone_0005: "کلرفاسینون (۰.۰۰۵٪)",
            },
            results: {
                notes: {
                    safe: "ممکن است نیازی به درمان نباشد. بسیاری از موارد مسمومیت با جونده‌کش‌ها اطلاعاتی در مورد حجم کل مصرف شده ندارند.",
                    mild: "درمان حمایتی مناسب با ایجاد استفراغ و تجویز زغال فعال ممکن است محتاطانه باشد.",
                    moderate: "درمان با ویتامین K1 توصیه می‌شود. پارامترهای انعقادی (PT) را به دقت تحت نظر بگیرید.",
                    severe: "مداخله فوری دامپزشکی لازم است. بستری شدن، نظارت فشرده و درمان تهاجمی ضروری است."
                }
            },
            infoModal: {
                title: "اطلاعات مسمومیت با جونده‌کش‌ها",
                intro1: "انواع مختلفی از جونده‌کش‌ها در رنگ‌ها و فرمولاسیون‌های گوناگون موجود هستند. جونده‌کش‌های مختلف ممکن است ظاهری شبیه به هم داشته باشند اما حاوی سموم متفاوتی باشند.",
                intro2: "شناسایی دقیق ماده موثره حیاتی است زیرا ریسک و نیاز به درمان را مشخص می‌کند. اگر روی بسته‌بندی مشخص نیست، از شماره ثبت EPA برای شناسایی ماده استفاده کنید.",
                anticoagulants: {
                    title: "ضدانعقادها",
                    main: "جونده‌کش‌های ضدانعقاد به نسل اول (کوتاه‌اثر، مانند وارفارین) و نسل دوم (دیرپا، مانند برودیفاکوم) تقسیم می‌شوند. آن‌ها با مهار آنزیم اپوکسید ردوکتاز ویتامین K1، باعث کاهش فاکتورهای انعقادی فعال (۲، ۷، ۹، ۱۰) و خونریزی کنترل‌نشده می‌شوند. علائم مسمومیت معمولاً ۳-۵ روز پس از مصرف ظاهر می‌شود.",
                    signsTitle: "علائم رایج:",
                    signsContent: "در ابتدا، خونریزی داخلی است با علائمی مانند بی‌حالی، عدم تحمل ورزش، سرفه و لثه‌های رنگ‌پریده. علائم کمتر شایع شامل استفراغ، اسهال، خونریزی از بینی، کبودی، ادرار خونی، تورم مفاصل و خونریزی لثه است.",
                    treatmentTitle: "پادزهر و درمان:",
                    treatmentContent: "ویتامین K1 (فیتونادیون) پادزهر است. ویتامین K3 و ویتامین K موجود در رژیم غذایی کافی نیستند. درمان شامل ویتامین K1 خوراکی برای ۵-۱۰ روز (کوتاه‌اثر) یا ۲۱-۳۰ روز (دیرپا) است. زمان پروترومبین (PT) باید دو روز پس از آخرین دوز بررسی شود.",
                    threatTitle: "خطر:",
                    threatContent: "گربه‌ها مقاوم‌تر از سگ‌ها هستند. دوز سمی بین مواد موثره بسیار متفاوت است؛ برخی برای کشنده بودن به مقدار بسیار کمی نیاز دارند (مانند برودیفاکوم). حیوانات مبتلا به بیماری کبدی، حیوانات بسیار جوان یا بسیار پیر در معرض خطر بیشتری هستند."
                },
                cholecalciferol: {
                    title: "کلکلسیفرول (ویتامین D3)",
                    main: "برای سگ‌ها و گربه‌ها، این یکی از خطرناک‌ترین جونده‌کش‌های موجود در بازار است و به دلیل محدودیت‌های EPA بر روی ضدانعقادهای نسل دوم، محبوبیت بیشتری پیدا کرده است.",
                    mechanismTitle: "مکانیسم عمل:",
                    mechanismContent: "این سم باعث هایپرکلسمی و هایپرفسفاتمی می‌شود که منجر به نارسایی حاد کلیه و آسیب بافتی دیگر به دلیل کانی‌سازی متاستاتیک می‌گردد.",
                    signsTitle: "علائم رایج:",
                    signsContent: "پلی‌اوری/پلی‌دیپسی، ضعف، بی‌حالی، کاهش اشتها و هالیتوز (بوی اورمیک). نارسایی حاد کلیه ۲-۳ روز پس از مصرف ایجاد می‌شود که اغلب در این مرحله آسیب قابل توجه و دائمی قبلاً رخ داده است.",
                    treatmentTitle: "پادزهر و درمان:",
                    treatmentContent: "درمان این مسمومیت چالش‌برانگیز است و اغلب نیاز به بستری شدن و درمان گران‌قیمت دارد. پادزهر خاصی وجود ندارد. درمان شامل مایع‌درمانی تهاجمی وریدی و داروهایی (دیورتیک‌ها، استروئیدها، بیس‌فسفونات‌ها) برای کاهش غلظت کلسیم است. پایش مکرر آزمایش خون برای ۲-۶ هفته لازم است.",
                    threatTitle: "خطر:",
                    threatContent: "کلکلسیفرول حاشیه ایمنی بسیار باریکی دارد. حتی مقادیر کم مصرفی می‌تواند باعث علائم بالینی شدید یا مرگ شود. مصرف سمی باید به سرعت درمان شود تا از نارسایی کلیه جلوگیری شود."
                },
                bromethalin: {
                    title: "برومتالین",
                    main: "این جونده‌کش نوروتوکسیک باعث ادم مغزی می‌شود. نام آن به راحتی با ضدانعقادهای دیرپا مانند برودیفاکوم اشتباه گرفته می‌شود.",
                    mechanismTitle: "مکانیسم عمل:",
                    mechanismContent: "برومتالین با جدا کردن فسفوریلاسیون اکسیداتیو در میتوکندری مغز و کبد عمل می‌کند که می‌تواند منجر به ادم مغزی شود.",
                    signsTitle: "علائم رایج:",
                    signsContent: "عدم هماهنگی (آتاکسی)، لرزش، تشنج، فلجی و در نهایت مرگ. علائم می‌توانند ظرف ۲ ساعت ظاهر شوند یا بسته به دوز، ۳-۴ روز به تأخیر بیفتند. نظارت پزشکی برای حداقل ۲۴ ساعت اغلب ضروری است.",
                    treatmentTitle: "پادزهر و درمان:",
                    treatmentContent: "مراقبت در بیمارستان برای چند روز ممکن است به دلیل نیمه‌عمر طولانی سم ضروری باشد. درمان ممکن است شامل دوزهای متعدد زغال فعال، مایعات وریدی و داروهای خاص برای کاهش تورم مغز باشد.",
                    threatTitle: "خطر:",
                    threatContent: "گربه‌ها به برومتالین حساس‌تر از سگ‌ها هستند. از آنجایی که این نوع جونده‌کش حاشیه ایمنی باریکی دارد، درمان سریع اغلب در همه گونه‌ها لازم است."
                }
            }
        },
        xylitol: {
            aboutTitle: "درباره مسمومیت با زایلیتول",
            aboutContent: "هیپوگلیسمی می‌تواند ظرف ۳۰ دقیقه پس از مصرف محصولات حاوی زایلیتول رخ دهد. علائم ممکن است شامل بی‌اشتهایی، استفراغ، اسهال، بی‌حالی، آتاکسی، بی‌قراری، کلاپس، تشنج و کما باشد. سگ‌های درگیر کبدی ممکن است قبل از بروز علائم بالینی نارسایی کبدی، علائم هیپوگلیسمی را نشان دهند یا ندهند. علائم آسیب کبدی (زردی، استفراغ، اسهال، درد شکم) ممکن است ظرف ۱۲-۷۲ ساعت پس از مواجهه رخ دهد. شواهد عوارض شدید دیگر (کوآگولوپاتی، انسفالوپاتی کبدی) نیز می‌تواند ایجاد شود.",
            section1Title: "حجم (میلی‌گرم یا گرم) در هر واحد/سروینگ",
            mgPerServing: "میلی‌گرم در هر سروینگ",
            gramsPerServing: "گرم در هر سروینگ",
            section2Title: "تعداد واحد/سروینگ مصرفی",
            servingsIngested: "تعداد سروینگ یا واحد مصرفی",
            section3Title: "نتایج میلی‌گرم/کیلوگرم",
            resultsTitle: "مسمومیت با زایلیتول",
            riskHypoglycemia: "مصرف دوزهای > ۰.۱ گرم/کیلوگرم (۱۰۰ میلی‌گرم/کیلوگرم) در معرض خطر ابتلا به هیپوگلیسمی قرار دارند.",
            riskLiverFailure: "مصرف > ۰.۵ گرم/کیلوگرم (۵۰۰ میلی‌گرم/کیلوگرم) ممکن است باعث نارسایی حاد کبدی با یا بدون هیپوگلیسمی شود.",
            signsTitle: "علائم گاهی شامل:",
            signsContent: "بی‌قراری، بیش‌فعالی و احتمالاً آبریزش دهان",
            infoModal: {
                title: "درباره حجم و واحدهای زایلیتول",
                p1: "محصولات حاوی زایلیتول حجم (به گرم یا میلی‌گرم) در هر سروینگ را به دو روش ذکر می‌کنند:",
                l1Title: "۱. فقط به عنوان زایلیتول",
                l1Content: "از مقدار زایلیتول در بخش کربوهیدرات‌های کل استفاده کنید. (مقدار ۰.۹ گرم یا ۹۰۰ میلی‌گرم زایلیتول در هر سروینگ در تصویر زیر) هنگام وارد کردن حجم مصرفی.",
                l2Title: "۲. به عنوان الکل‌های قندی",
                l2Content1: "الکل‌های قندی شامل زایلیتول و سایر الکل‌های قندی مرتبط (مانند سوربیتول) می‌شوند.",
                l2Content2: "اگر زایلیتول در لیست مواد تشکیل‌دهنده اول ذکر شده باشد، از حجم کل الکل‌های قندی در محاسبه خود استفاده کنید.",
                l2Content3: "اگر زایلیتول دوم ذکر شده باشد، حجم کل الکل قندی را بر ۲ تقسیم کنید تا تخمین تقریبی از حجم زایلیتول به دست آید (در تصویر زیر، ۱ گرم ÷ ۲ = ۵۰۰ میلی‌گرم زایلیتول در هر سروینگ).",
                close: "بستن"
            }
        },
        plants: {
            title: "گیاهان سمی",
            searchPlaceholder: "جستجوی گیاهان...",
            intro: "لیست گیاهان سمی زیر را بر اساس نام یا نام رایج جستجو کنید. آیکون‌ها نشان می‌دهند که آیا گیاه <strong>سمی</strong> {toxicIcon} است یا <strong>غیر سمی</strong> {nonToxicIcon} در <strong>سگ‌ها</strong> {dogIcon} یا <strong>گربه‌ها</strong> {catIcon}. هر گیاه لیست شده به صفحه گیاهان سمی ASPCA پیوند دارد.",
            legendTitle: "لیست گیاهان سمی",
            commonNames: "نام‌های رایج",
            scientificName: "نام‌های علمی",
            family: "خانواده"
        }
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
    },
    protocols: {
      canineVaccination: {
          title: "پروتکل واکسیناسیون توله‌سگ‌ها",
          description: "راهنمای جامع اصول و برنامه‌های واکسیناسیون مدرن سگ‌سانان برای توله‌سگ‌ها."
      },
      felineLeukemia: {
          title: "درمان ویروس لوسمی گربه‌سانان (FeLV)",
          description: "پروتکل دقیق برای مدیریت FeLV در گربه‌ها، شامل دارودرمانی و مراقبت‌های حمایتی."
      },
      canineParvovirus: {
          title: "درمان پاروویروس سگ‌سانان",
          description: "پروتکل مراقبت‌های ویژه برای درمان پاروویروس در سگ‌ها، با تمرکز بر هیدراتاسیون و مدیریت علائم."
      },
      felineURI: {
          title: "پروتکل عفونت دستگاه تنفسی فوقانی گربه‌سانان (URI)",
          description: "دستورالعمل‌های درمانی برای مدیریت URI در گربه‌ها، شامل آنتی‌بیوتیک‌ها و مراقبت‌های حمایتی."
      }
    },
    canineVaccinationContent: {
      coreVaccinesTitle: "واکسن‌های اصلی (Core)",
      coreVaccinesDesc: "واکسن‌های اصلی برای تمام توله‌سگ‌ها و سگ‌هایی با سابقه واکسیناسیون نامشخص توصیه می‌شود. این واکسن‌ها در برابر بیماری‌هایی محافظت ایجاد می‌کنند که شایع هستند، میزان ابتلا و مرگ‌ومیر بالایی دارند و برای بهداشت عمومی خطرناک محسوب می‌شوند.",
      cdvName: "ویروس دیستمپر سگ‌سانان (CDV)",
      cdvDesc: "یک بیماری ویروسی شدید و بسیار مسری که سیستم تنفسی، گوارشی و عصبی را تحت تأثیر قرار می‌دهد.",
      cav2Name: "آدنوویروس-۲ سگ‌سانان (CAV-2)",
      cav2Desc: "در برابر هپاتیت عفونی سگ‌سانان (ناشی از CAV-1) محافظت می‌کند و یکی از اجزای کمپلکس سرفه کنل است.",
      cpv2Name: "پاروویروس سگ‌سانان (CPV-2)",
      cpv2Desc: "یک بیماری ویروسی بسیار مسری و اغلب کشنده که باعث استفراغ و اسهال شدید، به ویژه در توله‌سگ‌ها می‌شود.",
      rabiesName: "ویروس هاری",
      rabiesDesc: "یک بیماری ویروسی کشنده سیستم عصبی که می‌تواند تمام پستانداران، از جمله انسان را مبتلا کند. واکسیناسیون در اکثر مناطق از نظر قانونی الزامی است.",
      puppyScheduleTitle: "برنامه واکسیناسیون توله‌سگ",
      puppyScheduleDesc: "این یک راهنمای کلی است. دامپزشک شما بر اساس عوامل خطر فردی توله‌سگ و موقعیت جغرافیایی شما، یک پروتکل خاص را تنظیم خواهد کرد.",
      tableHeaderAge: "سن",
      tableHeaderRecs: "واکسن‌های توصیه‌شده",
      scheduleRow1Age: "۶-۸ هفتگی",
      scheduleRow1Recs: "DHPP (دیستمپر، هپاتیت، پاراآنفلوآنزا، پاروویروس) - دوز اول",
      scheduleRow2Age: "۱۰-۱۲ هفتگی",
      scheduleRow2Recs: "DHPP - دوز دوم. اختیاری: لپتوسپیروز، بوردتلا، آنفلوآنزای سگ‌سانان بر اساس ریسک.",
      scheduleRow3Age: "۱۴-16 هفتگی",
      scheduleRow3Recs: "DHPP - دوز سوم (آخرین دوز تولگی). هاری (طبق الزامات قانونی، اغلب حدود ۱۶ هفتگی). اختیاری: یادآورهای لپتوسپیروز، بوردتلا، آنفلوآنزای سگ‌سانان.",
      boostersTitle: "واکسن‌های یادآور پس از تولگی",
      boostersDesc: "پس از سری اولیه واکسن‌های تولگی، برای حفظ ایمنی به دوزهای یادآور نیاز است.",
      boosterPoint1: "<strong>۱ سالگی:</strong> یک دوز یادآور DHPP و هاری معمولاً یک سال پس از آخرین واکسن تولگی تزریق می‌شود.",
      boosterPoint2: "<strong>سگ‌های بالغ (پس از یادآور ۱ سالگی):</strong> واکسن هاری معمولاً هر ۱ تا ۳ سال، بسته به برچسب واکسن و قوانین محلی، تکرار می‌شود. DHPP اغلب هر ۳ سال تکرار می‌شود. سایر واکسن‌های غیراصلی ممکن است به یادآورهای سالانه نیاز داشته باشند."
    },
    toast: {
        profile: {
            updated: "پروفایل با موفقیت به‌روزرسانی شد!",
            created: "پروفایل با موفقیت ایجاد شد!",
            deleted: "پروفایل حذف شد."
        },
        medication: {
            added: "دارو اضافه شد.",
            updated: "دارو به‌روزرسانی شد.",
            deleted: "دارو حذف شد."
        },
        protocol: {
            saved: "پروتکل با موفقیت ذخیره شد!"
        },
        error: {
            requiredFields: "لطفاً تمام فیلدهای الزامی را پر کنید."
        }
    },
    provinces: {
      "alborz": "البرز",
      "ardabil": "اردبیل",
      "bushehr": "بوشهر",
      "chaharmahal_bakhtiari": "چهارمحال و بختیاری",
      "east_azerbaijan": "آذربایجان شرقی",
      "fars": "فارس",
      "gilan": "گیلان",
      "golestan": "گلستان",
      "hamadan": "همدان",
      "hormozgan": "هرمزگان",
      "ilam": "ایلام",
      "isfahan": "اصفهان",
      "kerman": "کرمان",
      "kermanshah": "کرمانشاه",
      "khuzestan": "خوزستان",
      "kohgiluyeh_boyer_ahmad": "کهگیلویه و بویراحمد",
      "kurdistan": "کردستان",
      "lorestan": "لرستان",
      "markazi": "مرکزی",
      "mazandaran": "مازندران",
      "north_khorasan": "خراسان شمالی",
      "qazvin": "قزوین",
      "qom": "قم",
      "razavi_khorasan": "خراسان رضوی",
      "semnan": "سمنان",
      "sistan_baluchestan": "سیستان و بلوچستان",
      "south_khorasan": "خراسان جنوبی",
      "tehran": "تهران",
      "west_azerbaijan": "آذربایجان غربی",
      "yazd": "یزد",
      "zanjan": "زنجان"
    },
  }
};