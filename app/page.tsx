import SimpleBackground from '../components/SimpleBackground';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';
import ProjectsContent from '../components/ProjectsContent';
import SkillsContent from '../components/SkillsContent';
import ContactContent from '../components/ContactContent';
import WarningMessage from '../components/WarningMessage';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#13071D]">
      <SimpleBackground />
      <WarningMessage />
      <Header />
      <Hero />
      <About />
      <ProjectsContent />
      <SkillsContent />
      <ContactContent />
      <Footer />
    </main>
  );
}
