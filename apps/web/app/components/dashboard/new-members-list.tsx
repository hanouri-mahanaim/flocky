import { UserPlusIcon } from "lucide-react";

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const newMembers = [
  {
    name: "송지아",
    gender: "female" as Gender,
    age: 28,
    contact: "010-1234-5678",
    registeredAt: "2026-02-10",
    cellGroup: "사랑 목장",
  },
  {
    name: "임도윤",
    gender: "male" as Gender,
    age: 34,
    contact: "010-2345-6789",
    registeredAt: "2026-02-08",
    cellGroup: "은혜 목장",
  },
  {
    name: "강하늘",
    gender: "male" as Gender,
    age: 22,
    contact: "010-3456-7890",
    registeredAt: "2026-02-05",
    cellGroup: "소망 목장",
  },
  {
    name: "조예린",
    gender: "female" as Gender,
    age: 19,
    contact: "010-4567-8901",
    registeredAt: "2026-02-02",
    cellGroup: "미배정",
  },
  {
    name: "백승민",
    gender: "male" as Gender,
    age: 41,
    contact: "010-5678-9012",
    registeredAt: "2026-01-28",
    cellGroup: "믿음 목장",
  },
  {
    name: "유하은",
    gender: "female" as Gender,
    age: 25,
    contact: "010-6789-0123",
    registeredAt: "2026-01-25",
    cellGroup: "미배정",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

export function NewMembersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlusIcon className="size-4" />
          새가족 목록
        </CardTitle>
        <CardDescription>최근 등록된 새가족 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>성별</TableHead>
              <TableHead>나이</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead>담당 목장</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newMembers.map((member) => (
              <TableRow key={member.name}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>
                  <GenderIcon gender={member.gender} />
                </TableCell>
                <TableCell>{member.age}세</TableCell>
                <TableCell>{formatDate(member.registeredAt)}</TableCell>
                <TableCell>
                  <span className={member.cellGroup === "미배정" ? "text-muted-foreground" : ""}>
                    {member.cellGroup}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
