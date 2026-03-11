import {
  Ambassador,
  AskResponse,
  AvailabilityStatus,
  Conversation,
  KnowledgeBaseEntry,
  Meeting,
  MeetingDuration,
  MeetingType,
  Message,
  SavedAmbassador,
  TimeSlot,
  User
} from "@/lib/types";

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f4efe7,bf5700,d7e8ef`;

const SLOT_TIMES = [
  { hour: 14, minute: 0 },
  { hour: 14, minute: 30 },
  { hour: 15, minute: 0 },
  { hour: 15, minute: 30 },
  { hour: 16, minute: 0 },
  { hour: 16, minute: 30 }
] as const;

const availabilitySeeds: Record<string, string[]> = {
  "amb-aaliyah": ["2026-03-12"],
  "amb-marcos": ["2026-03-13"],
  "amb-sana": ["2026-03-14"],
  "amb-nina": ["2026-03-12"],
  "amb-noah": ["2026-03-15"],
  "amb-priya": ["2026-03-16"],
  "amb-jaden": ["2026-03-13"],
  "amb-elena": ["2026-03-14"]
};

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function toLocalIso(day: string, hour: number, minute: number) {
  return `${day}T${pad(hour)}:${pad(minute)}:00-05:00`;
}

function addMinutes(value: string, minutes: number) {
  return new Date(new Date(value).getTime() + minutes * 60_000).toISOString();
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function makeSlotLabel(start: string, end: string) {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

function buildDailySlots(day: string): TimeSlot[] {
  return SLOT_TIMES.map((slot, index) => {
    const start = toLocalIso(day, slot.hour, slot.minute);
    const end = addMinutes(start, 30);

    return {
      id: `${day}-${index + 1}`,
      start,
      end,
      label: makeSlotLabel(start, end),
      status: "available"
    };
  });
}

function overlaps(slot: TimeSlot, meeting: Meeting) {
  return new Date(slot.start) < new Date(meeting.endTime) && new Date(slot.end) > new Date(meeting.startTime);
}

function generateMeetingLink(ambassadorName: string, topic: string) {
  const token = `${ambassadorName}-${topic}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);

  return `https://meet.google.com/${token || "ut-ambassador-ai"}`;
}

export const studentUser: User = {
  id: "student-maya",
  name: "Maya Patel",
  email: "maya@utexas.edu",
  role: "student",
  avatarUrl: avatar("Maya Patel"),
  major: "Interested in Computer Science",
  year: "Prospective student",
  interests: ["Housing", "Campus Life", "Research", "First-Year Experience"],
  bio: "Exploring campus life, student community, and academic support at UT Austin.",
  createdAt: "2026-01-10T09:00:00Z"
};

export const adminUser: User = {
  id: "admin-olivia",
  name: "Olivia Ward",
  email: "olivia@utexas.edu",
  role: "admin",
  avatarUrl: avatar("Olivia Ward"),
  major: "Student Affairs",
  year: "Staff",
  interests: ["Community", "Operations"],
  bio: "Admin lead for ambassador operations and knowledge content.",
  createdAt: "2025-11-01T09:00:00Z"
};

