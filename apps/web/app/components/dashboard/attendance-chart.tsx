import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

const chartData = [
  { date: "2025-12-07", sunday: 245, cellGroup: 178 },
  { date: "2025-12-14", sunday: 258, cellGroup: 185 },
  { date: "2025-12-21", sunday: 272, cellGroup: 192 },
  { date: "2025-12-28", sunday: 231, cellGroup: 165 },
  { date: "2026-01-04", sunday: 265, cellGroup: 188 },
  { date: "2026-01-11", sunday: 248, cellGroup: 176 },
  { date: "2026-01-18", sunday: 270, cellGroup: 195 },
  { date: "2026-01-25", sunday: 255, cellGroup: 182 },
  { date: "2026-02-01", sunday: 262, cellGroup: 190 },
  { date: "2026-02-08", sunday: 275, cellGroup: 198 },
  { date: "2026-02-15", sunday: 268, cellGroup: 193 },
  { date: "2026-02-22", sunday: 280, cellGroup: 200 },
  { date: "2026-03-01", sunday: 273, cellGroup: 196 },
];

const chartConfig = {
  attendance: {
    label: "출석",
  },
  sunday: {
    label: "주일예배",
    color: "var(--primary)",
  },
  cellGroup: {
    label: "목장모임",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("90d");

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2026-03-01");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>출석 현황</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            최근 3개월 주일예배 및 목장모임 출석 현황
          </span>
          <span className="@[540px]/card:hidden">최근 3개월</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">최근 3개월</ToggleGroupItem>
            <ToggleGroupItem value="30d">최근 30일</ToggleGroupItem>
            <ToggleGroupItem value="7d">최근 7일</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="기간 선택"
            >
              <SelectValue placeholder="최근 3개월" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                최근 3개월
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                최근 30일
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                최근 7일
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSunday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sunday)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-sunday)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCellGroup" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cellGroup)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-cellGroup)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ko-KR", {
                      month: "long",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="cellGroup"
              type="natural"
              fill="url(#fillCellGroup)"
              stroke="var(--color-cellGroup)"
              stackId="a"
            />
            <Area
              dataKey="sunday"
              type="natural"
              fill="url(#fillSunday)"
              stroke="var(--color-sunday)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
