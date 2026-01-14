import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HanziFlipProps {
  onBack: () => void;
}

const HanziFlip = ({ onBack }: HanziFlipProps) => {
  return (
    <div className="min-h-screen bg-hanzi-flip-light">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 text-hanzi-flip hover:bg-hanzi-flip/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 gradient-flip rounded-3xl mb-6 shadow-glow-flip">
            <span className="text-5xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Hanzi Flip</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Master Chinese characters with interactive flashcards and spaced repetition.
          </p>
          
          <div className="bg-card rounded-2xl shadow-card p-8 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              🚀 Hanzi Flip program coming soon! Practice Chinese characters with smart flashcards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanziFlip;