export const ambassadors: Ambassador[] = [
  {
    id: "amb-aaliyah",
    name: "Aaliyah Chen",
    email: "aaliyah@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    program: "McCombs School of Business",
    major: "MSITM",
    year: "First-year",
    interests: ["Career", "Research", "Housing"],
    bio: "MSITM ambassador helping prospective students understand the balance between analytics, product thinking, and career outcomes in Austin.",
    createdAt: "2025-08-14T09:00:00Z",
    residenceHall: "Jester East",
    clubs: ["McCombs Graduate Women in Business", "Texas Consulting"],
    expertiseTags: ["Research", "Housing", "Career", "Faculty"],
    graduationYear: "2027",
    careerBackground: "Former product analyst transitioning into enterprise AI and digital strategy.",
    linkedinUrl: "https://www.linkedin.com/in/aaliyah-chen-ut",
    nationality: "United States",
    defaultMeetingLocation: "PCL Collaboration Zone",
    isActive: true
  },
  {
    id: "amb-marcos",
    name: "Marcos Alvarez",
    email: "marcos@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    program: "McCombs School of Business",
    major: "MSBA",
    year: "Second-year",
    interests: ["Courses", "Faculty", "Career"],
    bio: "MSBA ambassador focused on the curriculum, technical coursework, and how students position themselves for data and analytics roles.",
    createdAt: "2025-08-18T09:00:00Z",
    residenceHall: "Off Campus",
    clubs: ["Data Analytics Society", "Graduate Business Council"],
    expertiseTags: ["Courses", "Faculty", "Career", "Austin"],
    graduationYear: "2026",
    careerBackground: "Former business intelligence engineer with healthcare analytics experience.",
    linkedinUrl: "https://www.linkedin.com/in/marcos-alvarez-ut",
    nationality: "Mexico",
    defaultMeetingLocation: "Life Science Library Atrium",
    isActive: true
  },
  {
    id: "amb-sana",
    name: "Sana Siddiqui",
    email: "sana@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    program: "McCombs School of Business",
    major: "MSITM",
    year: "First-year",
    interests: ["Faculty", "Career", "Austin"],
    bio: "MSITM ambassador sharing how the program connects technology management with consulting, product, and startup opportunities in Austin.",
    createdAt: "2025-08-19T09:00:00Z",
    residenceHall: "Kinsolving",
    clubs: ["Texas Consulting", "Women in Business"],
    expertiseTags: ["Career", "Faculty", "Austin", "Courses"],
    graduationYear: "2028",
    careerBackground: "Former Salesforce technical lead exploring product management and AI roles.",
    linkedinUrl: "https://www.linkedin.com/in/sana-siddiqui-ut",
    nationality: "Pakistan",
    defaultMeetingLocation: "McCombs CBA Atrium",
    isActive: true
  },
  {
    id: "amb-nina",
    name: "Nina Flores",
    email: "nina@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg",
    program: "McCombs School of Business",
    major: "MSM",
    year: "First-year",
    interests: ["Austin", "Housing", "Career"],
    bio: "MSM ambassador focused on student life, recruiting preparation, and how to make the most of one intense year in Austin.",
    createdAt: "2025-08-20T09:00:00Z",
    residenceHall: "Dobie Twenty21",
    clubs: ["Graduate Business Council", "Longhorn Wellness"],
    expertiseTags: ["Austin", "Housing", "Career", "Faculty"],
    graduationYear: "2027",
    careerBackground: "Former admissions coordinator pivoting into marketing and brand strategy.",
    linkedinUrl: "https://www.linkedin.com/in/nina-flores-ut",
    nationality: "United States",
    defaultMeetingLocation: "WCP Student Lounge",
    isActive: true
  },
  {
    id: "amb-noah",
    name: "Noah Reynolds",
    email: "noah@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    program: "McCombs School of Business",
    major: "MSF",
    year: "Second-year",
    interests: ["Courses", "Career", "Austin"],
    bio: "MSF ambassador helping students understand the pace of the finance curriculum, recruiting timelines, and living near downtown Austin.",
    createdAt: "2025-08-20T09:00:00Z",
    residenceHall: "Off Campus",
    clubs: ["Finance Association", "Graduate Business Council"],
    expertiseTags: ["Courses", "Career", "Austin", "Faculty"],
    graduationYear: "2026",
    careerBackground: "Former corporate banking analyst mentoring students targeting finance and consulting roles.",
    linkedinUrl: "https://www.linkedin.com/in/noah-reynolds-ut",
    nationality: "United States",
    defaultMeetingLocation: "BMC Courtyard",
    isActive: true
  },
  {
    id: "amb-priya",
    name: "Priya Raman",
    email: "priya@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    program: "McCombs School of Business",
    major: "MSBA",
    year: "First-year",
    interests: ["Research", "Faculty", "Courses"],
    bio: "MSBA ambassador supporting students who care about analytics coursework, applied projects, and faculty-led research opportunities.",
    createdAt: "2025-08-21T09:00:00Z",
    residenceHall: "San Jacinto",
    clubs: ["Analytics Fellows", "Engineers Without Borders"],
    expertiseTags: ["Research", "Faculty", "Courses", "Career"],
    graduationYear: "2027",
    careerBackground: "Former manufacturing engineer transitioning into analytics and operations strategy.",
    linkedinUrl: "https://www.linkedin.com/in/priya-raman-ut",
    nationality: "India",
    defaultMeetingLocation: "ETC Makerspace Lobby",
    isActive: true
  },
  {
    id: "amb-jaden",
    name: "Jaden Brooks",
    email: "jaden@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    program: "McCombs School of Business",
    major: "MSM",
    year: "Second-year",
    interests: ["Austin", "Career", "Housing"],
    bio: "MSM ambassador helping students compare Austin neighborhoods, campus life, and the career-switching support built into the program.",
    createdAt: "2025-08-23T09:00:00Z",
    residenceHall: "Off Campus",
    clubs: ["Graduate Business Council", "ColorStack"],
    expertiseTags: ["Austin", "Housing", "Career", "Courses"],
    graduationYear: "2026",
    careerBackground: "Former startup operator focused on growth and go-to-market strategy.",
    linkedinUrl: "https://www.linkedin.com/in/jaden-brooks-ut",
    nationality: "United States",
    defaultMeetingLocation: "GDC Atrium",
    isActive: true
  },
  {
    id: "amb-elena",
    name: "Elena Gutierrez",
    email: "elena@utexas.edu",
    role: "ambassador",
    avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    program: "McCombs School of Business",
    major: "MSF",
    year: "First-year",
    interests: ["Housing", "Faculty", "Career"],
    bio: "MSF ambassador helping incoming students understand finance recruiting, faculty access, and practical housing choices near campus.",
    createdAt: "2025-08-24T09:00:00Z",
    residenceHall: "Moore-Hill",
    clubs: ["Finance Association", "Students for Wellness"],
    expertiseTags: ["Housing", "Faculty", "Career", "Austin"],
    graduationYear: "2028",
    careerBackground: "Former private wealth associate focused on investment and client advisory careers.",
    linkedinUrl: "https://www.linkedin.com/in/elena-gutierrez-ut",
    nationality: "United States",
    defaultMeetingLocation: "Student Services Building",
    isActive: true
  }
];

