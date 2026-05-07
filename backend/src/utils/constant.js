
export const emailRegex = [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is incorrect. Use a valid format such as name@example.com (e.g., jane.smith@gmail.com) .']

export const userRoles = {
    ADMIN : "Admin"
}

export const userRoleEnums = Object.values(userRoles)


export const TEMPORARY_TOKEN_EXPIRY =  15 * 60 * 1000;


export const announcementCategory = {
  GENERAL : "General",
  EXAM : "Exam",
  EVENT : "Event",
  HOLIDAY : "Holiday",
  URGENT : "Urgent"
}

export const announcementCategoryEnums = Object.values(announcementCategory)

export const eventCategory = {
  EVENT  : "Event",
  RESULT : "Result",
  EXAM : "Exam",
  HOLIDAY : "Holiday",
  MEETING : "Meeting",
  LEAVE : "Leave",
  SPORTS : "Sports"
}

export const eventCategoryEnums = Object.values(eventCategory)


export const admissionStatus = {
  PENDING : "Pending",
  ACCEPT : "Accept",
  REJECT : "Reject",
  REVIEWED : "Reviewed"
}

export const admissionStatusEnums = Object.values(admissionStatus)


export const galleryCategory = {
  CAMPUS : "Campus",
  ACADEMICS : "Academics",
  ADMISSIONS : "Admissions",
  EVENTS : "Events",
  COMMUNITY : "Community",
  SPORTS : "Sports"
}

export const galleryCategoryEnums = Object.values(galleryCategory)


export const noticeCategory = {
  SCHOOL_NOTICE : "School Notice",
  GOVERNMENT_NOTICE : "Government Notice",
  URGENT_NOTICE : "Urgent Notice"
}

export const noticeCategoryEnums = Object.values(noticeCategory)


const feeStructureClassGradeType = {
    CLASS_I_II : "Class I - II",
    CLASS_III_IV : "Class III - IV",
    CLASS_V_VI : "Class V_VI",
    CLASS_VII_VIII : "Class VII_VIII",
    CLASS_IX_X : "Class IX_X",
    CLASS_XI_XII : "Class XI_XII",
}

export const feeStructureClassGradeTypeEnums = Object.values(feeStructureClassGradeType)
