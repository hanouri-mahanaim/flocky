import { UsersIcon } from "lucide-react";

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cellGroup = {
  name: "사랑 목장",
  leader: "김민수",
  attendanceRate: 87.5,
  members: [
    { name: "김민수", gender: "male" as Gender, avatar: "", initials: "민수" },
    { name: "이영희", gender: "female" as Gender, avatar: "", initials: "영희" },
    { name: "박준호", gender: "male" as Gender, avatar: "", initials: "준호" },
    { name: "정수진", gender: "female" as Gender, avatar: "", initials: "수진" },
    { name: "최동현", gender: "male" as Gender, avatar: "", initials: "동현" },
    { name: "한지은", gender: "female" as Gender, avatar: "", initials: "지은" },
    { name: "윤서연", gender: "female" as Gender, avatar: "", initials: "서연" },
    { name: "장현우", gender: "male" as Gender, avatar: "", initials: "현우" },
  ],
};

export function MyCellGroup() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{cellGroup.name}</CardTitle>
            <CardDescription>목자: {cellGroup.leader}</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            출석률 {cellGroup.attendanceRate}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm">
          <UsersIcon className="text-muted-foreground size-4" />
          <span className="text-muted-foreground">목원 {cellGroup.members.length}명</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {cellGroup.members.map((member) => (
            <div key={member.name} className="flex items-center gap-2">
              <Avatar size="sm">
                {member.avatar ? <AvatarImage src={member.avatar} alt={member.name} /> : null}
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <span className="flex items-center gap-1 text-sm">
                {member.name}
                <GenderIcon gender={member.gender} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
