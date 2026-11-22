import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useRouter, isAppRoute } from '@/hooks/useRouter';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import LegalPage from '@/components/legal/LegalPage';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import FaqSection from '@/components/sections/FaqSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import VisionSection from '@/components/sections/VisionSection';
import WaitlistSection from '@/components/sections/WaitlistSection';
import AuthPage from '@/components/dashboard/AuthPage';
import DashboardApp from '@/components/dashboard/DashboardApp';
import { useHash } from '@/hooks/useHash';
import { PRIVACY_POLICY, TERMS_OF_SERVICE, type LegalDocument } from '@/data/legal';

const LEGAL_PAGES: Record<string, LegalDocument> = {
  '#privacy': PRIVACY_POLICY,
  '#terms': TERMS_OF_SERVICE,
};

function MarketingSite() {
  const hash = useHash();
  const legalDocument = LEGAL_PAGES[hash];

  useEffect(() => {
    if (legalDocument) {
      window.scrollTo({ top: 0 });
      return;
    }
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    target?.scrollIntoView();
  }, [hash, legalDocument]);

  return (
    <div className="min-h-screen bg-ink-50 font-sans">
      <Navbar />
      <main>
        {legalDocument ? (
          <LegalPage document={legalDocument} />
        ) : (
          <>
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <CapabilitiesSection />
            <HowItWorksSection />
            <VisionSection />
            <WaitlistSection />
            <FaqSection />
            <FinalCtaSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function DashboardGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) return <AuthPage />;
  return <DashboardApp />;
}

function AppRoutes() {
  const { route } = useRouter();

  if (isAppRoute()) {
    if (route.path === 'settings') return <DashboardGate />;
    return <DashboardGate />;
  }

  return <MarketingSite />;
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
