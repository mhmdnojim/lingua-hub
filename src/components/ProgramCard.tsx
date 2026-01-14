import { ReactNode } from "react";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant: "match" | "flip" | "lift";
  onClick: () => void;
}

const variantStyles = {
  match: {
    gradient: "gradient-match",
    glow: "shadow-glow-match",
    bg: "bg-lingua-match-light",
    border: "border-lingua-match/20",
  },
  flip: {
    gradient: "gradient-flip",
    glow: "shadow-glow-flip",
    bg: "bg-hanzi-flip-light",
    border: "border-hanzi-flip/20",
  },
  lift: {
    gradient: "gradient-lift",
    glow: "shadow-glow-lift",
    bg: "bg-lingua-lift-light",
    border: "border-lingua-lift/20",
  },
};

const ProgramCard = ({ title, description, icon, variant, onClick }: ProgramCardProps) => {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center p-8 rounded-2xl border-2 ${styles.border} ${styles.bg} 
        transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-card-hover
        focus:outline-none focus:ring-4 focus:ring-primary/20 w-full`}
    >
      {/* Icon container */}
      <div
        className={`${styles.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 
          transition-all duration-300 group-hover:${styles.glow} group-hover:scale-110`}
      >
        <span className="text-4xl">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center text-sm leading-relaxed">{description}</p>

      {/* Arrow indicator */}
      <div
        className={`mt-6 ${styles.gradient} text-white px-6 py-2 rounded-full text-sm font-semibold
          opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}
      >
        Start Learning →
      </div>
    </button>
  );
};

export default ProgramCard;
