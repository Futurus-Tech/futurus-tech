import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { CasesSection } from "@/components/sections/cases-section";
import { ClientsSection } from "@/components/sections/clients-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { PlansSection } from "@/components/sections/plans-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

/**
 * The landing page: one Server Component per section, in reading order.
 *
 * Nothing here is a Client Component. The interactive and animated parts are
 * small islands nested inside these sections, so the page ships as HTML with
 * only the motion code as JavaScript.
 */
export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader dict={dict} locale={lang} />

      <main className="font-body text-[16px]/[1.6]">
        <HeroSection content={dict.hero} />
        <MarqueeSection items={dict.marquee} />
        <StatsSection items={dict.stats} />
        <ServicesSection content={dict.services} />
        <ProcessSection content={dict.process} />
        <CasesSection content={dict.cases} />
        <ClientsSection content={dict.clients} />
        <TestimonialsSection content={dict.testimonials} />
        <PlansSection content={dict.plans} />
        <AboutSection content={dict.about} />
        <InsightsSection content={dict.insights} />
        <FaqSection content={dict.faq} />
        <ContactSection content={dict.contact} />
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
