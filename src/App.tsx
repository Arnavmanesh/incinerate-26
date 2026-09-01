import { useState } from "react";
import Loader from "./Loader";
// import Navbar from "./Navbar";
import Navbar from "./Nav.jsx";
import Hero from "./Hero";
import PrizePool from "./PrizePool";
import Partners from "./Partners.jsx";
import About from "./About";
import Timeline from "./Timeline";
import FAQs from "./FAQs";
import BackgroundCanvas from "./BackgroundCanvas";
import Footer from "./Footer"
import Organizer from "./Organisers.jsx"
import HowToApply from "./HowToApply.jsx"
import Aboutinc from "./AboutIncinerate.jsx"

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <div className="glow-orb one"></div>
      <div className="glow-orb two"></div>
      <BackgroundCanvas />

      <main className="incinerate-shell">
        <Navbar />
        <Hero />
        <Aboutinc />
        <Organizer />
        <PrizePool />
        <Timeline />
        <HowToApply />
        <Partners />
        <FAQs />
        <Footer />
      </main>
    </>
  );
}