export const ambassadorUser = ambassadors.find((ambassador) => ambassador.id === "amb-marcos")!;

export const knowledgeBaseEntries: KnowledgeBaseEntry[] = [
  {
    id: "kb-1",
    title: "What is the main focus of the Master of Science in Information and Technology Management curriculum?",
    category: "Curriculum",
    content:
      "The MSITM curriculum is built around AI Foundations, Data and Cloud Engineering, and Business Strategy and Execution. Students build expertise in AI, advanced programming, cloud-native development, IT strategy, product management, governance, and ethical leadership through hands-on work and a required capstone.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-2",
    title: "How long does it take to complete the Texas McCombs MSITM program?",
    category: "Program Format",
    content:
      "The program is a full-time, 10-month curriculum that starts in early July and finishes in May. Students complete summer core courses, then move through fall and spring semesters with electives and a required capstone in the final term.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-3",
    title: "Is the Texas McCombs MSITM program STEM-designated?",
    category: "International",
    content:
      "Yes. MSITM is officially STEM-designated. For international students, that supports a 24-month OPT extension, which can result in up to 36 months of work authorization after graduation.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-4",
    title: "What materials are required to apply to the Texas McCombs MSITM program?",
    category: "Admissions",
    content:
      "Applicants submit the online application form, resume or CV, two written essays, one video assessment, two recommendation letters, official transcripts, English proficiency scores if required, and optional GRE or GMAT scores.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-5",
    title: "How much does the program cost?",
    category: "Tuition",
    content:
      "Current tuition is approximately $54,000 for Texas residents and $58,000 for out-of-state residents for the full 10-month program. Books, software, living costs, laptops, and optional fees are separate, and admitted students must pay a non-refundable $2,000 pre-enrollment tuition fee to secure their seat.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-6",
    title: "What kinds of careers do Texas McCombs MSITM graduates pursue, and what are their average starting salaries?",
    category: "Careers",
    content:
      "Graduates move into roles such as AI forward deployed engineer, data engineer, machine learning engineer, cloud engineer, business analyst, data analyst, IT project manager, product manager, and technology consultant. The average salary for the Class of 2025 after graduation was about $110,000.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-7",
    title: "Who is the ideal applicant for the Texas McCombs MSITM program?",
    category: "Admissions",
    content:
      "The ideal applicant is a recent graduate or early-career professional who wants to use technology to solve business and societal problems. Strong candidates typically show programming and database skills, curiosity, resilience, teamwork, communication, and a record of building or applying technical solutions.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  },
  {
    id: "kb-8",
    title: "Are GRE or GMAT scores required for admission to the Texas McCombs MSITM program?",
    category: "Admissions",
    content:
      "No. GRE and GMAT scores are optional for all Texas McCombs Master of Science programs, including MSITM. Applications are fully considered with or without scores, although applicants can submit them if they believe the scores strengthen their profile.",
    source: "MSITM FAQ",
    updatedAt: "2026-03-11"
  }
];

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    participantIds: ["student-maya", "amb-aaliyah"],
    createdAt: "2026-03-08T10:00:00Z",
    updatedAt: "2026-03-10T12:00:00Z"
  },
  {
    id: "conv-2",
    participantIds: ["student-maya", "amb-marcos"],
    createdAt: "2026-03-08T12:00:00Z",
    updatedAt: "2026-03-10T15:00:00Z"
  },
  {
    id: "conv-3",
    participantIds: ["student-maya", "assistant-ai"],
    createdAt: "2026-03-09T09:00:00Z",
    updatedAt: "2026-03-10T16:00:00Z"
  },
  {
    id: "conv-4",
    participantIds: ["student-maya", "amb-priya"],
    createdAt: "2026-03-07T11:00:00Z",
    updatedAt: "2026-03-08T10:30:00Z"
  },
  {
    id: "conv-5",
    participantIds: ["student-maya", "amb-elena"],
    createdAt: "2026-03-06T14:00:00Z",
    updatedAt: "2026-03-07T13:30:00Z"
  },
  {
    id: "conv-6",
    participantIds: ["student-maya", "amb-jaden"],
    createdAt: "2026-03-06T16:00:00Z",
    updatedAt: "2026-03-09T09:30:00Z"
  }
];

