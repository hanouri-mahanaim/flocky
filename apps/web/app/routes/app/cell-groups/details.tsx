import { ChevronLeftIcon, ClipboardListIcon, PlusIcon, UsersIcon } from "lucide-react";
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
  name: string;
  gender: Gender;
  role: "목자" | "목원";
  avatar: string;
  initials: string;
};

type CellGroupDetail = {
  id: string;
  name: string;
  zone: string;
  leader: string;
  memberCount: number;
  attendanceRate: number;
  createdAt: string;
  members: Member[];
};

type Report = {
  id: string;
  date: string;
  attendeeCount: number;
  totalMembers: number;
  prayerTopics: string;
  author: string;
  createdAt: string;
};

const cellGroupsMap: Record<string, CellGroupDetail> = {
  "1": {
    id: "1",
    name: "사랑 목장",
    zone: "1초원",
    leader: "김민수",
    memberCount: 8,
    attendanceRate: 87.5,
    createdAt: "2024-03-15",
    members: [
      { name: "김민수", gender: "male", role: "목자", avatar: "", initials: "민수" },
      { name: "이영희", gender: "female", role: "목원", avatar: "", initials: "영희" },
      { name: "박준호", gender: "male", role: "목원", avatar: "", initials: "준호" },
      { name: "정수진", gender: "female", role: "목원", avatar: "", initials: "수진" },
      { name: "최동현", gender: "male", role: "목원", avatar: "", initials: "동현" },
      { name: "한지은", gender: "female", role: "목원", avatar: "", initials: "지은" },
      { name: "윤서연", gender: "female", role: "목원", avatar: "", initials: "서연" },
      { name: "장현우", gender: "male", role: "목원", avatar: "", initials: "현우" },
    ],
  },
  "2": {
    id: "2",
    name: "은혜 목장",
    zone: "1초원",
    leader: "이영희",
    memberCount: 6,
    attendanceRate: 92.0,
    createdAt: "2024-04-01",
    members: [
      { name: "이영희", gender: "female", role: "목자", avatar: "", initials: "영희" },
      { name: "강하늘", gender: "male", role: "목원", avatar: "", initials: "하늘" },
      { name: "송지아", gender: "female", role: "목원", avatar: "", initials: "지아" },
      { name: "임도윤", gender: "male", role: "목원", avatar: "", initials: "도윤" },
      { name: "조예린", gender: "female", role: "목원", avatar: "", initials: "예린" },
      { name: "백승민", gender: "male", role: "목원", avatar: "", initials: "승민" },
    ],
  },
};

const reportsMap: Record<string, Report[]> = {
  "1": [
    {
      id: "r1",
      date: "2025-02-09",
      attendeeCount: 7,
      totalMembers: 8,
      prayerTopics: "새 학기 자녀들의 적응을 위해, 건강 회복을 위해",
      author: "김민수",
      createdAt: "2025-02-09",
    },
    {
      id: "r2",
      date: "2025-02-02",
      attendeeCount: 6,
      totalMembers: 8,
      prayerTopics: "직장에서의 믿음 생활, 가정의 평안을 위해",
      author: "김민수",
      createdAt: "2025-02-02",
    },
    {
      id: "r3",
      date: "2025-01-26",
      attendeeCount: 8,
      totalMembers: 8,
      prayerTopics: "교회 건축 헌금을 위해, 선교사님들의 안전을 위해",
      author: "김민수",
      createdAt: "2025-01-26",
    },
    {
      id: "r4",
      date: "2025-01-19",
      attendeeCount: 5,
      totalMembers: 8,
      prayerTopics: "겨울 수련회 준비를 위해, 새가족 정착을 위해",
      author: "김민수",
      createdAt: "2025-01-19",
    },
    {
      id: "r5",
      date: "2025-01-12",
      attendeeCount: 7,
      totalMembers: 8,
      prayerTopics: "새해 결단과 말씀 묵상 생활을 위해",
      author: "김민수",
      createdAt: "2025-01-12",
    },
  ],
  "2": [],
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getAttendanceBadgeVariant(
  rate: number,
): "default" | "secondary" | "destructive" | "outline" {
  if (rate >= 90) return "default";
  if (rate >= 80) return "secondary";
  if (rate >= 70) return "outline";
  return "destructive";
}

export default function CellGroupDetails({ params: { id } }: Route.ComponentProps) {
  const cellGroup = cellGroupsMap[id];
  const reports = reportsMap[id] ?? [];

  if (!cellGroup) {
    return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
          <Empty className="border py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon />
              </EmptyMedia>
              <EmptyTitle>목장을 찾을 수 없습니다</EmptyTitle>
              <EmptyDescription>요청하신 목장 정보가 존재하지 않습니다.</EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" asChild>
              <Link to="/app/cell-groups">
                <ChevronLeftIcon />
                목장 목록으로 돌아가기
              </Link>
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{cellGroup.name}</h1>
            <Badge variant="outline">{cellGroup.zone}</Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <Card size="sm">
            <CardHeader>
              <CardDescription>목원 수</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {cellGroup.memberCount}명
              </CardTitle>
            </CardHeader>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardDescription>출석률</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
                {cellGroup.attendanceRate}%
                <Badge variant={getAttendanceBadgeVariant(cellGroup.attendanceRate)}>
                  {cellGroup.attendanceRate >= 90
                    ? "우수"
                    : cellGroup.attendanceRate >= 80
                      ? "양호"
                      : cellGroup.attendanceRate >= 70
                        ? "보통"
                        : "관심 필요"}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardDescription>등록일</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {formatDate(cellGroup.createdAt)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Members Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>목원 목록</CardTitle>
                <CardDescription>
                  총 {cellGroup.members.length}명 · 목자: {cellGroup.leader}
                </CardDescription>
              </div>
              <Badge variant="outline">
                <UsersIcon className="size-3" />
                {cellGroup.members.length}명
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cellGroup.members.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-lg border p-3">
                  <Avatar size="sm">
                    {member.avatar ? <AvatarImage src={member.avatar} alt={member.name} /> : null}
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      {member.name}
                      <GenderIcon gender={member.gender} />
                    </span>
                    <span className="text-muted-foreground text-xs">{member.role}</span>
                  </div>
                  {member.role === "목자" && (
                    <Badge variant="secondary" className="ml-auto">
                      목자
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>주간 보고서</CardTitle>
                <CardDescription>목장 모임 주간 보고서 목록</CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link to="#">
                  <PlusIcon />새 보고서 작성
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>출석 인원</TableHead>
                      <TableHead className="hidden md:table-cell">기도 제목</TableHead>
                      <TableHead>작성자</TableHead>
                      <TableHead className="hidden sm:table-cell">작성일</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Link to="#" className="font-medium hover:underline">
                            {formatDate(report.date)}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="tabular-nums">
                            {report.attendeeCount}/{report.totalMembers}명
                          </span>
                        </TableCell>
                        <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                          <span className="text-muted-foreground">{report.prayerTopics}</span>
                        </TableCell>
                        <TableCell>{report.author}</TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">
                          {formatDate(report.createdAt)}
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
                    <ClipboardListIcon />
                  </EmptyMedia>
                  <EmptyTitle>아직 작성된 보고서가 없습니다</EmptyTitle>
                  <EmptyDescription>
                    첫 번째 주간 보고서를 작성하여 목장 모임을 기록해 보세요.
                  </EmptyDescription>
                </EmptyHeader>
                <Button size="sm" asChild>
                  <Link to="#">
                    <PlusIcon />첫 보고서 작성하기
                  </Link>
                </Button>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
