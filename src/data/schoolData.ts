// Shared data store — in a real app this would come from an API

export interface Announcement {
  id: number;
  title: string;
  body: string;
  titleHi?: string;
  bodyHi?: string;
  date: string;
  category: "General" | "Exam" | "Event" | "Holiday" | "Urgent";
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  category: "Exam" | "Result" | "Holiday" | "Meeting" | "Event" | "Leave";
  description: string;
  descriptionHi?: string;
  location?: string;
}

export interface Notice {
  id: number;
  title: string;
  body: string;
  titleHi?: string;
  bodyHi?: string;
  category: "School Notice" | "Government Notice" | "Urgent Notice";
  date: string;
  attachment?: string;
  attachmentName?: string;
}

export interface FeeRecord {
  id: number;
  className: string;
  tuition: string;
  admission: string;
  exam: string;
  other: string;
}

export const announcements: Announcement[] = [
  { id: 1, title: "Annual Sports Day – 15 Feb 2026", body: "All students must report in sports uniform by 7:30 AM.", date: "2026-01-10", category: "Event" },
  { id: 2, title: "Term 2 Exam Schedule Released", body: "Term 2 examinations commence from 10th February. Download the timetable from the Academics section.", date: "2026-01-08", category: "Exam" },
  { id: 3, title: "Republic Day Celebration – 26 Jan", body: "School will celebrate Republic Day with flag hoisting and cultural programme.", date: "2026-01-05", category: "Holiday" },
  { id: 4, title: "Admissions Open 2026–27", body: "Applications for the new academic year are now open. Last date: 31st January 2026.", date: "2026-01-01", category: "General" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 1, title: "Term 2 Exams Begin", date: "2026-02-10", endDate: "2026-02-20", category: "Exam", description: "Term 2 examinations for all classes.", location: "School Campus" },
  { id: 2, title: "Term 1 Results Declaration", date: "2026-01-20", category: "Result", description: "Term 1 results will be distributed to students.", location: "Respective Classrooms" },
  { id: 3, title: "Republic Day", date: "2026-01-26", category: "Holiday", description: "National holiday — flag hoisting and cultural programme." },
  { id: 4, title: "Parent-Teacher Meeting", date: "2026-02-05", category: "Meeting", description: "PTM for Classes VI–X.", location: "School Hall" },
  { id: 5, title: "Annual Sports Day", date: "2026-02-15", category: "Event", description: "Yoga showcase, kabaddi finals and athletics championship.", location: "School Ground" },
  { id: 6, title: "Holi – School Closed", date: "2026-03-08", category: "Holiday", description: "School closed for Holi festival." },
  { id: 7, title: "Summer Vacation Begins", date: "2026-04-25", endDate: "2026-06-10", category: "Leave", description: "Summer vacation for all students." },
  { id: 8, title: "Annual Day", date: "2026-04-20", category: "Event", description: "Grand cultural showcase by every grade.", location: "School Auditorium" },
  { id: 9, title: "Board Exam – Class X", date: "2026-03-01", endDate: "2026-03-20", category: "Exam", description: "CBSE Board examinations for Class X students." },
];

export const notices: Notice[] = [
  { id: 1, title: "Term 2 Examination Schedule", body: "Term 2 examinations will commence from 10th February 2026. All students must carry their hall tickets.", category: "School Notice", date: "2026-01-12" },
  { id: 2, title: "Government Circular – RTE Compliance", body: "All schools must comply with RTE norms for the academic year 2025–26 as per the government directive.", category: "Government Notice", date: "2026-01-09" },
  { id: 3, title: "Emergency Holiday – 15 Jan", body: "School will remain closed on 15th January 2026 due to local civic body elections.", category: "Urgent Notice", date: "2026-01-08" },
  { id: 4, title: "Annual Sports Day Notice", body: "All students participating in Sports Day events must submit their consent forms by 5th February.", category: "School Notice", date: "2026-01-06" },
  { id: 5, title: "Fee Payment Reminder", body: "Term 2 fees are due by 31st January 2026. Late payment will attract a fine of ₹100 per week.", category: "Urgent Notice", date: "2026-01-04" },
];

export const feeRecords: FeeRecord[] = [
  { id: 1, className: "Class I – II", tuition: "₹2,500/month", admission: "₹5,000", exam: "₹800", other: "₹500" },
  { id: 2, className: "Class III – V", tuition: "₹3,000/month", admission: "₹5,000", exam: "₹1,000", other: "₹500" },
  { id: 3, className: "Class VI – VIII", tuition: "₹3,500/month", admission: "₹6,000", exam: "₹1,200", other: "₹600" },
  { id: 4, className: "Class IX – X", tuition: "₹4,000/month", admission: "₹7,000", exam: "₹1,500", other: "₹700" },
  { id: 5, className: "Class XI – XII", tuition: "₹4,500/month", admission: "₹8,000", exam: "₹1,800", other: "₹800" },
];