export const messages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "student-maya",
    senderType: "student",
    content: "Hi, I’m trying to understand what dorm life is really like.",
    createdAt: "2026-03-10T11:10:00Z"
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "amb-aaliyah",
    senderType: "ambassador",
    content: "Jester is busy and social. It helps a lot if you want friends and easy dining hall access.",
    createdAt: "2026-03-10T11:14:00Z"
  },
  {
    id: "msg-3",
    conversationId: "conv-2",
    senderId: "student-maya",
    senderType: "student",
    content: "Do students find pre-med support overwhelming at first?",
    createdAt: "2026-03-10T12:40:00Z"
  },
  {
    id: "msg-4",
    conversationId: "conv-2",
    senderId: "amb-marcos",
    senderType: "ambassador",
    content: "It can feel like a lot, but a good weekly routine and the right orgs make it manageable.",
    createdAt: "2026-03-10T12:48:00Z"
  },
  {
    id: "msg-5",
    conversationId: "conv-3",
    senderId: "assistant-ai",
    senderType: "ai",
    content:
      "Campus life at UT Austin centers on organizations, traditions, and finding the communities that fit your pace.",
    createdAt: "2026-03-10T14:10:00Z"
  },
  {
    id: "msg-6",
    conversationId: "conv-4",
    senderId: "amb-priya",
    senderType: "ambassador",
    content: "If you like engineering projects, the makerspaces are worth seeing early.",
    createdAt: "2026-03-08T10:30:00Z"
  }
];

