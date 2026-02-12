import { CakeIcon } from "lucide-react";

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const birthdays = [
  {
    name: "이영희",
    gender: "female" as Gender,
    birthday: "2월 14일",
    cellGroup: { name: "사랑 목장", leader: "김민수" },
    avatar: "",
    initials: "영희",
  },
  {
    name: "장현우",
    gender: "male" as Gender,
    birthday: "2월 18일",
    cellGroup: { name: "사랑 목장", leader: "김민수" },
    avatar: "",
    initials: "현우",
  },
  {
    name: "박준호",
    gender: "male" as Gender,
    birthday: "2월 22일",
    cellGroup: { name: "은혜 목장", leader: "정대영" },
    avatar: "",
    initials: "준호",
  },
  {
    name: "한지은",
    gender: "female" as Gender,
    birthday: "3월 1일",
    cellGroup: { name: "소망 목장", leader: "이수연" },
    avatar: "",
    initials: "지은",
  },
  {
    name: "김서현",
    gender: "female" as Gender,
    birthday: "3월 5일",
    cellGroup: { name: "믿음 목장", leader: "박지훈" },
    avatar: "",
    initials: "서현",
  },
  {
    name: "오민재",
    gender: "male" as Gender,
    birthday: "3월 12일",
    cellGroup: { name: "은혜 목장", leader: "정대영" },
    avatar: "",
    initials: "민재",
  },
];

export function UpcomingBirthdays() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CakeIcon className="size-4" />
          다가오는 생일
        </CardTitle>
        <CardDescription>앞으로 30일 이내 생일인 교인</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {birthdays.map((person) => (
            <div key={person.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  {person.avatar ? <AvatarImage src={person.avatar} alt={person.name} /> : null}
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {person.name}
                    <GenderIcon gender={person.gender} />
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {person.cellGroup.name} · {person.cellGroup.leader}
                  </span>
                </div>
              </div>
              <span className="text-muted-foreground text-sm">{person.birthday}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
