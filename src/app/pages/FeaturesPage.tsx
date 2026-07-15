import { Navbar } from '../components/Navbar';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36">
        <Features />
      </main>
      <Footer />
    </div>
  );
}
