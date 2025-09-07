import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface IPaginationTable {
  totalPage: number;
  handleChangePage: (val: number) => void;
  page: string;
}

export function PaginationTable({
  totalPage,
  handleChangePage,
  page,
}: IPaginationTable) {
  return (
    <Pagination className="justify-end flex">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => {
              handleChangePage(Number(page) - 1);
            }}
            disabled={Number(page) === 1}
          >
            Sebelumnya
          </Button>
        </PaginationItem>
        {[...Array(totalPage).keys()].map((_, i) => {
          const currentPage = i + 1;
          return (
            <PaginationItem key={currentPage}>
              <PaginationLink
                className="cursor-pointer"
                isActive={Number(page) === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangePage(parseInt(currentPage.toString()));
                }}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Button
            variant={"outline"}
            onClick={() => {
              handleChangePage(Number(page) + 1);
            }}
            disabled={Number(page) === totalPage}
          >
            Selanjutnya
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
