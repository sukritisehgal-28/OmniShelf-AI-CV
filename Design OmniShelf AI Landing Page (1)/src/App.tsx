import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { HowItWorks } from "./components/HowItWorks";
import { LoginSection } from "./components/LoginSection";
import { Footer } from "./components/Footer";
import { SmartCartAssistant } from "./components/SmartCartAssistant";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render SmartCart page
  if (currentPage === "smartcart") {
    return <SmartCartAssistant onNavigate={handleNavigate} />;
  }

  // Default landing page
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navigation onNavigate={handleNavigate} />
      <HeroSection />
      <FeatureHighlights />
      <HowItWorks />
      <LoginSection onNavigate={handleNavigate} />
      <Footer />
    </div>
  );
}