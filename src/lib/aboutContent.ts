import heroAcademics from "@/assets/hero-academics.jpg";
import heroAdmissions from "@/assets/hero-admissions.jpg";
import heroCalendar from "@/assets/hero-calendar.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroHome from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";

export interface AboutFacility {
  title: string;
  desc: string;
  image: string;
}

const ABOUT_FACILITIES_STORAGE_KEY = "vidyalaya-about-facilities";

export const defaultFacilities: AboutFacility[] = [
  { title: "Smart Classrooms", desc: "Interactive boards, projectors and high-speed internet in every room.", image: heroAcademics },
  { title: "Science & Tech Labs", desc: "State-of-the-art physics, chemistry, biology and computer labs.", image: heroAdmissions },
  { title: "Sports Complex", desc: "Olympic-standard facilities for cricket, badminton, kabaddi and yoga.", image: heroHome },
  { title: "Digital Library", desc: "50,000+ books, digital archives and e-learning resources.", image: heroCalendar },
  { title: "Auditorium", desc: "3000-seat capacity venue with sound system for events and performances.", image: heroContact },
  { title: "Cafeteria", desc: "Nutritious meals prepared fresh daily following health guidelines.", image: schoolHome },
];

export const loadAboutFacilities = (): AboutFacility[] => {
  if (typeof window === "undefined") {
    return defaultFacilities;
  }

  const raw = localStorage.getItem(ABOUT_FACILITIES_STORAGE_KEY);
  if (!raw) {
    return defaultFacilities;
  }

  try {
    const parsed = JSON.parse(raw) as AboutFacility[];
    const sanitized = parsed.filter((facility) =>
      facility &&
      typeof facility.title === "string" &&
      typeof facility.desc === "string" &&
      typeof facility.image === "string" &&
      facility.title.trim().length > 0,
    );

    return sanitized.length > 0 ? sanitized : defaultFacilities;
  } catch {
    return defaultFacilities;
  }
};

export const saveAboutFacilities = (facilities: AboutFacility[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ABOUT_FACILITIES_STORAGE_KEY, JSON.stringify(facilities));
};

// ─── About dynamic content (bilingual) ────────────────────────────────────────
export interface AboutContent {
  history: string;            historyHi: string;
  mission: string;            missionHi: string;
  vision: string;             visionHi: string;
  values: string;             valuesHi: string;
  principalName: string;      principalNameHi: string;
  principalMessage: string;   principalMessageHi: string;
  principalPhoto: string;
}

const ABOUT_CONTENT_KEY = "vidyalaya-about-content";

export const defaultAboutContent: AboutContent = {
  history:            "Founded in 2005, Vidyalaya has been a beacon of holistic education rooted in Bharatiya values.",
  historyHi:          "2005 में स्थापित, विद्यालय भारतीय मूल्यों में निहित समग्र शिक्षा का एक प्रकाश स्तंभ रहा है।",
  mission:            "To nurture curious minds and noble hearts through a blend of modern education and ancient wisdom.",
  missionHi:          "आधुनिक शिक्षा और प्राचीन ज्ञान के मिश्रण से जिज्ञासु मन और उदार हृदय का पोषण करना।",
  vision:             "To be the leading institution that produces well-rounded, culturally grounded, and globally competent citizens.",
  visionHi:           "एक ऐसी अग्रणी संस्था बनना जो सर्वांगीण, सांस्कृतिक रूप से समृद्ध और वैश्विक रूप से सक्षम नागरिक तैयार करे।",
  values:             "Integrity, Respect, Excellence, Service, Cultural Pride",
  valuesHi:           "सत्यनिष्ठा, सम्मान, उत्कृष्टता, सेवा, सांस्कृतिक गर्व",
  principalName:      "Dr. Arvind Krishnan",
  principalNameHi:    "डॉ. अरविंद कृष्णन",
  principalMessage:   "Education is not just about academics — it is about shaping character, building resilience, and igniting the spirit of inquiry.",
  principalMessageHi: "शिक्षा केवल अकादमिक नहीं है — यह चरित्र निर्माण, लचीलापन बनाने और हर बच्चे में जिज्ञासा की भावना जगाने के बारे में है।",
  principalPhoto:     "",
};

export const loadAboutContent = (): AboutContent => {
  if (typeof window === "undefined") return defaultAboutContent;
  try {
    const raw = localStorage.getItem(ABOUT_CONTENT_KEY);
    if (!raw) return defaultAboutContent;
    return { ...defaultAboutContent, ...JSON.parse(raw) };
  } catch {
    return defaultAboutContent;
  }
};

export const saveAboutContent = (content: AboutContent) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ABOUT_CONTENT_KEY, JSON.stringify(content));
};
