import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import { Link } from "react-router";

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Route } from "./+types/details";

type Member = {
  id: string;
  name: string;
  profileImage: string;
  gender: Gender;
  birthday: string;
  address: string;
  contact: string;
  cellGroup: string;
  role: "목자" | "목원";
  registeredAt: string;
};

type AttendanceRecord = {
  date: string;
  attended: boolean;
  note?: string;
};

const membersMap: Record<string, Member> = {
  "1": {
    id: "1",
    name: "김민수",
    profileImage: "/avatars/member-1.jpg",
    gender: "male",
    birthday: "1990-05-12",
    address: "430 Queen Street, Auckland Central, Auckland 1010",
    contact: "010-1234-5678",
    cellGroup: "사랑 목장",
    role: "목자",
    registeredAt: "2023-03-15",
  },
  "2": {
    id: "2",
    name: "이영희",
    profileImage: "/avatars/member-2.jpg",
    gender: "female",
    birthday: "1988-11-23",
    address: "12 Ponsonby Road, Ponsonby, Auckland 1011",
    contact: "010-2345-6789",
    cellGroup: "은혜 목장",
    role: "목자",
    registeredAt: "2023-04-01",
  },
  "3": {
    id: "3",
    name: "박준호",
    profileImage: "/avatars/member-3.jpg",
    gender: "male",
    birthday: "1995-02-08",
    address: "85 Symonds Street, Grafton, Auckland 1010",
    contact: "010-3456-7890",
    cellGroup: "소망 목장",
    role: "목자",
    registeredAt: "2023-05-10",
  },
  "4": {
    id: "4",
    name: "정수진",
    profileImage: "/avatars/member-4.jpg",
    gender: "female",
    birthday: "1992-07-30",
    address: "7 Waterloo Quadrant, Auckland Central, Auckland 1010",
    contact: "010-4567-8901",
    cellGroup: "믿음 목장",
    role: "목자",
    registeredAt: "2023-06-20",
  },
  "5": {
    id: "5",
    name: "최동현",
    profileImage: "/avatars/member-5.jpg",
    gender: "male",
    birthday: "1985-09-14",
    address: "23 Dominion Road, Mt Eden, Auckland 1024",
    contact: "010-5678-9012",
    cellGroup: "기쁨 목장",
    role: "목자",
    registeredAt: "2023-07-05",
  },
  "6": {
    id: "6",
    name: "한지은",
    profileImage: "/avatars/member-6.jpg",
    gender: "female",
    birthday: "1997-01-25",
    address: "156 Parnell Road, Parnell, Auckland 1052",
    contact: "010-6789-0123",
    cellGroup: "사랑 목장",
    role: "목원",
    registeredAt: "2024-01-12",
  },
  "7": {
    id: "7",
    name: "윤서연",
    profileImage: "/avatars/member-7.jpg",
    gender: "female",
    birthday: "1993-04-18",
    address: "42 Mt Albert Road, Mt Albert, Auckland 1025",
    contact: "010-7890-1234",
    cellGroup: "은혜 목장",
    role: "목원",
    registeredAt: "2024-02-20",
  },
  "8": {
    id: "8",
    name: "장현우",
    profileImage: "/avatars/member-8.jpg",
    gender: "male",
    birthday: "1991-12-05",
    address: "310 Great South Road, Greenlane, Auckland 1051",
    contact: "010-8901-2345",
    cellGroup: "소망 목장",
    role: "목원",
    registeredAt: "2024-03-08",
  },
  "9": {
    id: "9",
    name: "송지아",
    profileImage: "/avatars/member-9.jpg",
    gender: "female",
    birthday: "1998-06-22",
    address: "18 Karangahape Road, Newton, Auckland 1010",
    contact: "010-9012-3456",
    cellGroup: "믿음 목장",
    role: "목원",
    registeredAt: "2024-04-15",
  },
  "10": {
    id: "10",
    name: "임도윤",
    profileImage: "/avatars/member-10.jpg",
    gender: "male",
    birthday: "1994-08-11",
    address: "5 Remuera Road, Remuera, Auckland 1050",
    contact: "010-0123-4567",
    cellGroup: "기쁨 목장",
    role: "목원",
    registeredAt: "2024-05-22",
  },
  "11": {
    id: "11",
    name: "강하늘",
    profileImage: "/avatars/member-11.jpg",
    gender: "male",
    birthday: "2000-03-07",
    address: "67 New North Road, Eden Terrace, Auckland 1021",
    contact: "010-1111-2222",
    cellGroup: "사랑 목장",
    role: "목원",
    registeredAt: "2024-08-10",
  },
  "12": {
    id: "12",
    name: "조예린",
    profileImage: "/avatars/member-12.jpg",
    gender: "female",
    birthday: "1996-10-19",
    address: "200 Manukau Road, Epsom, Auckland 1023",
    contact: "010-3333-4444",
    cellGroup: "은혜 목장",
    role: "목원",
    registeredAt: "2024-09-05",
  },
  "13": {
    id: "13",
    name: "백승민",
    profileImage: "/avatars/member-13.jpg",
    gender: "male",
    birthday: "1987-05-28",
    address: "91 Tamaki Drive, Mission Bay, Auckland 1071",
    contact: "010-5555-6666",
    cellGroup: "소망 목장",
    role: "목원",
    registeredAt: "2025-01-15",
  },
  "14": {
    id: "14",
    name: "유하은",
    profileImage: "/avatars/member-14.jpg",
    gender: "female",
    birthday: "1999-09-03",
    address: "34 Sandringham Road, Sandringham, Auckland 1025",
    contact: "010-7777-8888",
    cellGroup: "믿음 목장",
    role: "목원",
    registeredAt: "2025-06-20",
  },
  "15": {
    id: "15",
    name: "오준서",
    profileImage: "/avatars/member-15.jpg",
    gender: "male",
    birthday: "2001-11-15",
    address: "15 College Hill, Freemans Bay, Auckland 1011",
    contact: "010-9999-0000",
    cellGroup: "기쁨 목장",
    role: "목원",
    registeredAt: "2025-10-01",
  },
};

