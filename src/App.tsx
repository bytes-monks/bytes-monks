import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Sponsors from './components/Sponsors';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceLines from './components/ServiceLines';
import Seo from './components/Seo';

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Seo path="/" />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Sponsors />
        <ServiceLines />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
