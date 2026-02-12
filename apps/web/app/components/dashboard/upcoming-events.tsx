import { CalendarDaysIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    title: "새가족 환영회",
    date: new Date(2026, 1, 16),
    color: "bg-blue-500",
  },
  {
    title: "청년부 MT",
    date: new Date(2026, 1, 22),
    color: "bg-green-500",
  },
  {
    title: "찬양의 밤",
    date: new Date(2026, 2, 1),
    color: "bg-purple-500",
  },
  {
    title: "교회 창립기념일",
    date: new Date(2026, 2, 8),
    color: "bg-orange-500",
  },
  {
    title: "봄 수련회",
    date: new Date(2026, 2, 14),
    color: "bg-teal-500",
  },
  {
    title: "부활절 특별예배",
    date: new Date(2026, 3, 5),
    color: "bg-red-500",
  },
];

function formatEventDate(date: Date) {
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

export function UpcomingEvents() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDaysIcon className="size-4" />
          교회 행사
        </CardTitle>
        <CardDescription>다가오는 교회 행사 일정</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div key={event.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`size-2.5 shrink-0 rounded-full ${event.color}`} />
                <span className="text-sm font-medium">{event.title}</span>
              </div>
              <span className="text-muted-foreground text-sm">{formatEventDate(event.date)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