const attendanceMap: Record<string, AttendanceRecord[]> = {
  "1": [
    { date: "2026-02-09", attended: true },
    { date: "2026-02-02", attended: true },
    { date: "2026-01-26", attended: true },
    { date: "2026-01-19", attended: false, note: "출장" },
    { date: "2026-01-12", attended: true },
    { date: "2026-01-05", attended: true },
  ],
  "2": [
    { date: "2026-02-09", attended: true },
    { date: "2026-02-02", attended: true },
    { date: "2026-01-26", attended: false, note: "건강 문제" },
    { date: "2026-01-19", attended: true },
    { date: "2026-01-12", attended: true },
    { date: "2026-01-05", attended: true },
  ],
  "6": [
    { date: "2026-02-09", attended: true },
    { date: "2026-02-02", attended: false, note: "개인 사정" },
    { date: "2026-01-26", attended: true },
    { date: "2026-01-19", attended: true },
    { date: "2026-01-12", attended: false, note: "여행" },
    { date: "2026-01-05", attended: true },
  ],
};

const notesMap: Record<string, string> = {
  "1": "목장 모임을 성실하게 이끌고 있으며, 새가족 정착에 큰 도움을 주고 있습니다. 다음 달 목자 세미나 참석 예정.",
  "2": "찬양 사역에 은사가 있으며, 주일 예배 찬양팀에서도 활동 중입니다. 최근 건강이 좋지 않아 기도가 필요합니다.",
  "4": "새가족 심방에 적극적으로 참여하고 있습니다. 교회 봉사에 헌신적인 모습을 보여주고 있습니다.",
  "6": "최근 목장 모임에 꾸준히 참석하고 있으며, 신앙이 성장하고 있습니다.",
};

