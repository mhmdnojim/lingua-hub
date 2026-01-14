import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinguaMatchProps {
  onBack: () => void;
}

const LinguaMatch = ({ onBack }: LinguaMatchProps) => {
  return (
    <div className="min-h-screen bg-lingua-match-light">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 text-lingua-match hover:bg-lingua-match/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 gradient-match rounded-3xl mb-6 shadow-glow-match">
            <span className="text-5xl">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Lingua Match</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Match words and phrases to build your vocabulary through engaging games.
          </p>
          
          <div className="bg-card rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              🚀 Lingua Match program coming soon! This will feature vocabulary matching games to help you learn new words.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinguaMatch;
