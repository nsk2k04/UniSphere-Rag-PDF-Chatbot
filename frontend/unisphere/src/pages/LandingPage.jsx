import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/landing/Hero.jsx'
import Features from '../components/landing/Features.jsx'
import Stats from '../components/landing/Stats.jsx'
import Testimonials from '../components/landing/Testimonials.jsx'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
