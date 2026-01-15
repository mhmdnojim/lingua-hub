import { useState, useCallback, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlashcardView } from "@/components/hanzi-flip/FlashcardView";
import { CompactToolbar } from "@/components/hanzi-flip/CompactToolbar";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useAudio } from "@/hooks/useAudio";
import { useStudySession } from "@/hooks/useStudySession";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { parseExcelFile } from "@/utils/excelParser";
import { useToast } from "@/hooks/use-toast";

interface HanziFlipProps {
  onBack: () => void;
}

const HanziFlip = ({ onBack }: HanziFlipProps) => {
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showChineseFirst, setShowChineseFirst] = useState(true);
  const [fontSize, setFontSize] = useState(72);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const vocabulary = useVocabulary();
  const audio = useAudio();

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    audio.playSoundEffect("flip");
  }, [audio]);

  const [nextDelay, setNextDelay] = useState(3);
  const [languageGap, setLanguageGap] = useState(1.5);

  const studySession = useStudySession({
    totalWords: vocabulary.words.length,
    onFlip: handleFlip,
    speakChinese: audio.speakChinese,
    speakEnglish: audio.speakEnglish,
    getWordAtIndex: useCallback(
      (index: number) => vocabulary.words[index] || null,
      [vocabulary.words]
    ),
    isFlipped,
    languageGap,
    nextDelay,
  });

  const activeWord = vocabulary.words[studySession.currentIndex];

  const handleNext = useCallback(() => {
    studySession.goToNext();
    setIsFlipped(false);
    audio.playSoundEffect("navigate");
  }, [studySession, audio]);

  const handlePrevious = useCallback(() => {
    studySession.goToPrevious();
    setIsFlipped(false);
    audio.playSoundEffect("navigate");
  }, [studySession, audio]);

  const handleCorrect = useCallback(() => {
    if (activeWord) {
      vocabulary.markCorrect(activeWord.id);
      audio.playSoundEffect("correct");
      toast({ title: "Correct! 🎉", duration: 1000 });
    }
  }, [activeWord, vocabulary, audio, toast]);

  const handleIncorrect = useCallback(() => {
    if (activeWord) {
      vocabulary.markIncorrect(activeWord.id);
      audio.playSoundEffect("incorrect");
      toast({ title: "Keep practicing! 💪", duration: 1000 });
    }
  }, [activeWord, vocabulary, audio, toast]);

  const handleShuffle = useCallback(() => {
    vocabulary.shuffleWords();
    studySession.goToIndex(0);
    setIsFlipped(false);
    toast({ title: "Deck shuffled!", duration: 1500 });
  }, [vocabulary, studySession, toast]);

  const handleImport = useCallback(
    async (file: File) => {
      const result = await parseExcelFile(file);
      if (result.success) {
        vocabulary.addDeck(result.filename || "Imported Deck", result.words);
        toast({
          title: "Import successful!",
          description: `Added ${result.words.length} words`,
        });
      } else {
        toast({
          title: "Import failed",
          description: result.error,
          variant: "destructive",
        });
      }
    },
    [vocabulary, toast]
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useKeyboardShortcuts({
    onFlip: handleFlip,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onCorrect: handleCorrect,
    onIncorrect: handleIncorrect,
    onShuffle: handleShuffle,
  });

  const favoritesCount = vocabulary.words.filter((w) => w.favorite).length;
  const correctCount = vocabulary.words.filter((w) => (w.correctCount || 0) > 0).length;
  const incorrectCount = vocabulary.words.filter((w) => (w.incorrectCount || 0) > 0).length;

  if (!activeWord) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">No vocabulary loaded</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <div className="w-full max-w-[95vw] xl:max-w-[90vw] mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col flex-1">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 w-fit text-hanzi-flip hover:bg-hanzi-flip/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Programs
        </Button>

        {/* Compact Toolbar */}
        <CompactToolbar
          deckName={vocabulary.currentDeck.name}
          decks={vocabulary.decks}
          currentDeckId={vocabulary.currentDeckId}
          onDeckChange={vocabulary.setCurrentDeckId}
          onImport={handleImport}
          showPinyin={showPinyin}
          onTogglePinyin={() => setShowPinyin(!showPinyin)}
          showChineseFirst={showChineseFirst}
          onResetFlip={() => setIsFlipped(false)}
          onToggleChineseFirst={() => setShowChineseFirst(!showChineseFirst)}
          voiceType={audio.voiceType}
          onVoiceTypeChange={audio.setVoiceType}
          voiceMuted={audio.voiceMuted}
          onToggleVoiceMuted={() => audio.setVoiceMuted(!audio.voiceMuted)}
          sfxMuted={audio.sfxMuted}
          onToggleSfxMuted={() => audio.setSfxMuted(!audio.sfxMuted)}
          isShuffled={vocabulary.isShuffled}
          onShuffle={handleShuffle}
          onResetOrder={vocabulary.resetOrder}
          onResetProgress={vocabulary.resetProgress}
        />

        {/* Flashcard View */}
        <div className="flex-1 mt-2 sm:mt-4">
          <FlashcardView
            word={activeWord}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onToggleFavorite={() => vocabulary.toggleFavorite(activeWord.id)}
            showPinyin={showPinyin}
            showChineseFirst={showChineseFirst}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            onSpeakChinese={() => audio.speakChinese(activeWord.chinese)}
            onSpeakEnglish={() => audio.speakEnglish(activeWord.english)}
            autoplayMode={studySession.autoplayMode}
            onAutoplayModeChange={studySession.setAutoplayMode}
            isAutoplayActive={studySession.isAutoplayActive}
            autoplayRepeatCount={studySession.autoplayRepeatCount}
            onAutoplayRepeatCountChange={studySession.setAutoplayRepeatCount}
            isAutoplayRepeating={studySession.isAutoplayRepeating}
            onToggleAutoplayRepeat={studySession.toggleAutoplayRepeat}
            repeatMode={studySession.repeatMode}
            onRepeatModeChange={studySession.setRepeatMode}
            isRepeatActive={studySession.isRepeatActive}
            displayMode={studySession.displayMode}
            currentlySpoken={studySession.currentlySpoken}
            currentIndex={studySession.currentIndex}
            totalWords={vocabulary.words.length}
            percentage={studySession.completionPercentage}
            onSeek={studySession.goToIndex}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            favoritesCount={favoritesCount}
            elapsedTime={studySession.formattedTime}
            completionPercentage={studySession.completionPercentage}
            nextDelay={nextDelay}
            onNextDelayChange={setNextDelay}
            languageGap={languageGap}
            onLanguageGapChange={setLanguageGap}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        </div>
      </div>
    </div>
  );
};

export default HanziFlip;
