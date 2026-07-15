import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FoundingPartners } from '../components/FoundingPartners';
import { TrustedBy } from '../components/TrustedBy';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { AboutUs } from '../components/AboutUs';
import { Community } from '../components/Community';
import { CTA } from '../components/CTA';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <Hero />
      <FoundingPartners />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <AboutUs />
      <Community />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}