export let meetings: Meeting[] = [
  {
    id: "meet-1",
    studentId: "student-maya",
    ambassadorId: "amb-aaliyah",
    topic: "Housing overview",
    meetingType: "virtual",
    durationMinutes: 30,
    startTime: "2026-03-12T14:00:00-05:00",
    endTime: "2026-03-12T14:30:00-05:00",
    status: "confirmed",
    meetingLink: generateMeetingLink("Aaliyah Chen", "Housing overview"),
    createdAt: "2026-03-08T10:00:00Z"
  },
  {
    id: "meet-2",
    studentId: "student-maya",
    ambassadorId: "amb-marcos",
    topic: "Pre-med planning",
    meetingType: "in_person",
    durationMinutes: 60,
    startTime: "2026-03-13T15:00:00-05:00",
    endTime: "2026-03-13T16:00:00-05:00",
    status: "pending",
    location: "Life Science Library Atrium",
    createdAt: "2026-03-08T11:00:00Z"
  },
  {
    id: "meet-3",
    studentId: "student-maya",
    ambassadorId: "amb-sana",
    topic: "Business clubs",
    meetingType: "virtual",
    durationMinutes: 30,
    startTime: "2026-03-14T14:00:00-05:00",
    endTime: "2026-03-14T14:30:00-05:00",
    status: "declined",
    meetingLink: generateMeetingLink("Sana Siddiqui", "Business clubs"),
    createdAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "meet-4",
    studentId: "student-maya",
    ambassadorId: "amb-nina",
    topic: "Campus community",
    meetingType: "virtual",
    durationMinutes: 60,
    startTime: "2026-03-12T14:30:00-05:00",
    endTime: "2026-03-12T15:30:00-05:00",
    status: "confirmed",
    meetingLink: generateMeetingLink("Nina Flores", "Campus community"),
    createdAt: "2026-03-09T10:00:00Z"
  },
  {
    id: "meet-5",
    studentId: "student-maya",
    ambassadorId: "amb-noah",
    topic: "Campus jobs",
    meetingType: "in_person",
    durationMinutes: 30,
    startTime: "2026-03-15T16:00:00-05:00",
    endTime: "2026-03-15T16:30:00-05:00",
    status: "pending",
    location: "BMC Courtyard",
    createdAt: "2026-03-09T12:00:00Z"
  },
  {
    id: "meet-6",
    studentId: "student-maya",
    ambassadorId: "amb-priya",
    topic: "Engineering research",
    meetingType: "virtual",
    durationMinutes: 30,
    startTime: "2026-03-16T14:00:00-05:00",
    endTime: "2026-03-16T14:30:00-05:00",
    status: "cancelled",
    meetingLink: generateMeetingLink("Priya Raman", "Engineering research"),
    createdAt: "2026-02-28T10:00:00Z"
  },
  {
    id: "meet-7",
    studentId: "student-maya",
    ambassadorId: "amb-jaden",
    topic: "CS clubs",
    meetingType: "virtual",
    durationMinutes: 30,
    startTime: "2026-03-13T15:30:00-05:00",
    endTime: "2026-03-13T16:00:00-05:00",
    status: "confirmed",
    meetingLink: generateMeetingLink("Jaden Brooks", "CS clubs"),
    createdAt: "2026-03-09T14:00:00Z"
  },
  {
    id: "meet-8",
    studentId: "student-maya",
    ambassadorId: "amb-elena",
    topic: "First-year transition",
    meetingType: "in_person",
    durationMinutes: 30,
    startTime: "2026-03-14T15:00:00-05:00",
    endTime: "2026-03-14T15:30:00-05:00",
    status: "declined",
    location: "Student Services Building",
    createdAt: "2026-03-09T15:00:00Z"
  }
];

export const savedAmbassadors: SavedAmbassador[] = [
  { id: "save-1", studentId: "student-maya", ambassadorId: "amb-aaliyah", createdAt: "2026-03-09T10:00:00Z" },
  { id: "save-2", studentId: "student-maya", ambassadorId: "amb-priya", createdAt: "2026-03-09T11:00:00Z" },
  { id: "save-3", studentId: "student-maya", ambassadorId: "amb-nina", createdAt: "2026-03-09T12:00:00Z" }
];

export const categories = ["Admissions", "Housing", "Academics", "Campus Life", "Clubs"] as const;

export function getAmbassadorById(id: string) {
  return ambassadors.find((ambassador) => ambassador.id === id);
}

export function getConversationMessages(conversationId: string) {
  return messages.filter((message) => message.conversationId === conversationId);
}

export function getConversationsWithMeta() {
  return conversations.map((conversation) => {
    const participantId = conversation.participantIds.find((id) => id !== studentUser.id) ?? "assistant-ai";
    const ambassador = getAmbassadorById(participantId);
    const lastMessage = getConversationMessages(conversation.id).at(-1);

    return {
      ...conversation,
      title: ambassador?.name ?? "AmbassadorAI",
      avatarUrl: ambassador?.avatarUrl ?? avatar("AmbassadorAI"),
      preview: lastMessage?.content ?? "Start the conversation",
      lastMessageAt: lastMessage?.createdAt ?? conversation.updatedAt
    };
  });
}