function getAge(birthday: string): number {
  const today = new Date();
  const birth = new Date(birthday);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getDaysSinceRegistration(registeredAt: string): number {
  const now = new Date();
  const registered = new Date(registeredAt);
  return Math.floor((now.getTime() - registered.getTime()) / (1000 * 60 * 60 * 24));
}

function getAttendanceRate(records: AttendanceRecord[]): number {
  if (records.length === 0) return 0;
  const attended = records.filter((r) => r.attended).length;
  return Math.round((attended / records.length) * 100);
}

function getAttendanceBadgeVariant(
  rate: number,
): "default" | "secondary" | "destructive" | "outline" {
  if (rate >= 90) return "default";
  if (rate >= 80) return "secondary";
  if (rate >= 70) return "outline";
  return "destructive";
}

export default function MemberDetailsPage({ params: { id } }: Route.ComponentProps) {
  const member = membersMap[id];

  if (!member) {
    return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
          <Empty className="border py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UserIcon />
              </EmptyMedia>
              <EmptyTitle>교인을 찾을 수 없습니다</EmptyTitle>
              <EmptyDescription>요청하신 교인 정보가 존재하지 않습니다.</EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" asChild>
              <Link to="/app/members">
                <ChevronLeftIcon />
                교인 목록으로 돌아가기
              </Link>
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  const attendance = attendanceMap[id] ?? [];
  const attendanceRate = getAttendanceRate(attendance);
  const daysSinceRegistration = getDaysSinceRegistration(member.registeredAt);
  const note = notesMap[id];

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar size="lg">
                <AvatarImage src={member.profileImage} alt={member.name} />
                <AvatarFallback className="text-lg">{member.name.slice(-2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{member.name}</h1>
                  <GenderIcon gender={member.gender} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={member.role === "목자" ? "default" : "secondary"}>
                    {member.role}
                  </Badge>
                  <Badge variant="outline">{member.cellGroup}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <PencilIcon className="size-3.5" />
                수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          <Card size="sm">
            <CardHeader>
              <CardDescription>나이</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {getAge(member.birthday)}세
              </CardTitle>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription>출석률</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                {attendance.length > 0 ? (
                  <>
                    {attendanceRate}%
                    <Badge variant={getAttendanceBadgeVariant(attendanceRate)}>
                      {attendanceRate >= 90
                        ? "우수"
                        : attendanceRate >= 80
                          ? "양호"
                          : attendanceRate >= 70
                            ? "보통"
                            : "관심 필요"}
                    </Badge>
                  </>
                ) : (
                  <span className="text-muted-foreground text-base">기록 없음</span>
                )}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription>등록 기간</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {daysSinceRegistration}일
              </CardTitle>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription>최근 출석</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {attendance.length > 0 ? (
                  attendance[0].attended ? (
                    <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                      <CheckCircleIcon className="size-5" />
                      출석
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                      <XCircleIcon className="size-5" />
                      결석
                    </span>
                  )
                ) : (
                  <span className="text-muted-foreground text-base">기록 없음</span>
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Personal Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>개인 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">생년월일</p>
                  <p className="text-sm font-medium">{formatDate(member.birthday)}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <PhoneIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">연락처</p>
                  <p className="text-sm font-medium">{member.contact}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPinIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">주소</p>
                  <p className="text-sm font-medium">{member.address}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <UsersIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">소속 목장</p>
                  <p className="text-sm font-medium">{member.cellGroup}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <ClockIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">등록일</p>
                  <p className="text-sm font-medium">{formatDate(member.registeredAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6 lg:col-span-2">
            {/* Attendance History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>출석 기록</CardTitle>
                    <CardDescription>최근 목장 모임 출석 현황</CardDescription>
                  </div>
                  {attendance.length > 0 && (
                    <Badge variant={getAttendanceBadgeVariant(attendanceRate)}>
                      {attendanceRate}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {attendance.length > 0 ? (
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead>날짜</TableHead>
                          <TableHead>출석</TableHead>
                          <TableHead className="hidden sm:table-cell">비고</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendance.map((record) => (
                          <TableRow key={record.date}>
                            <TableCell className="font-medium">{formatDate(record.date)}</TableCell>
                            <TableCell>
                              {record.attended ? (
                                <Badge variant="default">출석</Badge>
                              ) : (
                                <Badge variant="destructive">결석</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground hidden sm:table-cell">
                              {record.note ?? "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <Empty className="border py-12">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CalendarIcon />
                      </EmptyMedia>
                      <EmptyTitle>출석 기록이 없습니다</EmptyTitle>
                      <EmptyDescription>아직 기록된 출석 데이터가 없습니다.</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>메모</CardTitle>
                    <CardDescription>교인에 대한 참고 사항</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="size-3.5" />
                    편집
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {note ? (
                  <p className="text-sm leading-relaxed">{note}</p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    아직 작성된 메모가 없습니다. 편집 버튼을 눌러 메모를 추가하세요.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
