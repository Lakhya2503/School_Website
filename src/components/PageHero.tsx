import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageHeroProps {
  title: string;
  sanskrit?: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  align?: "center" | "left";
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  size?: "default" | "compact" | "full";
  children?: React.ReactNode;
}

export const PageHero = ({ title, sanskrit, subtitle, image, mobileImage, align = "center", imageFit = "cover", imagePosition = "center center", size = "default", children }: PageHeroProps) => {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
  <section className={`relative w-full overflow-hidden bg-gradient-temple flex items-center ${
    size === "full"
      ? "min-h-[80svh] md:min-h-[82vh]"
      : size === "compact"
      ? "min-h-[44vh] md:min-h-[52vh]"
      : "min-h-[52vh] md:min-h-[60vh]"
  }`}>
    {/* Background image */}
    <div className="absolute inset-0 w-full h-full">
      {mobileImage ? (
        <picture className="absolute inset-0 h-full w-full">
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <img
            src={image}
            alt=""
            aria-hidden
            style={{ objectPosition: imagePosition }}
            className={`absolute inset-0 h-full w-full opacity-90 animate-fade-in ${
              imageFit === "contain" ? "object-contain object-center" : "object-cover object-center"
            }`}
          />
        </picture>
      ) : (
        <img
          src={image}
          alt=""
          aria-hidden
          style={{ objectPosition: imagePosition }}
          className={`absolute inset-0 h-full w-full opacity-90 animate-fade-in ${
            imageFit === "contain" ? "object-contain object-center" : "object-cover object-[center_30%]"
          }`}
        />
      )}
      {/* Dark scrim */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(20_60%_10%/0.65)_0%,hsl(20_40%_12%/0.35)_60%,transparent_100%)]" />
      {/* Festive radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(22_88%_52%/0.15),transparent_55%)]" />
    </div>

    <div className={`container-narrow relative w-full z-10 ${size === "compact" ? "py-8 md:py-12" : size === "full" ? "py-14 md:py-20" : "py-10 md:py-16"} ${align === "center" ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-3xl px-1 md:px-0 ${align === "center" ? "mx-auto" : ""}`}
      >
        {sanskrit && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sanskrit text-base md:text-2xl tracking-wide text-gold mb-3 drop-shadow-[0_2px_8px_hsl(20_40%_12%/0.6)]"
          >
            {sanskrit}
          </motion.div>
        )}

        <h1
          className={`font-bold drop-shadow-[0_10px_24px_hsl(20_40%_12%/0.62)] ${
            isHindi ? "font-sanskrit" : "font-display"
          } ${
            size === "compact" ? "text-2xl md:text-5xl lg:text-[3.4rem]" : "text-3xl md:text-6xl lg:text-[4rem]"
          }`}
          style={{ lineHeight: isHindi ? 1.45 : 1.2 }}
        >
          {isHindi ? (
            <span
              style={{
                background: "linear-gradient(90deg, hsl(43 95% 86%) 0%, hsl(38 90% 68%) 28%, hsl(22 88% 58%) 55%, hsl(43 95% 86%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline",
                paddingTop: "0.15em",
                paddingBottom: "0.05em",
              }}
            >
              {title}
            </span>
          ) : (
            <span
              className="bg-clip-text text-transparent inline-block pb-1"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(43 95% 86%) 0%, hsl(38 90% 68%) 28%, hsl(22 88% 58%) 55%, hsl(43 95% 86%) 100%)",
              }}
            >
              {title}
            </span>
          )}
        </h1>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${isHindi ? "mt-2" : "mt-4"} flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold animate-flame text-lg">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className={`text-white/90 leading-relaxed drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)] ${
              size === "compact"
                ? `${isHindi ? "mt-2" : "mt-3"} text-sm md:text-lg`
                : `${isHindi ? "mt-3" : "mt-4"} text-base md:text-xl`
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`mt-6 flex flex-wrap gap-4 overflow-x-clip ${align === "center" ? "justify-center" : ""}`}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>

    {/* Bottom wave — fill matches page background, -1px bottom removes the gap line */}
    <div className="absolute bottom-[-1px] left-0 right-0 z-10 leading-none">
      <svg
        viewBox="0 0 1440 80"
        className="block h-8 w-full md:h-12 fill-background"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,40 C240,10 480,60 720,40 C960,20 1200,55 1440,30 L1440,80 L0,80 Z" />
      </svg>
    </div>
  </section>
  );
};
