import Navigation from "@/components/layout/navbar"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import StatsSection from "@/components/sections/stats-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      {/* <CTASection /> */}
      <Footer />
    </main>
  )
}
