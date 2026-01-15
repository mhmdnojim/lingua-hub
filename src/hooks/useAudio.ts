import { useState, useCallback, useRef } from "react";
import { VoiceType } from "@/types/vocabulary";

const SOUND_EFFECTS = {
  flip: "/sounds/flip.mp3",
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
  navigate: "/sounds/navigate.mp3",
};

export function useAudio() {
  const [voiceType, setVoiceType] = useState<VoiceType>("free");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playFreeTTS = useCallback(
    (text: string, lang: "zh-CN" | "en-US"): Promise<void> => {
      if (voiceMuted) return Promise.resolve();
      
      if (!window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = voiceSpeed;
        
        // Try to find a voice for the language
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
        if (voice) {
          utterance.voice = voice;
        }
        
        utterance.onend = () => {
          setIsPlaying(false);
          resolve();
        };
        utterance.onerror = (e) => {
          console.warn("Speech synthesis error:", e);
          setIsPlaying(false);
          resolve();
        };
        
        synthRef.current = utterance;
        setIsPlaying(true);
        
        // Small delay to ensure synthesis is ready
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 50);
      });
    },
    [voiceMuted, voiceSpeed]
  );

  const speak = useCallback(
    (text: string, lang: "zh-CN" | "en-US") => {
      return playFreeTTS(text, lang);
    },
    [playFreeTTS]
  );

  const speakChinese = useCallback(
    (text: string) => speak(text, "zh-CN"),
    [speak]
  );

  const speakEnglish = useCallback(
    (text: string) => speak(text, "en-US"),
    [speak]
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playSoundEffect = useCallback(
    (effect: keyof typeof SOUND_EFFECTS) => {
      if (sfxMuted) return;
      // Sound effects would be loaded from public folder
      // For now, using Web Audio API beeps as fallback
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const frequencies: Record<string, number> = {
        flip: 800,
        correct: 1200,
        incorrect: 300,
        navigate: 600,
      };
      
      oscillator.frequency.value = frequencies[effect] || 500;
      oscillator.type = "sine";
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);
    },
    [sfxMuted]
  );

  return {
    voiceType,
    setVoiceType,
    voiceSpeed,
    setVoiceSpeed,
    voiceMuted,
    setVoiceMuted,
    sfxMuted,
    setSfxMuted,
    isPlaying,
    speakChinese,
    speakEnglish,
    stopSpeaking,
    playSoundEffect,
  };
}
