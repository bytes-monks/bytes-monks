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
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Sponsors />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;
