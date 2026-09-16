import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { PrimaryServiceSection } from './sections/PrimaryServiceSection';
import { WhatWeBuildSection } from './sections/WhatWeBuildSection';
import { CreativeSupportSection } from './sections/CreativeSupportSection';
import { WhyKeagrowSection } from './sections/WhyKeagrowSection';
import { ProcessSection } from './sections/ProcessSection';
import { SelectedWorkSection } from './sections/SelectedWorkSection';
import { TechnologiesSection } from './sections/TechnologiesSection';
import { TeamSection } from './sections/TeamSection';
import { CtaSection } from './sections/CtaSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080b11] text-[#e2e8f0] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About KEAGROW */}
        <AboutSection />

        {/* 3. Primary Core Service: Website Development */}
        <PrimaryServiceSection />

        {/* 4. What We Build (Categories 01, 02, 03) */}
        <WhatWeBuildSection />

        {/* 5. Additional Creative Support */}
        <CreativeSupportSection />

        {/* 6. Why KEAGROW? (5 Principles) */}
        <WhyKeagrowSection />

        {/* 7. From Idea → Reality (6 Stages) */}
        <ProcessSection />

        {/* 8. Selected Work (Royal Snacks, Namma Ooru Workers, Showcase Projects + Case Studies) */}
        <SelectedWorkSection />

        {/* 9. Technologies We Work With */}
        <TechnologiesSection />

        {/* 10. Meet the Team (Aravinth, Ezrajid, Kanagavel) */}
        <TeamSection />

        {/* 11. High-Impact CTA */}
        <CtaSection />

        {/* 12. Contact Form & Channel Placeholders */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
