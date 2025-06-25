"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaginationUIProps } from "@/types";
import { cn } from "@/lib/utils";

export const PaginationUI = ({
  totalItems,
  page,
  perPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  maxPageButtons = 5,
}: PaginationUIProps) => {
  const totalPages = totalItems
    ? Math.max(1, Math.ceil(totalItems / perPage))
    : 0;
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const getPageNumbers = () => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + maxPageButtons - 1);

    if (end - start < maxPageButtons - 1) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex">
      {/* Pagination buttons */}
      <Pagination>
        <PaginationContent className="flex flex-wrap items-center gap-2">
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => onPageChange(1)}
              disabled={isFirst}
              size="sm"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => onPageChange(page - 1)}
              disabled={isFirst}
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>

          {getPageNumbers().map((pg) => (
            <PaginationItem key={pg}>
              <Button
                variant="black"
                className={cn(pg === page && "min-w-12 bg-black text-white")}
                onClick={() => onPageChange(pg)}
              >
                {pg}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => onPageChange(page + 1)}
              disabled={isLast}
              size="sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => onPageChange(totalPages)}
              disabled={isLast}
              size="sm"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page size selector */}
      <div className="text-muted-foreground hidden flex-none items-center gap-2 text-sm">
        <span>Показать</span>
        <Select
          value={String(perPage)}
          onValueChange={(v) => onPageSizeChange(1, parseInt(v))}
        >
          <SelectTrigger className="h-8 w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>на странице</span>
      </div>
    </div>
  );
};
