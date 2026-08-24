import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Specialties } from "@/components/site/Specialties";
import { Benefits } from "@/components/site/Benefits";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Credentials } from "@/components/site/Credentials";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { ScheduleForm, FinalCta } from "@/components/site/ScheduleForm";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Specialties />
        <Benefits />
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
