import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-3 text-[var(--primary-600)] dark:text-[var(--primary-300)] border-b-2 border-[var(--primary-200)] dark:border-[var(--primary-800)] pb-2">
      {title}
    </h2>
    <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
  </section>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{title}</h3>
    {children}
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="ml-5 list-disc">{children}</li>
);

export const CanineVaccinationContent: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-full text-left" dir="ltr">
      <Section title="1: The Immunological Foundation">
        <p>
          Vaccination is a cornerstone of canine preventive healthcare. It works by inducing active immunity, preparing the body to neutralize pathogens without the animal suffering the initial illness.
        </p>
        <SubSection title="The Challenge: Maternally Derived Antibodies (MDAs)">
          <p>
            Puppies receive temporary immunity from their mother's milk (colostrum). These maternal antibodies, while protective, can interfere with vaccines. This creates a "window of susceptibility" where MDAs are too low to protect from infection but high enough to block a vaccine.
          </p>
          <p>
            The puppy vaccination series is a strategic race against declining MDAs. By giving vaccines every 2-4 weeks, we increase the chance of one being effective as MDAs wane. <strong>This is why the final dose must be given at or after 16 weeks of age.</strong>
          </p>
        </SubSection>
        <SubSection title="Core vs. Non-Core Vaccines">
            <p>Modern vaccination is tailored to the individual dog.</p>
            <ul>
                <ListItem><strong>Core Vaccines:</strong> Recommended for ALL dogs. They protect against severe, life-threatening, global diseases.</ListItem>
                <ListItem><strong>Non-Core (Lifestyle) Vaccines:</strong> Recommended for some dogs based on their risk of exposure (e.g., location, social habits like daycare).</ListItem>
            </ul>
        </SubSection>
      </Section>

      <Section title="2: Core Vaccines: Universal Protection">
        <SubSection title="Combination Vaccine (DAPP/DHPP)">
            <p>This single injection protects against three major viruses:</p>
            <ul>
                <ListItem><strong>Canine Distemper (D):</strong> A highly contagious virus attacking the respiratory, GI, and nervous systems. Often fatal.</ListItem>
                <ListItem><strong>Canine Adenovirus (A/H):</strong> Protects against infectious canine hepatitis (a severe liver disease) and a respiratory illness.</ListItem>
                <ListItem><strong>Canine Parvovirus (P):</strong> An extremely contagious and resilient virus causing severe, often bloody, vomiting and diarrhea. It is a leading cause of death in young, unvaccinated puppies.</ListItem>
            </ul>
        </SubSection>
        <SubSection title="Rabies Virus">
            <p>
                A 100% fatal disease for animals and humans once symptoms appear. Rabies vaccination is a <strong>legal requirement</strong> in most regions to protect public health by creating a buffer between wildlife and humans.
            </p>
        </SubSection>
      </Section>

      <Section title="3: Non-Core Vaccines: Lifestyle Protection">
        <SubSection title="Leptospirosis">
             <p>A bacterial disease spread by infected animal urine in water/soil, causing kidney/liver failure. It is zoonotic (transmissible to humans). Risk is high for dogs that swim in natural water or are exposed to wildlife. It is now considered "emerging core" and recommended for most dogs.</p>
        </SubSection>
         <SubSection title="Lyme Disease">
             <p>A tick-borne bacterial disease causing fever, lameness, and potential kidney failure. Risk is highest in tick-endemic areas. Vaccination is an extra layer of protection and does not replace the need for effective tick control products.</p>
        </SubSection>
        <SubSection title="Canine Infectious Respiratory Disease (CIRD) / 'Kennel Cough'">
             <p>A highly contagious respiratory syndrome caused mainly by Bordetella bacteria and parainfluenza virus. Risk is high wherever dogs congregate (daycare, kennels, groomers). Intranasal/oral vaccines provide faster local immunity.</p>
        </SubSection>
      </Section>
      
      <Section title="4: The Puppy Vaccination Schedule">
        <SubSection title="Initial Vaccination Series (Puppies ≤ 16 Weeks)">
            <ul>
                <ListItem><strong>Starting Age:</strong> First DAPP/DHPP dose at 6-8 weeks of age.</ListItem>
                <ListItem><strong>Booster Interval:</strong> Repeat every 2-4 weeks.</ListItem>
                <ListItem><strong>Crucial Final Dose:</strong> The final dose of the series MUST be given at 16 weeks of age or older.</ListItem>
                <ListItem><strong>Rabies:</strong> A single dose between 12-16 weeks of age, as required by law.</ListItem>
            </ul>
        </SubSection>
        <SubSection title="The First Adult Booster (6-12 Months)">
            <p>A booster dose is given between 6 and 12 months after the puppy series. This is a critical failsafe to ensure full immunity for any puppy that didn't respond to the initial series.</p>
        </SubSection>
      </Section>

      <Section title="5: Long-Term Adult Revaccination">
        <SubSection title="Core Vaccines (DAPP/DHPP)">
            <p>After the first adult booster, core vaccines provide long-lasting immunity. Revaccination is recommended <strong>every 3 years</strong>. This is the standard of care.</p>
        </SubSection>
        <SubSection title="Non-Core Vaccines">
            <p>Most non-core vaccines provide immunity for about one year. Dogs at continued risk require <strong>annual revaccination</strong>.</p>
        </SubSection>
      </Section>

      <Section title="6: Vaccine Safety and Monitoring">
        <SubSection title="Common & Mild Reactions (Normal)">
            <p>It's normal for puppies to be tired, have a mild fever, or reduced appetite for 24-72 hours post-vaccination. Mild soreness or a small, non-painful lump at the injection site is also common.</p>
        </SubSection>
        <SubSection title="Rare but Serious Reactions (Emergency)">
            <p>Seek IMMEDIATE veterinary care for:</p>
            <ul>
                <ListItem>Facial swelling (muzzle, eyes)</ListItem>
                <ListItem>Hives (itchy bumps on body)</ListItem>
                <ListItem>Persistent vomiting or diarrhea</ListItem>
                <ListItem>Difficulty breathing or collapse</ListItem>
            </ul>
        </SubSection>
      </Section>
    </div>
  );
};
