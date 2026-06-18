import { Navbar } from '../components/Navbar';
import { AboutUs } from '../components/AboutUs';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
