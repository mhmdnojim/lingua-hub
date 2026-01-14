import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinguaLiftProps {
  onBack: () => void;
}

const LinguaLift = ({ onBack }: LinguaLiftProps) => {
  return (
    <div className="min-h-screen bg-lingua-lift-light">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 text-lingua-lift hover:bg-lingua-lift/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 gradient-lift rounded-3xl mb-6 shadow-glow-lift">
            <span className="text-5xl">🚀</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Lingua Lift</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Level up your language skills with structured lessons and progress tracking.
          </p>
          
          <div className="bg-card rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              🚀 Lingua Lift program coming soon! Build your language skills step by step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinguaLift;
