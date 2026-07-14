import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Team from "@/components/Team";
import TechStack from "@/components/TechStack";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Team />
        <TechStack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
