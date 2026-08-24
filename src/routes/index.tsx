import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { About } from "@/components/site/About";
import { Specialties } from "@/components/site/Specialties";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Credentials } from "@/components/site/Credentials";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { ScheduleForm } from "@/components/site/ScheduleForm";
import { FinalCta } from "@/components/site/CtaFinal";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-paper text-earth">
      <Header />
      <main id="top">
        <Hero />
        <Statement />
        <About />
        <Specialties />
        <HowItWorks />
        <Credentials />
        <Testimonials />
        <Faq />
        <ScheduleForm />
        <FinalCta />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
