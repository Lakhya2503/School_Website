import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "hi";

// ─── all translation keys ──────────────────────────────────────────────────────
type TranslationKey =
  // nav
  | "nav.home" | "nav.about" | "nav.academics" | "nav.admissions"
  | "nav.calendar" | "nav.notices" | "nav.fees" | "nav.contact"
  | "nav.applyNow" | "lang.english" | "lang.hindi"
  // hero
  | "home.heroTitle" | "home.heroSubtitle" | "home.beginJourney" | "home.discoverUs"
  // features section
  | "home.features.title" | "home.features.sub"
  | "home.feat1.title" | "home.feat1.desc"
  | "home.feat2.title" | "home.feat2.desc"
  | "home.feat3.title" | "home.feat3.desc"
  | "home.feat4.title" | "home.feat4.desc"
  // stats
  | "home.stat1.label" | "home.stat2.label" | "home.stat3.label" | "home.stat4.label"
  // quick links section
  | "home.quicklinks.title" | "home.quicklinks.sub"
  | "home.ql1.label" | "home.ql1.sub"
  | "home.ql2.label" | "home.ql2.sub"
  | "home.ql3.label" | "home.ql3.sub"
  | "home.ql4.label" | "home.ql4.sub"
  // announcements section
  | "home.announcements.title" | "home.announcements.sub" | "home.announcements.viewAll"
  | "home.announcements.latest"
  // testimonials section
  | "home.testimonials.title" | "home.testimonials.sub"
  | "home.test1.name" | "home.test1.role" | "home.test1.text"
  | "home.test2.name" | "home.test2.role" | "home.test2.text"
  | "home.test3.name" | "home.test3.role" | "home.test3.text"
  // cta section
  | "home.cta.title" | "home.cta.sub" | "home.cta.apply" | "home.cta.contact"
  // events section
  | "home.events.title" | "home.events.sub" | "home.events.viewAll"
  // features extra
  | "home.features.eyebrow" | "home.features.schoolLife"
  // cultural
  | "home.cultural.quote"
  // gallery section
  | "home.gallery.title" | "home.gallery.sub"
  | "home.gallery.l1" | "home.gallery.l2" | "home.gallery.l3"
  | "home.gallery.l4" | "home.gallery.l5" | "home.gallery.l6" | "home.gallery.l7"
  // calendar page
  | "cal.heroTitle" | "cal.heroSubtitle"
  | "cal.sectionTitle" | "cal.sectionSub"
  | "cal.filterAll" | "cal.filterExam" | "cal.filterResult" | "cal.filterHoliday"
  | "cal.filterMeeting" | "cal.filterEvent" | "cal.filterLeave"
  | "cal.until" | "cal.noEvents"
  | "cal.cta.title" | "cal.cta.sub"
  // notices page
  | "notices.heroTitle" | "notices.heroSubtitle"
  | "notices.sectionTitle" | "notices.sectionSub"
  | "notices.filterAll" | "notices.filterSchool" | "notices.filterGovt" | "notices.filterUrgent"
  | "notices.download" | "notices.noNotices"
  // footer
  | "footer.tagline" | "footer.quicklinks" | "footer.visit" | "footer.copyright" | "footer.blessing"
  // about page
  | "about.heroTitle" | "about.heroSanskrit" | "about.heroSubtitle"
  | "about.mvv.eyebrow" | "about.mvv.title" | "about.mvv.subtitle"
  | "about.mission.title" | "about.mission.desc" | "about.mission.footer"
  | "about.vision.title" | "about.vision.desc" | "about.vision.footer"
  | "about.values.title" | "about.values.desc" | "about.values.footer"
  | "about.timeline.eyebrow" | "about.timeline.title" | "about.timeline.subtitle"
  | "about.timeline.2005.title" | "about.timeline.2005.desc"
  | "about.timeline.2012.title" | "about.timeline.2012.desc"
  | "about.timeline.2018.title" | "about.timeline.2018.desc"
  | "about.timeline.2023.title" | "about.timeline.2023.desc"
  | "about.achievements.eyebrow" | "about.achievements.title" | "about.achievements.subtitle"
  | "about.achievement1.title" | "about.achievement1.desc"
  | "about.achievement2.title" | "about.achievement2.desc"
  | "about.achievement3.title" | "about.achievement3.desc"
  | "about.achievement4.title" | "about.achievement4.desc"
  | "about.facilities.eyebrow" | "about.facilities.title" | "about.facilities.subtitle"
  | "about.facility1.title" | "about.facility1.desc"
  | "about.facility2.title" | "about.facility2.desc"
  | "about.facility3.title" | "about.facility3.desc"
  | "about.facility4.title" | "about.facility4.desc"
  | "about.facility5.title" | "about.facility5.desc"
  | "about.facility6.title" | "about.facility6.desc"
  | "about.principal.quote" | "about.principal.name" | "about.principal.role"
  | "about.team.eyebrow" | "about.team.title" | "about.team.subtitle"
  | "about.team1.name" | "about.team1.role" | "about.team1.expertise"
  | "about.team2.name" | "about.team2.role" | "about.team2.expertise"
  | "about.team3.name" | "about.team3.role" | "about.team3.expertise"
  | "about.team4.name" | "about.team4.role" | "about.team4.expertise"
  | "about.team5.name" | "about.team5.role" | "about.team5.expertise"
  | "about.team6.name" | "about.team6.role" | "about.team6.expertise"
  // ── Academics ──────────────────────────────────────────────────────────────
  | "academics.heroTitle" | "academics.heroSubtitle"
  | "academics.statsPassRate" | "academics.statsUniversity" | "academics.statsExperts" | "academics.statsOlympiad"
  | "academics.pillarsEyebrow" | "academics.pillarsTitle" | "academics.pillarsSubtitle"
  | "academics.pillar1Title" | "academics.pillar1Desc" | "academics.pillar2Title" | "academics.pillar2Desc"
  | "academics.pillar3Title" | "academics.pillar3Desc" | "academics.pillar4Title" | "academics.pillar4Desc"
  | "academics.programsEyebrow" | "academics.programsTitle" | "academics.programsSubtitle"
  | "academics.prog1Level" | "academics.prog1Grades" | "academics.prog1Desc"
  | "academics.prog1h1" | "academics.prog1h2" | "academics.prog1h3" | "academics.prog1h4"
  | "academics.prog2Level" | "academics.prog2Grades" | "academics.prog2Desc"
  | "academics.prog2h1" | "academics.prog2h2" | "academics.prog2h3" | "academics.prog2h4"
  | "academics.prog3Level" | "academics.prog3Grades" | "academics.prog3Desc"
  | "academics.prog3h1" | "academics.prog3h2" | "academics.prog3h3" | "academics.prog3h4"
  | "academics.prog4Level" | "academics.prog4Grades" | "academics.prog4Desc"
  | "academics.prog4h1" | "academics.prog4h2" | "academics.prog4h3" | "academics.prog4h4"
  | "academics.cbseAffiliated" | "academics.keyHighlights"
  | "academics.subjectsEyebrow" | "academics.subjectsTitle" | "academics.subjectsSubtitle"
  | "academics.subj1Name" | "academics.subj1Desc" | "academics.subj2Name" | "academics.subj2Desc"
  | "academics.subj3Name" | "academics.subj3Desc" | "academics.subj4Name" | "academics.subj4Desc"
  | "academics.subj5Name" | "academics.subj5Desc" | "academics.subj6Name" | "academics.subj6Desc"
  | "academics.subj7Name" | "academics.subj7Desc" | "academics.subj8Name" | "academics.subj8Desc"
  | "academics.quoteTrans"
  | "academics.ctaBadge" | "academics.ctaTitle" | "academics.ctaSubtitle" | "academics.ctaApply" | "academics.ctaContact"
  // ── Admissions ─────────────────────────────────────────────────────────────
  | "admissions.heroTitle" | "admissions.heroSubtitle"
  | "admissions.stepsEyebrow" | "admissions.stepsTitle" | "admissions.stepsSubtitle"
  | "admissions.step1Title" | "admissions.step1Desc" | "admissions.step2Title" | "admissions.step2Desc"
  | "admissions.step3Title" | "admissions.step3Desc" | "admissions.step4Title" | "admissions.step4Desc"
  | "admissions.whyEyebrow" | "admissions.whyTitle" | "admissions.whySubtitle"
  | "admissions.why1Title" | "admissions.why1Desc" | "admissions.why1StatLabel"
  | "admissions.why2Title" | "admissions.why2Desc" | "admissions.why2StatLabel"
  | "admissions.why3Title" | "admissions.why3Desc" | "admissions.why3StatLabel"
  | "admissions.why4Title" | "admissions.why4Desc" | "admissions.why4StatLabel"
  | "admissions.docsLabel" | "admissions.docsTitle"
  | "admissions.doc1" | "admissions.doc2" | "admissions.doc3"
  | "admissions.doc4" | "admissions.doc5" | "admissions.doc6"
  | "admissions.contactTitle"
  | "admissions.formTitle" | "admissions.formSubtitle"
  | "admissions.formParent" | "admissions.formParentPlaceholder"
  | "admissions.formChild" | "admissions.formChildPlaceholder"
  | "admissions.formEmail" | "admissions.formEmailPlaceholder" | "admissions.formEmailError"
  | "admissions.formPhone" | "admissions.formPhonePlaceholder" | "admissions.formPhoneError"
  | "admissions.formGrade" | "admissions.formGradePlaceholder"
  | "admissions.formMessage" | "admissions.formMessagePlaceholder" | "admissions.formMessageOptional"
  | "admissions.formSubmit" | "admissions.formSubmitting"
  | "admissions.successTitle" | "admissions.successDesc" | "admissions.successBtn"
  | "admissions.faqEyebrow" | "admissions.faqTitle" | "admissions.faqSubtitle"
  | "admissions.faq1Q" | "admissions.faq1A" | "admissions.faq2Q" | "admissions.faq2A"
  | "admissions.faq3Q" | "admissions.faq3A" | "admissions.faq4Q" | "admissions.faq4A"
  | "admissions.faq5Q" | "admissions.faq5A" | "admissions.faq6Q" | "admissions.faq6A"
  | "admissions.faq7Q" | "admissions.faq7A"
  | "admissions.ctaTitle" | "admissions.ctaSubtitle" | "admissions.ctaVisit" | "admissions.ctaCall";

