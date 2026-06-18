import { Navbar } from '../components/Navbar';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
