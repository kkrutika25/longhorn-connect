export type UserRole = "student" | "ambassador" | "admin";
export type StudentStage = "prospective" | "current";
export type MeetingType = "virtual" | "in_person" | "campus_tour";
export type MeetingStatus = "pending" | "confirmed" | "declined" | "cancelled";
export type AvailabilityStatus = "available" | "pending" | "booked";
export type MeetingDuration = 30 | 60;
export type SenderType = "student" | "ambassador" | "ai";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  major: string;
  year: string;
  interests: string[];
  bio: string;
  createdAt: string;
};

export type AmbassadorProfile = {
  id: string;
  userId: string;
  graduationYear: string;
  residenceHall: string;
  clubs: string[];
  expertiseTags: string[];
  availability: TimeSlot[];
  isActive: boolean;
};

export type Ambassador = User & {
  program: string;
  residenceHall: string;
  clubs: string[];
  expertiseTags: string[];
  graduationYear: string;
  careerBackground?: string;
  linkedinUrl?: string;
  nationality?: string;
  defaultMeetingLocation?: string;
  isActive: boolean;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
};

export type Meeting = {
  id: string;
  studentId: string;
  ambassadorId: string;
  topic: string;
  meetingType: MeetingType;
  durationMinutes: MeetingDuration;
  startTime: string;
  endTime: string;
  status: MeetingStatus;
  meetingLink?: string;
  location?: string;
  createdAt: string;
};

export type KnowledgeBaseEntry = {
  id: string;
  title: string;
  category: string;
  content: string;
  source: string;
  updatedAt: string;
};

export type SavedAmbassador = {
  id: string;
  studentId: string;
  ambassadorId: string;
  createdAt: string;
};

export type TimeSlot = {
  id: string;
  start: string;
  end: string;
  label: string;
  status: AvailabilityStatus;
  meetingId?: string;
  meetingStatus?: MeetingStatus;
};

export type AskResponse = {
  answer: string;
  citations: Array<{
    id: string;
    title: string;
    source: string;
  }>;
  suggestedAmbassadors: Ambassador[];
};
