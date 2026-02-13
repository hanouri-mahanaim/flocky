import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CellGroup = {
  id: string;
  name: string;
  zone: string;
  leader: string;
  memberCount: number;
  attendanceRate: number;
  createdAt: string;
};

const cellGroups: CellGroup[] = [
  {
    id: "1",
    name: "사랑 목장",
    zone: "1초원",
    leader: "김민수",
    memberCount: 8,
    attendanceRate: 87.5,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    name: "은혜 목장",
    zone: "1초원",
    leader: "이영희",
    memberCount: 6,
    attendanceRate: 92.0,
    createdAt: "2024-04-01",
  },
  {
    id: "3",
    name: "소망 목장",
    zone: "1초원",
    leader: "박준호",
    memberCount: 7,
    attendanceRate: 78.5,
    createdAt: "2024-05-10",
  },
  {
    id: "4",
    name: "믿음 목장",
    zone: "2초원",
    leader: "정수진",
    memberCount: 5,
    attendanceRate: 95.0,
    createdAt: "2024-06-20",
  },
  {
    id: "5",
    name: "기쁨 목장",
    zone: "2초원",
    leader: "최동현",
    memberCount: 9,
    attendanceRate: 83.0,
    createdAt: "2024-07-05",
  },
  {
    id: "6",
    name: "평화 목장",
    zone: "2초원",
    leader: "한지은",
    memberCount: 6,
    attendanceRate: 90.0,
    createdAt: "2024-08-12",
  },
  {
    id: "7",
    name: "감사 목장",
    zone: "3초원",
    leader: "윤서연",
    memberCount: 8,
    attendanceRate: 85.0,
    createdAt: "2024-09-01",
  },
  {
    id: "8",
    name: "축복 목장",
    zone: "3초원",
    leader: "장현우",
    memberCount: 4,
    attendanceRate: 100.0,
    createdAt: "2024-10-15",
  },
  {
    id: "9",
    name: "열매 목장",
    zone: "3초원",
    leader: "송지아",
    memberCount: 7,
    attendanceRate: 71.5,
    createdAt: "2024-11-20",
  },
  {
    id: "10",
    name: "새벽 목장",
    zone: "4초원",
    leader: "임도윤",
    memberCount: 5,
    attendanceRate: 88.0,
    createdAt: "2025-01-08",
  },
  {
    id: "11",
    name: "빛과소금 목장",
    zone: "4초원",
    leader: "강하늘",
    memberCount: 6,
    attendanceRate: 93.5,
    createdAt: "2025-02-14",
  },
  {
    id: "12",
    name: "동행 목장",
    zone: "4초원",
    leader: "조예린",
    memberCount: 8,
    attendanceRate: 80.0,
    createdAt: "2025-03-22",
  },
  {
    id: "13",
    name: "샘물 목장",
    zone: "5초원",
    leader: "백승민",
    memberCount: 7,
    attendanceRate: 76.0,
    createdAt: "2025-05-01",
  },
  {
    id: "14",
    name: "하늘문 목장",
    zone: "5초원",
    leader: "유하은",
    memberCount: 5,
    attendanceRate: 96.0,
    createdAt: "2025-06-10",
  },
  {
    id: "15",
    name: "포도원 목장",
    zone: "5초원",
    leader: "오준서",
    memberCount: 9,
    attendanceRate: 82.5,
    createdAt: "2025-08-18",
  },
];

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

function SortableHeader({
  column,
  children,
}: {
  column: { toggleSorting: (desc?: boolean) => void; getIsSorted: () => false | "asc" | "desc" };
  children: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDownIcon className="size-3" />
    </Button>
  );
}

const columns: ColumnDef<CellGroup>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>목장 이름</SortableHeader>,
    cell: ({ row }) => (
      <Link
        to={`/app/cell-groups/${row.original.id}`}
        className="text-foreground font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "zone",
    header: "초원",
    cell: ({ row }) => <Badge variant="outline">{row.original.zone}</Badge>,
  },
  {
    accessorKey: "leader",
    header: "목자",
    cell: ({ row }) => row.original.leader,
  },
  {
    accessorKey: "memberCount",
    header: ({ column }) => <SortableHeader column={column}>목원 수</SortableHeader>,
    cell: ({ row }) => <span>{row.original.memberCount}명</span>,
  },
  {
    accessorKey: "attendanceRate",
    header: ({ column }) => <SortableHeader column={column}>출석률</SortableHeader>,
    cell: ({ row }) => {
      const rate = row.original.attendanceRate;
      return <Badge variant={getAttendanceBadgeVariant(rate)}>{rate}%</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column}>등록일</SortableHeader>,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
    ),
  },
];

export default function CellGroups() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: cellGroups,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">목장 검색</h1>
        </div>

        <div className="relative max-w-sm">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="목장 이름으로 검색..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="pl-8"
          />
        </div>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-muted-foreground hidden text-sm lg:block">
            총 {table.getFilteredRowModel().rows.length}개의 목장
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                페이지당 행 수
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} 페이지
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">첫 페이지로</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">이전 페이지</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">다음 페이지</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">마지막 페이지로</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
