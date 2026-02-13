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

import { GenderIcon, type Gender } from "@/components/gender-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const members: Member[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

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

function formatBirthday(birthday: string): string {
  const formatted = formatDate(birthday);
  return `${formatted} (${getAge(birthday)}세)`;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
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

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>이름</SortableHeader>,
    cell: ({ row }) => (
      <Link
        to={`/app/members/${row.original.id}`}
        className="text-foreground flex items-center gap-2 font-medium hover:underline"
      >
        <Avatar size="sm">
          <AvatarImage src={row.original.profileImage} alt={row.original.name} />
          <AvatarFallback>{row.original.name.slice(-2)}</AvatarFallback>
        </Avatar>
        {row.original.name}
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: "성별",
    cell: ({ row }) => <GenderIcon gender={row.original.gender} />,
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <SortableHeader column={column}>
        <span className="hidden lg:inline">생년월일</span>
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="hidden lg:inline">{formatBirthday(row.original.birthday)}</span>
    ),
    meta: { className: "hidden lg:table-cell" },
  },
  {
    accessorKey: "address",
    header: () => <span className="hidden lg:inline">주소</span>,
    cell: ({ row }) => (
      <span className="text-muted-foreground hidden lg:inline">{row.original.address}</span>
    ),
    meta: { className: "hidden lg:table-cell" },
  },
  {
    accessorKey: "contact",
    header: () => <span className="hidden lg:inline">연락처</span>,
    cell: ({ row }) => (
      <span className="text-muted-foreground hidden lg:inline">{row.original.contact}</span>
    ),
    meta: { className: "hidden lg:table-cell" },
  },
  {
    accessorKey: "cellGroup",
    header: "목장",
    cell: ({ row }) => <Badge variant="outline">{row.original.cellGroup}</Badge>,
  },
  {
    accessorKey: "role",
    header: "직분",
    cell: ({ row }) => {
      const role = row.original.role;
      return <Badge variant={role === "목자" ? "default" : "secondary"}>{role}</Badge>;
    },
  },
  {
    accessorKey: "registeredAt",
    header: ({ column }) => (
      <SortableHeader column={column}>
        <span className="hidden lg:inline">등록일</span>
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground hidden lg:inline">
        {formatDate(row.original.registeredAt)}
      </span>
    ),
    meta: { className: "hidden lg:table-cell" },
  },
];

export default function MembersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: members,
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
          <h1 className="text-lg font-semibold">교인 검색</h1>
        </div>

        <div className="relative max-w-sm">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="이름으로 검색..."
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
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta as { className?: string } | undefined;
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={meta?.className}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as { className?: string } | undefined;
                      return (
                        <TableCell key={cell.id} className={meta?.className}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
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
            총 {table.getFilteredRowModel().rows.length}명의 교인
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