export function getMeetingById(id: string) {
  return meetings.find((meeting) => meeting.id === id);
}

export function getStudentMeetings(studentId = studentUser.id) {
  return meetings.filter((meeting) => meeting.studentId === studentId);
}

export function getMeetingsForAmbassador(ambassadorId: string) {
  return meetings.filter((meeting) => meeting.ambassadorId === ambassadorId);
}

export function getAmbassadorAvailability(ambassadorId: string): TimeSlot[] {
  const slots = (availabilitySeeds[ambassadorId] ?? []).flatMap((day) => buildDailySlots(day));
  const blockingMeetings = getMeetingsForAmbassador(ambassadorId).filter(
    (meeting) => meeting.status === "pending" || meeting.status === "confirmed"
  );

  return slots.map((slot) => {
    const meeting = blockingMeetings.find((item) => overlaps(slot, item));
    if (!meeting) {
      return slot;
    }

    const status: AvailabilityStatus = meeting.status === "confirmed" ? "booked" : "pending";
    return {
      ...slot,
      status,
      meetingId: meeting.id,
      meetingStatus: meeting.status
    };
  });
}

function validateRequestedWindow(ambassadorId: string, startTime: string, durationMinutes: MeetingDuration) {
  const slots = getAmbassadorAvailability(ambassadorId);
  const startIndex = slots.findIndex((slot) => slot.start === startTime);
  const slotCount = durationMinutes / 30;
  const requestedSlots = startIndex >= 0 ? slots.slice(startIndex, startIndex + slotCount) : [];

  if (requestedSlots.length !== slotCount) {
    throw new Error("Selected duration extends past the ambassador's availability.");
  }

  const firstDay = requestedSlots[0]?.start.slice(0, 10);
  const validWindow = requestedSlots.every((slot, index) => {
    const previous = requestedSlots[index - 1];
    return (
      slot.status === "available" &&
      slot.start.slice(0, 10) === firstDay &&
      (!previous || new Date(previous.end).getTime() === new Date(slot.start).getTime())
    );
  });

  if (!validWindow) {
    throw new Error("Selected time is no longer available.");
  }

  return {
    start: requestedSlots[0].start,
    end: requestedSlots.at(-1)!.end
  };
}

export function addMeetingRequest(input: {
  studentId?: string;
  ambassadorId: string;
  startTime: string;
  durationMinutes: MeetingDuration;
  meetingType: MeetingType;
  topic?: string;
}) {
  const ambassador = getAmbassadorById(input.ambassadorId);
  if (!ambassador) {
    throw new Error("Ambassador not found.");
  }

  const window = validateRequestedWindow(input.ambassadorId, input.startTime, input.durationMinutes);
  const topic = input.topic?.trim() || "Campus mentorship session";

  const meeting: Meeting = {
    id: `meet-${meetings.length + 1}`,
    studentId: input.studentId ?? studentUser.id,
    ambassadorId: input.ambassadorId,
    topic,
    meetingType: input.meetingType,
    durationMinutes: input.durationMinutes,
    startTime: window.start,
    endTime: window.end,
    status: "pending",
    meetingLink: input.meetingType === "virtual" ? generateMeetingLink(ambassador.name, topic) : undefined,
    location:
      input.meetingType === "virtual"
        ? undefined
        : input.meetingType === "campus_tour"
          ? `Campus tour meet-up: ${ambassador.defaultMeetingLocation ?? "Main UT Austin welcome area"}`
          : ambassador.defaultMeetingLocation,
    createdAt: new Date().toISOString()
  };

  meetings = [meeting, ...meetings];
  return meeting;
}

export function respondToMeetingRequest(meetingId: string, action: "confirm" | "decline") {
  const current = getMeetingById(meetingId);
  if (!current) {
    throw new Error("Meeting request not found.");
  }

  const nextStatus = action === "confirm" ? "confirmed" : "declined";
  meetings = meetings.map((meeting) => (meeting.id === meetingId ? { ...meeting, status: nextStatus } : meeting));

  return getMeetingById(meetingId)!;
}

