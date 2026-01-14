import { useState } from "react";
import ProgramCard from "@/components/ProgramCard";
import LinguaMatch from "@/components/programs/LinguaMatch";
import HanziFlip from "@/components/programs/HanziFlip";
import LinguaLift from "@/components/programs/LinguaLift";

type Program = "home" | "lingua-match" | "hanzi-flip" | "lingua-lift";

const Index = () => {
  const [activeProgram, setActiveProgram] = useState<Program>("home");

  if (activeProgram === "lingua-match") {
    return <LinguaMatch onBack={() => setActiveProgram("home")} />;
  }

  if (activeProgram === "hanzi-flip") {
    return <HanziFlip onBack={() => setActiveProgram("home")} />;
  }

  if (activeProgram === "lingua-lift") {
    return <LinguaLift onBack={() => setActiveProgram("home")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="animate-pulse-soft">✨</span>
              Language Learning Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Master Languages
              <span className="block gradient-hero bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose from three powerful programs designed to make language learning fun, 
              effective, and personalized to your goals.
            </p>
          </div>
        </div>
      </header>

      {/* Programs Grid */}
      <main className="container mx-auto px-4 pb-20 -mt-4">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <ProgramCard
              title="Lingua Match"
              description="Match words and phrases to build your vocabulary through engaging games."
              icon="🎯"
              variant="match"
              onClick={() => setActiveProgram("lingua-match")}
            />
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <ProgramCard
              title="Hanzi Flip"
              description="Master Chinese characters with interactive flashcards and spaced repetition."
              icon="📚"
              variant="flip"
              onClick={() => setActiveProgram("hanzi-flip")}
            />
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <ProgramCard
              title="Lingua Lift"
              description="Level up your language skills with structured lessons and progress tracking."
              icon="🚀"
              variant="lift"
              onClick={() => setActiveProgram("lingua-lift")}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Our Programs?</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-semibold text-foreground">Gamified</h3>
              <p className="text-sm text-muted-foreground">Learn through play</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-foreground">Track Progress</h3>
              <p className="text-sm text-muted-foreground">See your growth</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground">Personalized</h3>
              <p className="text-sm text-muted-foreground">Tailored to you</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
