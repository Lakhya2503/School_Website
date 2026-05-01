import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader = ({ eyebrow, title, subtitle, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    className={center ? "text-center max-w-3xl mx-auto mb-8" : "mb-8 max-w-3xl"}
  >
    {eyebrow && (
      <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sanskrit text-xs tracking-[0.22em] text-primary">
          {eyebrow}
        </span>
      </div>
    )}
    <div className={center ? "flex justify-center" : ""}>
      <h2
        className="font-display text-3xl md:text-5xl font-bold"
        style={{
          backgroundImage: "linear-gradient(90deg, hsl(22 88% 52%) 0%, hsl(38 95% 58%) 50%, hsl(22 88% 48%) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.3,
          paddingTop: "0.1em",
          display: "inline-block",
        }}
      >
        {title}
      </h2>
    </div>
    <div className={`mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent ${center ? "mx-auto" : ""}`} />
    {subtitle && (
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
    )}
  </motion.div>
);