export function getDashboardData() {
  return {
    upcomingMeetings: getStudentMeetings()
      .filter((meeting) => meeting.status === "pending" || meeting.status === "confirmed")
      .sort((left, right) => +new Date(left.startTime) - +new Date(right.startTime))
      .slice(0, 4),
    recentChats: getConversationsWithMeta().slice(0, 4),
    saved: savedAmbassadors
      .map((saved) => getAmbassadorById(saved.ambassadorId))
      .filter(Boolean) as Ambassador[],
    recommended: getAmbassadorMatches(studentUser.interests.join(" ")).slice(0, 4)
  };
}

export function getAmbassadorDashboardData(ambassadorId = ambassadorUser.id) {
  const availability = getAmbassadorAvailability(ambassadorId);
  const ambassadorMeetings = getMeetingsForAmbassador(ambassadorId).sort(
    (left, right) => +new Date(left.startTime) - +new Date(right.startTime)
  );

  return {
    ambassador: getAmbassadorById(ambassadorId),
    pendingRequests: ambassadorMeetings.filter((meeting) => meeting.status === "pending"),
    upcomingConfirmed: ambassadorMeetings.filter((meeting) => meeting.status === "confirmed"),
    availability,
    stats: {
      openSlots: availability.filter((slot) => slot.status === "available").length,
      pendingSlots: availability.filter((slot) => slot.status === "pending").length,
      bookedSlots: availability.filter((slot) => slot.status === "booked").length
    }
  };
}

export function getAmbassadorMatches(query: string) {
  const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return ambassadors
    .map((ambassador) => {
      const haystack = [
        ambassador.program,
        ambassador.major,
        ambassador.bio,
        ambassador.residenceHall,
        ambassador.careerBackground,
        ambassador.nationality,
        ...ambassador.expertiseTags,
        ...ambassador.clubs,
        ...ambassador.interests
      ]
        .join(" ")
        .toLowerCase();

      const score = tokens.reduce((count, token) => count + Number(haystack.includes(token)), 0);
      return { ambassador, score };
    })
    .sort((left, right) => right.score - left.score)
    .map((item) => item.ambassador);
}

export function askCampusQuestion(question: string): AskResponse {
  const normalized = question.toLowerCase();
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "is",
    "are",
    "do",
    "does",
    "to",
    "for",
    "of",
    "in",
    "on",
    "and",
    "or",
    "what",
    "how",
    "who",
    "when",
    "why",
    "can",
    "i",
    "it"
  ]);
  const tokens = normalized.split(/[^a-z0-9]+/).filter((token) => token && !stopWords.has(token));
  const matchingEntries = knowledgeBaseEntries
    .map((entry) => {
      const haystack = [entry.title, entry.category, entry.content].join(" ").toLowerCase();
      const tokenScore = tokens.reduce((count, token) => count + Number(haystack.includes(token)), 0);
      const exactTitleBonus = entry.title.toLowerCase() === normalized ? 10 : 0;
      const partialTitleBonus = entry.title.toLowerCase().includes(normalized) || normalized.includes(entry.title.toLowerCase()) ? 5 : 0;
      const score = tokenScore + exactTitleBonus + partialTitleBonus;
      return { entry, score };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  const bestMatch = matchingEntries[0];

  const suggested = getAmbassadorMatches(question).slice(0, 3);

  return {
    answer:
      bestMatch && bestMatch.score > 0
        ? bestMatch.entry.content
        : "I could not find a precise answer to that question in the current MSITM FAQ knowledge base.",
    citations:
      bestMatch && bestMatch.score > 0
        ? [
            {
              id: bestMatch.entry.id,
              title: bestMatch.entry.title,
              source: bestMatch.entry.source
            }
          ]
        : [],
    suggestedAmbassadors: suggested
  };
}

export function getAnalytics() {
  const pendingCount = meetings.filter((meeting) => meeting.status === "pending").length;
  const confirmedCount = meetings.filter((meeting) => meeting.status === "confirmed").length;

  return [
    { label: "Popular questions", value: "Housing, clubs, internships" },
    { label: "Pending meeting requests", value: pendingCount.toString() },
    { label: "Confirmed mentorship sessions", value: confirmedCount.toString() },
    { label: "Knowledge base entries", value: knowledgeBaseEntries.length.toString() }
  ];
}