// ─── translations ──────────────────────────────────────────────────────────────
const messages: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.academics": "Academics",
    "nav.admissions": "Admissions",
    "nav.calendar": "Calendar",
    "nav.notices": "Notices",
    "nav.fees": "Fee Structure",
    "nav.contact": "Contact",
    "nav.applyNow": "Apply Now",
    "lang.english": "EN",
    "lang.hindi": "हिंदी",
    // hero
    "home.heroTitle": "A Gurukul Spirit for Modern Schooling",
    "home.heroSubtitle": "Our school blends Bharatiya sanskar, strong academics, and joyful learning to shape disciplined, compassionate, and confident students.",
    "home.beginJourney": "Begin the Journey",
    "home.discoverUs": "Discover Us",
    // features
    "home.features.title": "Why Vidyalaya",
    "home.features.sub": "A school that nurtures the whole child — mind, body, and spirit.",
    "home.features.eyebrow": "Why Choose Us",
    "home.features.schoolLife": "School Life",
    "home.feat1.title": "Supportive Learning",
    "home.feat1.desc": "Balanced teaching, regular guidance, and personal attention for every child.",
    "home.feat2.title": "Science Labs",
    "home.feat2.desc": "Well-equipped labs that make science practical, fun, and easy to understand.",
    "home.feat3.title": "Arts & Activities",
    "home.feat3.desc": "Music, art, and creative programs that help students express themselves.",
    "home.feat4.title": "Sports & Fitness",
    "home.feat4.desc": "Outdoor games, yoga, and fitness activities for healthy growth.",
    // stats
    "home.stat1.label": "Years of Legacy",
    "home.stat2.label": "Happy Students",
    "home.stat3.label": "Devoted Teachers",
    "home.stat4.label": "Board Results",
    // quick links
    "home.quicklinks.title": "Quick Access",
    "home.quicklinks.sub": "Everything you need, right here.",
    "home.ql1.label": "Notices",
    "home.ql1.sub": "Circulars & updates",
    "home.ql2.label": "Fee Structure",
    "home.ql2.sub": "Class-wise fees",
    "home.ql3.label": "Calendar",
    "home.ql3.sub": "Exams & events",
    "home.ql4.label": "Admissions",
    "home.ql4.sub": "Apply for 2026–27",
    // announcements
    "home.announcements.title": "Latest Announcements",
    "home.announcements.sub": "Stay up to date with school news and events.",
    "home.announcements.viewAll": "View All",
    "home.announcements.latest": "Latest",
    // events
    "home.events.title": "Upcoming Events",
    "home.events.sub": "Important dates ahead",
    "home.events.viewAll": "Full calendar",
    // cultural
    "home.cultural.quote": "\"Lead us from the unreal to the real, from darkness unto light.\"",
    // testimonials
    "home.testimonials.title": "What Families Say",
    "home.testimonials.sub": "Voices from our school community.",
    "home.test1.name": "Anjali Sharma",
    "home.test1.role": "Parent, Class VIII",
    "home.test1.text": "Vidyalaya gave my daughter the confidence of modern science and the grace of Bharatiya sanskaars.",
    "home.test2.name": "Rahul Iyer",
    "home.test2.role": "Alumnus, Batch 2018",
    "home.test2.text": "My teachers shaped not only my mind, but my dharma. Forever grateful.",
    "home.test3.name": "Meera Patel",
    "home.test3.role": "Parent, Class V",
    "home.test3.text": "Festivals, Sanskrit, robotics — all under one roof. Truly a school of Bharat.",
    // cta
    "home.cta.title": "Ready to Join the Vidyalaya Family?",
    "home.cta.sub": "Admissions for 2026–27 are open. Take the first step today.",
    "home.cta.apply": "Apply Now",
    "home.cta.contact": "Contact Us",
    // gallery
    "home.gallery.title": "Life at Vidyalaya",
    "home.gallery.sub": "A glimpse into our vibrant school community.",
    "home.gallery.l1": "Campus Life",
    "home.gallery.l2": "Academics",
    "home.gallery.l3": "Admissions",
    "home.gallery.l4": "Events & Festivals",
    "home.gallery.l5": "Contact & Community",
    "home.gallery.l6": "Sports & Fitness",
    "home.gallery.l7": "School Home",
    // calendar
    "cal.heroTitle": "Academic Calendar",
    "cal.heroSubtitle": "Exams, results, holidays, meetings and events — your complete academic year at a glance.",
    "cal.sectionTitle": "All Events",
    "cal.sectionSub": "Filter by category to find what matters most to you.",
    "cal.filterAll": "All",
    "cal.filterExam": "Exam",
    "cal.filterResult": "Result",
    "cal.filterHoliday": "Holiday",
    "cal.filterMeeting": "Meeting",
    "cal.filterEvent": "Event",
    "cal.filterLeave": "Leave",
    "cal.until": "Until",
    "cal.noEvents": "No events in this category.",
    "cal.cta.title": "Stay in the Loop",
    "cal.cta.sub": "Subscribe for monthly newsletter with calendar updates, photo highlights and parent notes.",
    // notices
    "notices.heroTitle": "Notices & Circulars",
    "notices.heroSubtitle": "Official school notices, government circulars and urgent announcements — all in one place.",
    "notices.sectionTitle": "Latest Notices",
    "notices.sectionSub": "Stay informed with the latest updates from school administration and government.",
    "notices.filterAll": "All",
    "notices.filterSchool": "School Notice",
    "notices.filterGovt": "Government Notice",
    "notices.filterUrgent": "Urgent Notice",
    "notices.download": "Download PDF",
    "notices.noNotices": "No notices in this category.",
    // about page
    "about.heroTitle": "About Vidyalaya",
    "about.heroSanskrit": "॥ सा विद्या या विमुक्तये ॥",
    "about.heroSubtitle": "A school rooted in Bharatiya values, nurturing curious minds and noble hearts since 2005.",
    "about.mvv.eyebrow": "॥ आधारशिला ॥",
    "about.mvv.title": "Mission, Vision & Values",
    "about.mvv.subtitle": "The three pillars that guide everything we do at Vidyalaya.",
    "about.mission.title": "Our Mission",
    "about.mission.desc": "To nurture curious minds and noble hearts through a blend of modern education and ancient wisdom.",
    "about.mission.footer": "Holistic education for every child",
    "about.vision.title": "Our Vision",
    "about.vision.desc": "To be the leading institution that produces well-rounded, culturally grounded, and globally competent citizens.",
    "about.vision.footer": "Global citizens with Indian roots",
    "about.values.title": "Our Values",
    "about.values.desc": "Integrity, Respect, Excellence, Service and Cultural Pride form the bedrock of our school community.",
    "about.values.footer": "Character before career",
    "about.timeline.eyebrow": "॥ इतिहासः ॥",
    "about.timeline.title": "Two Decades of Excellence",
    "about.timeline.subtitle": "From a small school to a thriving institution — our story of growth.",
    "about.timeline.2005.title": "Vidyalaya Founded",
    "about.timeline.2005.desc": "Established with 120 students and a vision to blend Bharatiya values with modern education.",
    "about.timeline.2012.title": "Campus Expansion",
    "about.timeline.2012.desc": "New science labs, sports complex and digital library added to serve our growing community.",
    "about.timeline.2018.title": "Board Excellence Award",
    "about.timeline.2018.desc": "Recognised by the state board for 100% pass rate and outstanding student achievements.",
    "about.timeline.2023.title": "2400+ Students Strong",
    "about.timeline.2023.desc": "Today we proudly serve over 2400 students with 180+ dedicated faculty members.",
    "about.achievements.eyebrow": "॥ गौरवम् ॥",
    "about.achievements.title": "Awards & Achievements",
    "about.achievements.subtitle": "Milestones that reflect our commitment to excellence.",
    "about.achievement1.title": "State Board Topper",
    "about.achievement1.desc": "Our students have topped the state board examinations for 5 consecutive years.",
    "about.achievement2.title": "Best School Award",
    "about.achievement2.desc": "Awarded Best School in Cultural Education by the State Education Department.",
    "about.achievement3.title": "International Olympiad",
    "about.achievement3.desc": "15 students represented India in international science and mathematics olympiads.",
    "about.achievement4.title": "Green Campus",
    "about.achievement4.desc": "Certified as a Green Campus for our solar energy and waste management initiatives.",
    "about.facilities.eyebrow": "॥ विद्यालय परिसरः ॥",
    "about.facilities.title": "World-Class Facilities",
    "about.facilities.subtitle": "Modern infrastructure designed to inspire learning and creativity.",
    "about.facility1.title": "Smart Classrooms",
    "about.facility1.desc": "Interactive boards, projectors and high-speed internet in every room.",
    "about.facility2.title": "Science & Tech Labs",
    "about.facility2.desc": "State-of-the-art physics, chemistry, biology and computer labs.",
    "about.facility3.title": "Sports Complex",
    "about.facility3.desc": "Olympic-standard facilities for cricket, badminton, kabaddi and yoga.",
    "about.facility4.title": "Digital Library",
    "about.facility4.desc": "50,000+ books, digital archives and e-learning resources.",
    "about.facility5.title": "Auditorium",
    "about.facility5.desc": "3000-seat capacity venue for events, performances and assemblies.",
    "about.facility6.title": "Cafeteria",
    "about.facility6.desc": "Nutritious meals prepared fresh daily following health guidelines.",
    "about.principal.quote": "Education is not just about academics — it is about shaping character, building resilience, and igniting the spirit of inquiry in every child.",
    "about.principal.name": "Dr. Arvind Krishnan",
    "about.principal.role": "Principal, Vidyalaya — since 2005",
    "about.team.eyebrow": "॥ आचार्य मण्डलम् ॥",
    "about.team.title": "Meet Our Team",
    "about.team.subtitle": "Dedicated educators who bring passion and expertise to every classroom.",
    "about.team1.name": "Dr. Arvind Krishnan", "about.team1.role": "Principal", "about.team1.expertise": "20+ years in education leadership and curriculum design.",
    "about.team2.name": "Mrs. Sunita Rao",     "about.team2.role": "Vice Principal", "about.team2.expertise": "Expert in student counselling and holistic development.",
    "about.team3.name": "Mr. Rajan Pillai",    "about.team3.role": "Head of Sciences", "about.team3.expertise": "PhD in Physics, national olympiad mentor.",
    "about.team4.name": "Ms. Priya Nair",      "about.team4.role": "Head of Arts", "about.team4.expertise": "Classical dancer and cultural programme director.",
    "about.team5.name": "Mr. Suresh Kumar",    "about.team5.role": "Sports Director", "about.team5.expertise": "Former national kabaddi player and fitness coach.",
    "about.team6.name": "Mrs. Kavitha Menon",  "about.team6.role": "Head of Languages", "about.team6.expertise": "Sanskrit scholar and multilingual education specialist.",
    // footer
    "footer.tagline": "Where ancient wisdom meets modern learning. Nurturing every child with the rich heritage of Bharat.",
    "footer.quicklinks": "Quick Links",
    "footer.visit": "Visit Us",
    "footer.copyright": "All rights reserved",
    "footer.blessing": "शुभम् भवतु · सर्वे भवन्तु सुखिनः",
    // ── Academics EN ──────────────────────────────────────────────────────────
    "academics.heroTitle": "Academic Excellence",
    "academics.heroSubtitle": "A curriculum that honours Bharatiya wisdom while preparing students for a competitive, compassionate world.",
    "academics.statsPassRate": "Board Pass Rate", "academics.statsUniversity": "University Admissions / Year",
    "academics.statsExperts": "Subject Experts", "academics.statsOlympiad": "Olympiad Medals",
    "academics.pillarsEyebrow": "॥ शिक्षा स्तम्भाः ॥", "academics.pillarsTitle": "Four Pillars of Learning",
    "academics.pillarsSubtitle": "Every lesson, activity, and interaction at Vidyalaya is built on these cornerstones.",
    "academics.pillar1Title": "Critical Thinking", "academics.pillar1Desc": "Socratic questioning, debates, and problem-solving woven into every lesson.",
    "academics.pillar2Title": "STEM Excellence", "academics.pillar2Desc": "Dedicated labs, robotics club, and national science olympiad coaching.",
    "academics.pillar3Title": "Creative Expression", "academics.pillar3Desc": "Art, music, drama, and craft as core subjects — not afterthoughts.",
    "academics.pillar4Title": "Cultural Roots", "academics.pillar4Desc": "Sanskrit, yoga, and Bharatiya values integrated across all grades.",
    "academics.programsEyebrow": "॥ कार्यक्रमाः ॥", "academics.programsTitle": "Academic Programs",
    "academics.programsSubtitle": "Structured learning journeys from Class I through XII, each stage building on the last.",
    "academics.prog1Level": "Primary", "academics.prog1Grades": "Classes I – V",
    "academics.prog1Desc": "A joyful foundation in literacy, numeracy, and values through activity-based learning.",
    "academics.prog1h1": "Story-based learning", "academics.prog1h2": "Vedic maths introduction",
    "academics.prog1h3": "Art & music integration", "academics.prog1h4": "Yoga & play",
    "academics.prog2Level": "Middle School", "academics.prog2Grades": "Classes VI – VIII",
    "academics.prog2Desc": "Deepening subject knowledge with project work, labs, and co-curricular exploration.",
    "academics.prog2h1": "Science lab practicals", "academics.prog2h2": "Coding & robotics",
    "academics.prog2h3": "Sanskrit studies", "academics.prog2h4": "Leadership activities",
    "academics.prog3Level": "Secondary", "academics.prog3Grades": "Classes IX – X",
    "academics.prog3Desc": "Rigorous CBSE board preparation with mentorship, mock exams, and career guidance.",
    "academics.prog3h1": "Board exam coaching", "academics.prog3h2": "Career counselling",
    "academics.prog3h3": "Research projects", "academics.prog3h4": "Community service",
    "academics.prog4Level": "Senior Secondary", "academics.prog4Grades": "Classes XI – XII",
    "academics.prog4Desc": "Specialised streams — Science, Commerce, and Humanities — with expert faculty.",
    "academics.prog4h1": "Science / Commerce / Arts", "academics.prog4h2": "Competitive exam prep",
    "academics.prog4h3": "Internship opportunities", "academics.prog4h4": "College guidance",
    "academics.cbseAffiliated": "CBSE Affiliated", "academics.keyHighlights": "Key Highlights",
    "academics.subjectsEyebrow": "॥ विषयाः ॥", "academics.subjectsTitle": "Subjects We Offer",
    "academics.subjectsSubtitle": "A broad, balanced curriculum covering academics, arts, and physical development.",
    "academics.subj1Name": "Vak Vidya — Languages", "academics.subj1Desc": "English, Hindi, Sanskrit — building communication and cultural roots.",
    "academics.subj2Name": "Ganit Shastra — Mathematics", "academics.subj2Desc": "From arithmetic to calculus, with Vedic maths enrichment.",
    "academics.subj3Name": "Prakriti Vigyan — Sciences", "academics.subj3Desc": "Physics, Chemistry, Biology with hands-on lab sessions.",
    "academics.subj4Name": "Dharti Mata — Social Studies", "academics.subj4Desc": "History, Geography, Civics — understanding our world and heritage.",
    "academics.subj5Name": "Yantra Vidya — Computer Science", "academics.subj5Desc": "Coding, robotics, and digital literacy for the modern age.",
    "academics.subj6Name": "Shilpa Kala — Arts & Crafts", "academics.subj6Desc": "Drawing, painting, and traditional Indian art forms.",
    "academics.subj7Name": "Gandharva — Music & Dance", "academics.subj7Desc": "Classical and folk traditions alongside modern expression.",
    "academics.subj8Name": "Sharir Dharma — Physical Education", "academics.subj8Desc": "Yoga, kabaddi, athletics, and team sports for holistic fitness.",
    "academics.quoteTrans": "\"Knowledge gives humility, from humility comes worthiness.\"",
    "academics.ctaBadge": "ADMISSIONS OPEN 2026–27", "academics.ctaTitle": "Ready to Begin the Journey?",
    "academics.ctaSubtitle": "Join a school where tradition and excellence walk hand in hand. Applications are open for all classes.",
    "academics.ctaApply": "Apply Now", "academics.ctaContact": "Contact Us",
    // ── Admissions EN ─────────────────────────────────────────────────────────
    "admissions.heroTitle": "Join Our School",
    "admissions.heroSubtitle": "Every child carries a divine spark. Help us help yours shine brightly in a nurturing, values-driven environment.",
    "admissions.stepsEyebrow": "॥ प्रक्रिया ॥", "admissions.stepsTitle": "Simple Admission Process",
    "admissions.stepsSubtitle": "A welcoming path from inquiry to enrollment — just four easy steps.",
    "admissions.step1Title": "Inquiry", "admissions.step1Desc": "Reach out and share your child's interests, grade, and any questions you have.",
    "admissions.step2Title": "Application", "admissions.step2Desc": "Complete the online form and upload the required documents securely.",
    "admissions.step3Title": "Assessment", "admissions.step3Desc": "An informal, friendly interaction to understand your child's strengths.",
    "admissions.step4Title": "Enrollment", "admissions.step4Desc": "Welcome to the Vidyalaya parivaar — sealed with a sacred ceremony.",
    "admissions.whyEyebrow": "॥ विशेषताएं ॥", "admissions.whyTitle": "Why Choose Vidyalaya",
    "admissions.whySubtitle": "What makes our school the perfect choice for your child's future.",
    "admissions.why1Title": "Holistic Development", "admissions.why1Desc": "We nurture mind, body, and spirit through integrated learning approaches.", "admissions.why1StatLabel": "Student Wellbeing Focus",
    "admissions.why2Title": "Expert Faculty", "admissions.why2Desc": "Passionate educators dedicated to bringing out the best in every student.", "admissions.why2StatLabel": "Qualified Teachers",
    "admissions.why3Title": "Rich Curriculum", "admissions.why3Desc": "Blend of traditional wisdom and modern education for complete growth.", "admissions.why3StatLabel": "Affiliated Board",
    "admissions.why4Title": "Proven Excellence", "admissions.why4Desc": "Outstanding academic results and holistic student achievements.", "admissions.why4StatLabel": "Board Pass Rate",
    "admissions.docsLabel": "Documents Required", "admissions.docsTitle": "What to Bring",
    "admissions.doc1": "Birth Certificate (original + photocopy)", "admissions.doc2": "Previous School Transfer Certificate",
    "admissions.doc3": "Recent passport-size photographs (4)", "admissions.doc4": "Aadhaar Card of child & parents",
    "admissions.doc5": "Address proof (utility bill / rental agreement)", "admissions.doc6": "Previous year's academic report card",
    "admissions.contactTitle": "Have Questions?",
    "admissions.formTitle": "Apply for Admission", "admissions.formSubtitle": "Fill in the details below and we'll get back to you shortly.",
    "admissions.formParent": "Parent / Guardian Name", "admissions.formParentPlaceholder": "e.g. Ramesh Sharma",
    "admissions.formChild": "Child's Name", "admissions.formChildPlaceholder": "e.g. Arjun Sharma",
    "admissions.formEmail": "Email Address", "admissions.formEmailPlaceholder": "you@example.com", "admissions.formEmailError": "Please enter a valid email.",
    "admissions.formPhone": "Phone Number", "admissions.formPhonePlaceholder": "+91 98765 43210", "admissions.formPhoneError": "Please enter a valid phone number.",
    "admissions.formGrade": "Applying for Grade", "admissions.formGradePlaceholder": "e.g. Class VI",
    "admissions.formMessage": "Additional Message", "admissions.formMessagePlaceholder": "Any specific requirements or questions...", "admissions.formMessageOptional": "(optional)",
    "admissions.formSubmit": "Submit Application", "admissions.formSubmitting": "Submitting…",
    "admissions.successTitle": "Application Received!", "admissions.successDesc": "Thank you for applying to Vidyalaya. Our admissions team will contact you within 2 working days. 🪔", "admissions.successBtn": "Submit Another Application",
    "admissions.faqEyebrow": "॥ प्रश्नोत्तर ॥", "admissions.faqTitle": "Frequently Asked Questions", "admissions.faqSubtitle": "Find answers to common questions about our admission process.",
    "admissions.faq1Q": "What is the admission process timeline?", "admissions.faq1A": "The admission process typically takes 2–3 weeks from application submission to final enrollment. We conduct assessments within 5–7 days of receiving your application and notify you of the results within 48 hours.",
    "admissions.faq2Q": "Are there any entrance examinations?", "admissions.faq2A": "For Classes 1–5, we conduct an informal interaction to understand the child's interests and abilities. For Classes 6 and above, there is a simple assessment covering basic concepts to help us place students appropriately.",
    "admissions.faq3Q": "What documents are required for admission?", "admissions.faq3A": "You'll need: birth certificate, previous school transfer certificate (if applicable), recent photographs, Aadhaar cards, address proof, and previous academic records. All documents should be submitted in original along with photocopies.",
    "admissions.faq4Q": "Is there a sibling discount available?", "admissions.faq4A": "Yes, we offer a 10% discount on tuition fees for the second child and 15% for the third child from the same family. This reflects our commitment to supporting families who choose to grow with us.",
    "admissions.faq5Q": "What is the student-teacher ratio?", "admissions.faq5A": "We maintain a healthy student-teacher ratio of 20:1 to ensure personalised attention. For specialised subjects and labs, the ratio is even lower at 15:1.",
    "admissions.faq6Q": "When do admissions open for the new academic year?", "admissions.faq6A": "Admissions for the new academic year (2026–27) open in January and close by 31st March. We recommend applying early as seats are limited.",
    "admissions.faq7Q": "Is there a school bus or transport facility available?", "admissions.faq7A": "Yes, Vidyalaya operates GPS-tracked school buses covering major routes across the city. Transport fees are charged separately based on distance. Contact the office for route maps and fee details.",
    "admissions.ctaTitle": "Begin the Journey Today", "admissions.ctaSubtitle": "Admissions for 2026–27 are open. Walk through our gates and feel the heritage.",
    "admissions.ctaVisit": "Schedule a Visit", "admissions.ctaCall": "Call Us Now",
  },

  hi: {
    // nav
    "nav.home": "मुख्य पृष्ठ",
    "nav.about": "हमारे बारे में",
    "nav.academics": "शैक्षणिक",
    "nav.admissions": "प्रवेश",
    "nav.calendar": "कैलेंडर",
    "nav.notices": "सूचनाएं",
    "nav.fees": "शुल्क संरचना",
    "nav.contact": "संपर्क",
    "nav.applyNow": "अभी आवेदन करें",
    "lang.english": "EN",
    "lang.hindi": "हिंदी",
    // hero
    "home.heroTitle": "आधुनिक शिक्षा में गुरुकुल की आत्मा",
    "home.heroSubtitle": "हमारा विद्यालय भारतीय संस्कार, सशक्त शिक्षा और आनंदमय सीख को साथ लेकर अनुशासित, करुणामय और आत्मविश्वासी विद्यार्थियों का निर्माण करता है।",
    "home.beginJourney": "यात्रा शुरू करें",
    "home.discoverUs": "हमारे बारे में जानें",
    // features
    "home.features.title": "विद्यालय क्यों चुनें",
    "home.features.sub": "एक विद्यालय जो बच्चे के मन, शरीर और आत्मा — तीनों का पोषण करता है।",
    "home.features.eyebrow": "हमें क्यों चुनें",
    "home.features.schoolLife": "विद्यालय जीवन",
    "home.feat1.title": "सहायक शिक्षण",
    "home.feat1.desc": "संतुलित शिक्षण, नियमित मार्गदर्शन और प्रत्येक बच्चे पर व्यक्तिगत ध्यान।",
    "home.feat2.title": "विज्ञान प्रयोगशाला",
    "home.feat2.desc": "सुसज्जित प्रयोगशालाएँ जो विज्ञान को व्यावहारिक, रोचक और सरल बनाती हैं।",
    "home.feat3.title": "कला एवं गतिविधियाँ",
    "home.feat3.desc": "संगीत, कला और रचनात्मक कार्यक्रम जो विद्यार्थियों को अभिव्यक्ति सिखाते हैं।",
    "home.feat4.title": "खेल एवं स्वास्थ्य",
    "home.feat4.desc": "स्वस्थ विकास के लिए मैदानी खेल, योग और फिटनेस गतिविधियाँ।",
    // stats
    "home.stat1.label": "वर्षों की विरासत",
    "home.stat2.label": "प्रसन्न विद्यार्थी",
    "home.stat3.label": "समर्पित शिक्षक",
    "home.stat4.label": "बोर्ड परिणाम",
    // quick links
    "home.quicklinks.title": "त्वरित पहुँच",
    "home.quicklinks.sub": "आपकी जरूरत की हर चीज़, यहीं मिलेगी।",
    "home.ql1.label": "सूचनाएं",
    "home.ql1.sub": "परिपत्र और अपडेट",
    "home.ql2.label": "शुल्क संरचना",
    "home.ql2.sub": "कक्षावार शुल्क",
    "home.ql3.label": "कैलेंडर",
    "home.ql3.sub": "परीक्षा और कार्यक्रम",
    "home.ql4.label": "प्रवेश",
    "home.ql4.sub": "2026–27 के लिए आवेदन",
    // announcements
    "home.announcements.title": "नवीनतम घोषणाएं",
    "home.announcements.sub": "विद्यालय की खबरों और कार्यक्रमों से अपडेट रहें।",
    "home.announcements.viewAll": "सभी देखें",
    "home.announcements.latest": "नवीनतम",
    // events
    "home.events.title": "आगामी कार्यक्रम",
    "home.events.sub": "महत्वपूर्ण आगामी तिथियाँ",
    "home.events.viewAll": "पूरा कैलेंडर",
    // cultural
    "home.cultural.quote": "\"हमें असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर ले चलो।\"",
    // testimonials
    "home.testimonials.title": "परिवारों की राय",
    "home.testimonials.sub": "हमारे विद्यालय समुदाय की आवाज़ें।",
    "home.test1.name": "अंजलि शर्मा",
    "home.test1.role": "अभिभावक, कक्षा VIII",
    "home.test1.text": "विद्यालय ने मेरी बेटी को आधुनिक विज्ञान का आत्मविश्वास और भारतीय संस्कारों की शोभा दी।",
    "home.test2.name": "राहुल अय्यर",
    "home.test2.role": "पूर्व छात्र, बैच 2018",
    "home.test2.text": "मेरे शिक्षकों ने केवल मेरी बुद्धि नहीं, बल्कि मेरे धर्म को भी गढ़ा। सदा आभारी हूँ।",
    "home.test3.name": "मीरा पटेल",
    "home.test3.role": "अभिभावक, कक्षा V",
    "home.test3.text": "त्योहार, संस्कृत, रोबोटिक्स — सब एक छत के नीचे। सच में भारत का विद्यालय।",
    // cta
    "home.cta.title": "विद्यालय परिवार में शामिल होने के लिए तैयार हैं?",
    "home.cta.sub": "2026–27 के लिए प्रवेश खुले हैं। आज पहला कदम उठाएं।",
    "home.cta.apply": "अभी आवेदन करें",
    "home.cta.contact": "संपर्क करें",
    // gallery
    "home.gallery.title": "विद्यालय में जीवन",
    "home.gallery.sub": "हमारे जीवंत विद्यालय समुदाय की एक झलक।",
    "home.gallery.l1": "परिसर जीवन",
    "home.gallery.l2": "शैक्षणिक",
    "home.gallery.l3": "प्रवेश",
    "home.gallery.l4": "उत्सव एवं कार्यक्रम",
    "home.gallery.l5": "संपर्क एवं समुदाय",
    "home.gallery.l6": "खेल एवं स्वास्थ्य",
    "home.gallery.l7": "विद्यालय गृह",
    // calendar
    "cal.heroTitle": "शैक्षणिक कैलेंडर",
    "cal.heroSubtitle": "परीक्षाएं, परिणाम, छुट्टियाँ, बैठकें और कार्यक्रम — पूरे शैक्षणिक वर्ष की एक झलक।",
    "cal.sectionTitle": "सभी कार्यक्रम",
    "cal.sectionSub": "अपनी जरूरत के अनुसार श्रेणी से फ़िल्टर करें।",
    "cal.filterAll": "सभी",
    "cal.filterExam": "परीक्षा",
    "cal.filterResult": "परिणाम",
    "cal.filterHoliday": "छुट्टी",
    "cal.filterMeeting": "बैठक",
    "cal.filterEvent": "कार्यक्रम",
    "cal.filterLeave": "अवकाश",
    "cal.until": "तक",
    "cal.noEvents": "इस श्रेणी में कोई कार्यक्रम नहीं।",
    "cal.cta.title": "अपडेट रहें",
    "cal.cta.sub": "कैलेंडर अपडेट, फोटो हाइलाइट्स और अभिभावक नोट्स के साथ मासिक न्यूज़लेटर के लिए सदस्यता लें।",
    // notices
    "notices.heroTitle": "सूचनाएं एवं परिपत्र",
    "notices.heroSubtitle": "आधिकारिक विद्यालय सूचनाएं, सरकारी परिपत्र और अत्यावश्यक घोषणाएं — सब एक जगह।",
    "notices.sectionTitle": "नवीनतम सूचनाएं",
    "notices.sectionSub": "विद्यालय प्रशासन और सरकार के नवीनतम अपडेट से अवगत रहें।",
    "notices.filterAll": "सभी",
    "notices.filterSchool": "विद्यालय सूचना",
    "notices.filterGovt": "सरकारी सूचना",
    "notices.filterUrgent": "अत्यावश्यक सूचना",
    "notices.download": "PDF डाउनलोड करें",
    "notices.noNotices": "इस श्रेणी में कोई सूचना नहीं।",
    // about page
    "about.heroTitle": "विद्यालय के बारे में",
    "about.heroSanskrit": "॥ सा विद्या या विमुक्तये ॥",
    "about.heroSubtitle": "2005 से भारतीय मूल्यों में निहित एक विद्यालय, जो जिज्ञासु मन और उदार हृदय का पोषण करता है।",
    "about.mvv.eyebrow": "॥ आधारशिला ॥",
    "about.mvv.title": "मिशन, दृष्टि और मूल्य",
    "about.mvv.subtitle": "तीन स्तंभ जो विद्यालय में हम जो कुछ भी करते हैं उसका मार्गदर्शन करते हैं।",
    "about.mission.title": "हमारा मिशन",
    "about.mission.desc": "आधुनिक शिक्षा और प्राचीन ज्ञान के मिश्रण से जिज्ञासु मन और उदार हृदय का पोषण करना।",
    "about.mission.footer": "हर बच्चे के लिए समग्र शिक्षा",
    "about.vision.title": "हमारी दृष्टि",
    "about.vision.desc": "एक ऐसी अग्रणी संस्था बनना जो सर्वांगीण, सांस्कृतिक रूप से समृद्ध और वैश्विक रूप से सक्षम नागरिक तैयार करे।",
    "about.vision.footer": "भारतीय जड़ों वाले वैश्विक नागरिक",
    "about.values.title": "हमारे मूल्य",
    "about.values.desc": "सत्यनिष्ठा, सम्मान, उत्कृष्टता, सेवा और सांस्कृतिक गर्व हमारे विद्यालय समुदाय की आधारशिला हैं।",
    "about.values.footer": "करियर से पहले चरित्र",
    "about.timeline.eyebrow": "॥ इतिहासः ॥",
    "about.timeline.title": "उत्कृष्टता के दो दशक",
    "about.timeline.subtitle": "एक छोटे विद्यालय से एक समृद्ध संस्था तक — हमारी विकास की कहानी।",
    "about.timeline.2005.title": "विद्यालय की स्थापना",
    "about.timeline.2005.desc": "120 विद्यार्थियों के साथ स्थापित, भारतीय मूल्यों को आधुनिक शिक्षा से जोड़ने की दृष्टि के साथ।",
    "about.timeline.2012.title": "परिसर विस्तार",
    "about.timeline.2012.desc": "बढ़ते समुदाय की सेवा के लिए नई विज्ञान प्रयोगशालाएं, खेल परिसर और डिजिटल पुस्तकालय जोड़े गए।",
    "about.timeline.2018.title": "बोर्ड उत्कृष्टता पुरस्कार",
    "about.timeline.2018.desc": "100% उत्तीर्ण दर और उत्कृष्ट छात्र उपलब्धियों के लिए राज्य बोर्ड द्वारा मान्यता प्राप्त।",
    "about.timeline.2023.title": "2400+ विद्यार्थी",
    "about.timeline.2023.desc": "आज हम 180+ समर्पित शिक्षकों के साथ 2400 से अधिक विद्यार्थियों की सेवा करते हैं।",
    "about.achievements.eyebrow": "॥ गौरवम् ॥",
    "about.achievements.title": "पुरस्कार और उपलब्धियां",
    "about.achievements.subtitle": "मील के पत्थर जो उत्कृष्टता के प्रति हमारी प्रतिबद्धता को दर्शाते हैं।",
    "about.achievement1.title": "राज्य बोर्ड टॉपर",
    "about.achievement1.desc": "हमारे विद्यार्थियों ने लगातार 5 वर्षों तक राज्य बोर्ड परीक्षाओं में शीर्ष स्थान प्राप्त किया।",
    "about.achievement2.title": "सर्वश्रेष्ठ विद्यालय पुरस्कार",
    "about.achievement2.desc": "राज्य शिक्षा विभाग द्वारा सांस्कृतिक शिक्षा में सर्वश्रेष्ठ विद्यालय का पुरस्कार।",
    "about.achievement3.title": "अंतर्राष्ट्रीय ओलंपियाड",
    "about.achievement3.desc": "15 विद्यार्थियों ने अंतर्राष्ट्रीय विज्ञान और गणित ओलंपियाड में भारत का प्रतिनिधित्व किया।",
    "about.achievement4.title": "हरित परिसर",
    "about.achievement4.desc": "सौर ऊर्जा और अपशिष्ट प्रबंधन पहल के लिए हरित परिसर प्रमाणित।",
    "about.facilities.eyebrow": "॥ विद्यालय परिसरः ॥",
    "about.facilities.title": "विश्वस्तरीय सुविधाएं",
    "about.facilities.subtitle": "सीखने और रचनात्मकता को प्रेरित करने के लिए डिज़ाइन किया गया आधुनिक बुनियादी ढांचा।",
    "about.facility1.title": "स्मार्ट कक्षाएं",
    "about.facility1.desc": "हर कमरे में इंटरैक्टिव बोर्ड, प्रोजेक्टर और हाई-स्पीड इंटरनेट।",
    "about.facility2.title": "विज्ञान एवं तकनीक प्रयोगशालाएं",
    "about.facility2.desc": "अत्याधुनिक भौतिकी, रसायन, जीव विज्ञान और कंप्यूटर प्रयोगशालाएं।",
    "about.facility3.title": "खेल परिसर",
    "about.facility3.desc": "क्रिकेट, बैडमिंटन, कबड्डी और योग के लिए ओलंपिक स्तर की सुविधाएं।",
    "about.facility4.title": "डिजिटल पुस्तकालय",
    "about.facility4.desc": "50,000+ पुस्तकें, डिजिटल अभिलेखागार और ई-लर्निंग संसाधन।",
    "about.facility5.title": "सभागार",
    "about.facility5.desc": "कार्यक्रमों, प्रदर्शनों और सभाओं के लिए 3000 सीटों की क्षमता वाला स्थान।",
    "about.facility6.title": "कैफेटेरिया",
    "about.facility6.desc": "स्वास्थ्य दिशानिर्देशों के अनुसार प्रतिदिन ताजा पौष्टिक भोजन।",
    "about.principal.quote": "शिक्षा केवल अकादमिक नहीं है — यह चरित्र निर्माण, लचीलापन बनाने और हर बच्चे में जिज्ञासा की भावना जगाने के बारे में है।",
    "about.principal.name": "डॉ. अरविंद कृष्णन",
    "about.principal.role": "प्रधानाचार्य, विद्यालय — 2005 से",
    "about.team.eyebrow": "॥ आचार्य मण्डलम् ॥",
    "about.team.title": "हमारी टीम से मिलें",
    "about.team.subtitle": "समर्पित शिक्षक जो हर कक्षा में जुनून और विशेषज्ञता लाते हैं।",
    "about.team1.name": "डॉ. अरविंद कृष्णन", "about.team1.role": "प्रधानाचार्य", "about.team1.expertise": "शिक्षा नेतृत्व और पाठ्यक्रम डिजाइन में 20+ वर्ष।",
    "about.team2.name": "श्रीमती सुनीता राव", "about.team2.role": "उप-प्रधानाचार्य", "about.team2.expertise": "छात्र परामर्श और समग्र विकास में विशेषज्ञ।",
    "about.team3.name": "श्री राजन पिल्लई",   "about.team3.role": "विज्ञान प्रमुख", "about.team3.expertise": "भौतिकी में पीएचडी, राष्ट्रीय ओलंपियाड मेंटर।",
    "about.team4.name": "सुश्री प्रिया नायर",  "about.team4.role": "कला प्रमुख", "about.team4.expertise": "शास्त्रीय नृत्यांगना और सांस्कृतिक कार्यक्रम निदेशक।",
    "about.team5.name": "श्री सुरेश कुमार",    "about.team5.role": "खेल निदेशक", "about.team5.expertise": "पूर्व राष्ट्रीय कबड्डी खिलाड़ी और फिटनेस कोच।",
    "about.team6.name": "श्रीमती कविता मेनन",  "about.team6.role": "भाषा प्रमुख", "about.team6.expertise": "संस्कृत विद्वान और बहुभाषी शिक्षा विशेषज्ञ।",
    // footer
    "footer.tagline": "जहाँ प्राचीन ज्ञान आधुनिक शिक्षा से मिलता है। भारत की समृद्ध विरासत के साथ हर बच्चे का पोषण।",
    "footer.quicklinks": "त्वरित लिंक",
    "footer.visit": "हमसे मिलें",
    "footer.copyright": "सर्वाधिकार सुरक्षित",
    "footer.blessing": "शुभम् भवतु · सर्वे भवन्तु सुखिनः",
    // ── Academics HI ──────────────────────────────────────────────────────────
    "academics.heroTitle": "शैक्षणिक उत्कृष्टता",
    "academics.heroSubtitle": "एक पाठ्यक्रम जो भारतीय ज्ञान का सम्मान करते हुए विद्यार्थियों को प्रतिस्पर्धी और करुणामय विश्व के लिए तैयार करता है।",
    "academics.statsPassRate": "बोर्ड उत्तीर्ण दर", "academics.statsUniversity": "विश्वविद्यालय प्रवेश / वर्ष",
    "academics.statsExperts": "विषय विशेषज्ञ", "academics.statsOlympiad": "ओलंपियाड पदक",
    "academics.pillarsEyebrow": "॥ शिक्षा स्तम्भाः ॥", "academics.pillarsTitle": "शिक्षा के चार स्तम्भ",
    "academics.pillarsSubtitle": "विद्यालय का प्रत्येक पाठ, गतिविधि और संवाद इन्हीं आधारशिलाओं पर निर्मित है।",
    "academics.pillar1Title": "आलोचनात्मक सोच", "academics.pillar1Desc": "सुकराती प्रश्नोत्तर, वाद-विवाद और समस्या-समाधान हर पाठ में समाहित।",
    "academics.pillar2Title": "STEM उत्कृष्टता", "academics.pillar2Desc": "समर्पित प्रयोगशालाएं, रोबोटिक्स क्लब और राष्ट्रीय विज्ञान ओलंपियाड कोचिंग।",
    "academics.pillar3Title": "रचनात्मक अभिव्यक्ति", "academics.pillar3Desc": "कला, संगीत, नाटक और शिल्प — मुख्य विषयों के रूप में, न कि अतिरिक्त।",
    "academics.pillar4Title": "सांस्कृतिक जड़ें", "academics.pillar4Desc": "संस्कृत, योग और भारतीय मूल्य सभी कक्षाओं में एकीकृत।",
    "academics.programsEyebrow": "॥ कार्यक्रमाः ॥", "academics.programsTitle": "शैक्षणिक कार्यक्रम",
    "academics.programsSubtitle": "कक्षा I से XII तक संरचित शिक्षा यात्रा, हर चरण पिछले पर आधारित।",
    "academics.prog1Level": "प्राथमिक", "academics.prog1Grades": "कक्षा I – V",
    "academics.prog1Desc": "गतिविधि-आधारित शिक्षा के माध्यम से साक्षरता, संख्या-ज्ञान और मूल्यों की आनंदमय नींव।",
    "academics.prog1h1": "कहानी-आधारित शिक्षा", "academics.prog1h2": "वैदिक गणित परिचय",
    "academics.prog1h3": "कला और संगीत एकीकरण", "academics.prog1h4": "योग और खेल",
    "academics.prog2Level": "मध्य विद्यालय", "academics.prog2Grades": "कक्षा VI – VIII",
    "academics.prog2Desc": "परियोजना कार्य, प्रयोगशाला और सह-पाठ्यक्रम गतिविधियों के साथ विषय-ज्ञान का विस्तार।",
    "academics.prog2h1": "विज्ञान प्रयोगशाला", "academics.prog2h2": "कोडिंग और रोबोटिक्स",
    "academics.prog2h3": "संस्कृत अध्ययन", "academics.prog2h4": "नेतृत्व गतिविधियाँ",
    "academics.prog3Level": "माध्यमिक", "academics.prog3Grades": "कक्षा IX – X",
    "academics.prog3Desc": "मार्गदर्शन, मॉक परीक्षा और करियर परामर्श के साथ कठोर CBSE बोर्ड तैयारी।",
    "academics.prog3h1": "बोर्ड परीक्षा कोचिंग", "academics.prog3h2": "करियर परामर्श",
    "academics.prog3h3": "शोध परियोजनाएं", "academics.prog3h4": "सामुदायिक सेवा",
    "academics.prog4Level": "वरिष्ठ माध्यमिक", "academics.prog4Grades": "कक्षा XI – XII",
    "academics.prog4Desc": "विशेषज्ञ शिक्षकों के साथ विज्ञान, वाणिज्य और मानविकी धाराएं।",
    "academics.prog4h1": "विज्ञान / वाणिज्य / कला", "academics.prog4h2": "प्रतियोगी परीक्षा तैयारी",
    "academics.prog4h3": "इंटर्नशिप अवसर", "academics.prog4h4": "कॉलेज मार्गदर्शन",
    "academics.cbseAffiliated": "CBSE संबद्ध", "academics.keyHighlights": "मुख्य विशेषताएं",
    "academics.subjectsEyebrow": "॥ विषयाः ॥", "academics.subjectsTitle": "हमारे विषय",
    "academics.subjectsSubtitle": "शिक्षा, कला और शारीरिक विकास को समेटने वाला व्यापक और संतुलित पाठ्यक्रम।",
    "academics.subj1Name": "वाक् विद्या — भाषाएं", "academics.subj1Desc": "अंग्रेजी, हिंदी, संस्कृत — संचार और सांस्कृतिक जड़ों का निर्माण।",
    "academics.subj2Name": "गणित शास्त्र — गणित", "academics.subj2Desc": "अंकगणित से कलन तक, वैदिक गणित संवर्धन के साथ।",
    "academics.subj3Name": "प्रकृति विज्ञान — विज्ञान", "academics.subj3Desc": "भौतिकी, रसायन, जीव विज्ञान — व्यावहारिक प्रयोगशाला सत्रों के साथ।",
    "academics.subj4Name": "धरती माता — सामाजिक अध्ययन", "academics.subj4Desc": "इतिहास, भूगोल, नागरिकशास्त्र — हमारी विरासत को समझना।",
    "academics.subj5Name": "यंत्र विद्या — कंप्यूटर विज्ञान", "academics.subj5Desc": "कोडिंग, रोबोटिक्स और आधुनिक युग की डिजिटल साक्षरता।",
    "academics.subj6Name": "शिल्प कला — कला और शिल्प", "academics.subj6Desc": "चित्रकला, रंगकला और पारंपरिक भारतीय कला रूप।",
    "academics.subj7Name": "गंधर्व — संगीत और नृत्य", "academics.subj7Desc": "शास्त्रीय और लोक परंपराएं, आधुनिक अभिव्यक्ति के साथ।",
    "academics.subj8Name": "शरीर धर्म — शारीरिक शिक्षा", "academics.subj8Desc": "योग, कबड्डी, एथलेटिक्स और टीम खेल — समग्र स्वास्थ्य के लिए।",
    "academics.quoteTrans": "\"ज्ञान विनम्रता देता है, विनम्रता से योग्यता आती है।\"",
    "academics.ctaBadge": "प्रवेश खुले हैं 2026–27", "academics.ctaTitle": "यात्रा शुरू करने के लिए तैयार हैं?",
    "academics.ctaSubtitle": "एक ऐसे विद्यालय में शामिल हों जहाँ परंपरा और उत्कृष्टता साथ चलती है।",
    "academics.ctaApply": "अभी आवेदन करें", "academics.ctaContact": "संपर्क करें",
    // ── Admissions HI ─────────────────────────────────────────────────────────
    "admissions.heroTitle": "हमारे विद्यालय में प्रवेश लें",
    "admissions.heroSubtitle": "हर बच्चे में एक दिव्य ज्योति है। हमें उसे एक पोषणकारी, मूल्य-आधारित वातावरण में चमकाने दें।",
    "admissions.stepsEyebrow": "॥ प्रक्रिया ॥", "admissions.stepsTitle": "सरल प्रवेश प्रक्रिया",
    "admissions.stepsSubtitle": "जिज्ञासा से नामांकन तक एक स्वागतपूर्ण मार्ग — केवल चार आसान चरण।",
    "admissions.step1Title": "जिज्ञासा", "admissions.step1Desc": "संपर्क करें और अपने बच्चे की रुचियाँ, कक्षा और प्रश्न साझा करें।",
    "admissions.step2Title": "आवेदन", "admissions.step2Desc": "ऑनलाइन फॉर्म भरें और आवश्यक दस्तावेज़ सुरक्षित रूप से अपलोड करें।",
    "admissions.step3Title": "मूल्यांकन", "admissions.step3Desc": "आपके बच्चे की शक्तियों को समझने के लिए एक अनौपचारिक, मैत्रीपूर्ण बातचीत।",
    "admissions.step4Title": "नामांकन", "admissions.step4Desc": "विद्यालय परिवार में आपका स्वागत है — एक पवित्र समारोह के साथ।",
    "admissions.whyEyebrow": "॥ विशेषताएं ॥", "admissions.whyTitle": "विद्यालय क्यों चुनें",
    "admissions.whySubtitle": "जो हमारे विद्यालय को आपके बच्चे के भविष्य के लिए सर्वोत्तम विकल्प बनाता है।",
    "admissions.why1Title": "समग्र विकास", "admissions.why1Desc": "हम एकीकृत शिक्षण दृष्टिकोण के माध्यम से मन, शरीर और आत्मा का पोषण करते हैं।", "admissions.why1StatLabel": "विद्यार्थी कल्याण फोकस",
    "admissions.why2Title": "विशेषज्ञ शिक्षक", "admissions.why2Desc": "समर्पित शिक्षक जो हर विद्यार्थी में सर्वश्रेष्ठ निकालने के लिए प्रतिबद्ध हैं।", "admissions.why2StatLabel": "योग्य शिक्षक",
    "admissions.why3Title": "समृद्ध पाठ्यक्रम", "admissions.why3Desc": "पारंपरिक ज्ञान और आधुनिक शिक्षा का संगम — समग्र विकास के लिए।", "admissions.why3StatLabel": "संबद्ध बोर्ड",
    "admissions.why4Title": "सिद्ध उत्कृष्टता", "admissions.why4Desc": "उत्कृष्ट शैक्षणिक परिणाम और समग्र विद्यार्थी उपलब्धियाँ।", "admissions.why4StatLabel": "बोर्ड उत्तीर्ण दर",
    "admissions.docsLabel": "आवश्यक दस्तावेज़", "admissions.docsTitle": "क्या लाएं",
    "admissions.doc1": "जन्म प्रमाण पत्र (मूल + फोटोकॉपी)", "admissions.doc2": "पिछले विद्यालय का स्थानांतरण प्रमाण पत्र",
    "admissions.doc3": "हाल की पासपोर्ट आकार की तस्वीरें (4)", "admissions.doc4": "बच्चे और माता-पिता का आधार कार्ड",
    "admissions.doc5": "पता प्रमाण (बिजली बिल / किराया समझौता)", "admissions.doc6": "पिछले वर्ष की शैक्षणिक रिपोर्ट कार्ड",
    "admissions.contactTitle": "प्रश्न हैं?",
    "admissions.formTitle": "प्रवेश के लिए आवेदन करें", "admissions.formSubtitle": "नीचे विवरण भरें और हम जल्द ही आपसे संपर्क करेंगे।",
    "admissions.formParent": "माता-पिता / अभिभावक का नाम", "admissions.formParentPlaceholder": "जैसे रमेश शर्मा",
    "admissions.formChild": "बच्चे का नाम", "admissions.formChildPlaceholder": "जैसे अर्जुन शर्मा",
    "admissions.formEmail": "ईमेल पता", "admissions.formEmailPlaceholder": "you@example.com", "admissions.formEmailError": "कृपया एक वैध ईमेल दर्ज करें।",
    "admissions.formPhone": "फ़ोन नंबर", "admissions.formPhonePlaceholder": "+91 98765 43210", "admissions.formPhoneError": "कृपया एक वैध फ़ोन नंबर दर्ज करें।",
    "admissions.formGrade": "किस कक्षा के लिए आवेदन", "admissions.formGradePlaceholder": "जैसे कक्षा VI",
    "admissions.formMessage": "अतिरिक्त संदेश", "admissions.formMessagePlaceholder": "कोई विशेष आवश्यकता या प्रश्न...", "admissions.formMessageOptional": "(वैकल्पिक)",
    "admissions.formSubmit": "आवेदन जमा करें", "admissions.formSubmitting": "जमा हो रहा है…",
    "admissions.successTitle": "आवेदन प्राप्त हुआ!", "admissions.successDesc": "विद्यालय में आवेदन के लिए धन्यवाद। हमारी प्रवेश टीम 2 कार्य दिवसों में आपसे संपर्क करेगी। 🪔", "admissions.successBtn": "एक और आवेदन जमा करें",
    "admissions.faqEyebrow": "॥ प्रश्नोत्तर ॥", "admissions.faqTitle": "अक्सर पूछे जाने वाले प्रश्न", "admissions.faqSubtitle": "हमारी प्रवेश प्रक्रिया के बारे में सामान्य प्रश्नों के उत्तर पाएं।",
    "admissions.faq1Q": "प्रवेश प्रक्रिया की समय-सीमा क्या है?", "admissions.faq1A": "प्रवेश प्रक्रिया आमतौर पर 2–3 सप्ताह लेती है। हम 5–7 दिनों के भीतर मूल्यांकन करते हैं और 48 घंटों के भीतर परिणाम सूचित करते हैं।",
    "admissions.faq2Q": "क्या कोई प्रवेश परीक्षा है?", "admissions.faq2A": "कक्षा 1–5 के लिए अनौपचारिक बातचीत होती है। कक्षा 6 और ऊपर के लिए बुनियादी अवधारणाओं का सरल मूल्यांकन होता है।",
    "admissions.faq3Q": "प्रवेश के लिए कौन से दस्तावेज़ आवश्यक हैं?", "admissions.faq3A": "जन्म प्रमाण पत्र, स्थानांतरण प्रमाण पत्र, तस्वीरें, आधार कार्ड, पता प्रमाण और पिछले शैक्षणिक रिकॉर्ड। सभी मूल और फोटोकॉपी के साथ जमा करें।",
    "admissions.faq4Q": "क्या भाई-बहन के लिए छूट उपलब्ध है?", "admissions.faq4A": "हाँ, दूसरे बच्चे के लिए 10% और तीसरे बच्चे के लिए 15% छूट मिलती है।",
    "admissions.faq5Q": "विद्यार्थी-शिक्षक अनुपात क्या है?", "admissions.faq5A": "हम 20:1 का स्वस्थ अनुपात बनाए रखते हैं। विशेष विषयों और प्रयोगशालाओं के लिए 15:1 तक कम है।",
    "admissions.faq6Q": "नए शैक्षणिक वर्ष के लिए प्रवेश कब खुलते हैं?", "admissions.faq6A": "2026–27 के लिए प्रवेश जनवरी में खुलते हैं और 31 मार्च तक बंद होते हैं। जल्दी आवेदन करें क्योंकि सीटें सीमित हैं।",
    "admissions.faq7Q": "क्या स्कूल बस या परिवहन सुविधा उपलब्ध है?", "admissions.faq7A": "हाँ, GPS-ट्रैक्ड स्कूल बसें शहर के प्रमुख मार्गों को कवर करती हैं। परिवहन शुल्क दूरी के आधार पर अलग से लिया जाता है।",
    "admissions.ctaTitle": "आज ही यात्रा शुरू करें", "admissions.ctaSubtitle": "2026–27 के लिए प्रवेश खुले हैं। हमारे द्वार से प्रवेश करें और विरासत को महसूस करें।",
    "admissions.ctaVisit": "भ्रमण निर्धारित करें", "admissions.ctaCall": "अभी कॉल करें",
  },
};
interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("vidyalaya-language");
    if (stored === "en" || stored === "hi") setLanguageState(stored);
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("vidyalaya-language", next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: (key) => messages[language][key] }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
