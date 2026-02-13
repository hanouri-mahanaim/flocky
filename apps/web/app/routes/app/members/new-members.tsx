import {
  BookOpenIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-router";

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type NewMember = {
  id: string;
  name: string;
  profileImage: string;
  gender: Gender;
  birthday: string;
  address: string;
  contact: string;
  registeredAt: string;
  educationWeek: number;
  educationCompleted: boolean;
  cellGroup?: string;
  assignedAt?: string;
};

const newMembers: NewMember[] = [
  // Currently in education (weeks 1-4)
  {
    id: "101",
    name: "김서윤",
    profileImage: "/avatars/new-1.jpg",
    gender: "female",
    birthday: "1999-03-14",
    address: "22 Victoria Street West, Auckland Central, Auckland 1010",
    contact: "010-1122-3344",
    registeredAt: "2026-02-09",
    educationWeek: 1,
    educationCompleted: false,
  },
  {
    id: "102",
    name: "이준혁",
    profileImage: "/avatars/new-2.jpg",
    gender: "male",
    birthday: "1995-07-22",
    address: "88 Federal Street, Auckland Central, Auckland 1010",
    contact: "010-2233-4455",
    registeredAt: "2026-02-02",
    educationWeek: 2,
    educationCompleted: false,
  },
  {
    id: "103",
    name: "박소연",
    profileImage: "/avatars/new-3.jpg",
    gender: "female",
    birthday: "2001-11-05",
    address: "15 Sale Street, Freemans Bay, Auckland 1011",
    contact: "010-3344-5566",
    registeredAt: "2026-01-26",
    educationWeek: 3,
    educationCompleted: false,
  },
  {
    id: "104",
    name: "정민재",
    profileImage: "/avatars/new-4.jpg",
    gender: "male",
    birthday: "1992-04-18",
    address: "41 Shortland Street, Auckland Central, Auckland 1010",
    contact: "010-4455-6677",
    registeredAt: "2026-01-19",
    educationWeek: 4,
    educationCompleted: false,
  },
  {
    id: "105",
    name: "최예진",
    profileImage: "/avatars/new-5.jpg",
    gender: "female",
    birthday: "1997-08-30",
    address: "7 Anzac Avenue, Auckland Central, Auckland 1010",
    contact: "010-5566-7788",
    registeredAt: "2026-02-05",
    educationWeek: 1,
    educationCompleted: false,
  },
  {
    id: "106",
    name: "한도현",
    profileImage: "/avatars/new-6.jpg",
    gender: "male",
    birthday: "1988-12-11",
    address: "120 Hobson Street, Auckland Central, Auckland 1010",
    contact: "010-6677-8899",
    registeredAt: "2026-01-26",
    educationWeek: 3,
    educationCompleted: false,
  },
  {
    id: "107",
    name: "윤하린",
    profileImage: "/avatars/new-7.jpg",
    gender: "female",
    birthday: "2000-06-25",
    address: "33 Lorne Street, Auckland Central, Auckland 1010",
    contact: "010-7788-9900",
    registeredAt: "2026-02-02",
    educationWeek: 2,
    educationCompleted: false,
  },
  // Completed education and assigned to cell group
  {
    id: "108",
    name: "강지호",
    profileImage: "/avatars/new-8.jpg",
    gender: "male",
    birthday: "1993-01-09",
    address: "55 Nelson Street, Auckland Central, Auckland 1010",
    contact: "010-8899-0011",
    registeredAt: "2025-12-15",
    educationWeek: 4,
    educationCompleted: true,
    cellGroup: "사랑 목장",
    assignedAt: "2026-01-12",
  },
  {
    id: "109",
    name: "송유나",
    profileImage: "/avatars/new-9.jpg",
    gender: "female",
    birthday: "1996-05-17",
    address: "9 Wellesley Street East, Auckland Central, Auckland 1010",
    contact: "010-9900-1122",
    registeredAt: "2025-12-22",
    educationWeek: 4,
    educationCompleted: true,
    cellGroup: "은혜 목장",
    assignedAt: "2026-01-19",
  },
  {
    id: "110",
    name: "임태윤",
    profileImage: "/avatars/new-10.jpg",
    gender: "male",
    birthday: "1990-10-03",
    address: "28 Albert Street, Auckland Central, Auckland 1010",
    contact: "010-0011-2233",
    registeredAt: "2025-12-08",
    educationWeek: 4,
    educationCompleted: true,
    cellGroup: "소망 목장",
    assignedAt: "2026-01-05",
  },
  {
    id: "111",
    name: "조은서",
    profileImage: "/avatars/new-11.jpg",
    gender: "female",
    birthday: "1998-02-28",
    address: "64 Customs Street East, Auckland Central, Auckland 1010",
    contact: "010-1100-2233",
    registeredAt: "2025-11-24",
    educationWeek: 4,
    educationCompleted: true,
    cellGroup: "믿음 목장",
    assignedAt: "2025-12-22",
  },
  {
    id: "112",
    name: "백시우",
    profileImage: "/avatars/new-12.jpg",
    gender: "male",
    birthday: "1994-09-12",
    address: "3 Commerce Street, Auckland Central, Auckland 1010",
    contact: "010-2200-3344",
    registeredAt: "2025-12-01",
    educationWeek: 4,
    educationCompleted: true,
    cellGroup: "기쁨 목장",
    assignedAt: "2025-12-29",
  },
];

const inEducation = newMembers.filter((m) => !m.educationCompleted);
const assigned = newMembers.filter((m) => m.educationCompleted);

type ServingMember = {
  name: string;
  profileImage: string;
  gender: Gender;
  role: "새가족팀장" | "새가족팀원";
};

const servingTeam: ServingMember[] = [
  { name: "김민수", profileImage: "/avatars/member-1.jpg", gender: "male", role: "새가족팀장" },
  { name: "이영희", profileImage: "/avatars/member-2.jpg", gender: "female", role: "새가족팀원" },
  { name: "정수진", profileImage: "/avatars/member-4.jpg", gender: "female", role: "새가족팀원" },
  { name: "윤서연", profileImage: "/avatars/member-7.jpg", gender: "female", role: "새가족팀원" },
  { name: "장현우", profileImage: "/avatars/member-8.jpg", gender: "male", role: "새가족팀원" },
  { name: "조예린", profileImage: "/avatars/member-12.jpg", gender: "female", role: "새가족팀원" },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function WeekProgress({ currentWeek }: { currentWeek: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4].map((week) => (
        <div
          key={week}
          className={`flex size-6 items-center justify-center rounded-full text-xs font-medium ${
            week <= currentWeek
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {week}
        </div>
      ))}
    </div>
  );
}

export default function NewMembersPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">새가족 관리</h1>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <Card size="sm">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <UsersIcon className="size-3.5" />
                전체 새가족
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {newMembers.length}명
              </CardTitle>
            </CardHeader>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <BookOpenIcon className="size-3.5" />
                교육 중
              </CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                {inEducation.length}명
                {inEducation.length > 0 && <Badge variant="secondary">진행 중</Badge>}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-3.5" />
                배정 완료
              </CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                {assigned.length}명{assigned.length > 0 && <Badge variant="default">완료</Badge>}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Serving Team */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>새가족 섬김이</CardTitle>
                <CardDescription>새가족 사역 담당자</CardDescription>
              </div>
              <Badge variant="outline">
                <HeartHandshakeIcon className="size-3" />
                {servingTeam.length}명
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {servingTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-lg border p-3">
                  <Avatar size="sm">
                    <AvatarImage src={member.profileImage} alt={member.name} />
                    <AvatarFallback>{member.name.slice(-2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      {member.name}
                      <GenderIcon gender={member.gender} />
                    </span>
                    <span className="text-muted-foreground text-xs">{member.role}</span>
                  </div>
                  {member.role === "새가족팀장" && (
                    <Badge variant="secondary" className="ml-auto">
                      팀장
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* In Education */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>새가족 교육</CardTitle>
                <CardDescription>4주 새가족 교육 진행 현황</CardDescription>
              </div>
              <Badge variant="outline">
                <BookOpenIcon className="size-3" />
                {inEducation.length}명
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {inEducation.length > 0 ? (
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>성별</TableHead>
                      <TableHead className="hidden md:table-cell">연락처</TableHead>
                      <TableHead>등록일</TableHead>
                      <TableHead>교육 진행</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inEducation.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Link
                            to={`/app/members/${member.id}`}
                            className="flex items-center gap-2 font-medium hover:underline"
                          >
                            <Avatar size="sm">
                              <AvatarImage src={member.profileImage} alt={member.name} />
                              <AvatarFallback>{member.name.slice(-2)}</AvatarFallback>
                            </Avatar>
                            {member.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <GenderIcon gender={member.gender} />
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">
                          {member.contact}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(member.registeredAt)}
                        </TableCell>
                        <TableCell>
                          <WeekProgress currentWeek={member.educationWeek} />
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
                    <BookOpenIcon />
                  </EmptyMedia>
                  <EmptyTitle>교육 중인 새가족이 없습니다</EmptyTitle>
                  <EmptyDescription>현재 새가족 교육을 받고 있는 분이 없습니다.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>

        {/* Assigned to Cell Group */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>배정 완료</CardTitle>
                <CardDescription>교육을 마치고 목장에 배정된 새가족</CardDescription>
              </div>
              <Badge variant="outline">
                <CheckCircleIcon className="size-3" />
                {assigned.length}명
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {assigned.length > 0 ? (
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>성별</TableHead>
                      <TableHead className="hidden md:table-cell">연락처</TableHead>
                      <TableHead>담당 목장</TableHead>
                      <TableHead className="hidden sm:table-cell">배정일</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assigned.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Link
                            to={`/app/members/${member.id}`}
                            className="flex items-center gap-2 font-medium hover:underline"
                          >
                            <Avatar size="sm">
                              <AvatarImage src={member.profileImage} alt={member.name} />
                              <AvatarFallback>{member.name.slice(-2)}</AvatarFallback>
                            </Avatar>
                            {member.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <GenderIcon gender={member.gender} />
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">
                          {member.contact}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.cellGroup}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">
                          {member.assignedAt ? formatDate(member.assignedAt) : "-"}
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
                    <GraduationCapIcon />
                  </EmptyMedia>
                  <EmptyTitle>배정 완료된 새가족이 없습니다</EmptyTitle>
                  <EmptyDescription>
                    아직 교육을 마치고 목장에 배정된 새가족이 없습니다.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
