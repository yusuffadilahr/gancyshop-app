import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export function PaginationTable({
    totalPage,
    handleChangePage,
    page
}: {
    totalPage: number
    handleChangePage: (val: number) => void
    page: string
}) {
    return (
        <Pagination className="justify-end flex">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            handleChangePage(Number(page) - 1)
                        }} disabled={Number(page) === 1}>Sebelumnya</Button>
                </PaginationItem>
                {[...Array(totalPage).keys()].slice(0, 3).map((_, i) => {
                    const currentPage = i + 1

                    return (
                        <PaginationItem key={currentPage}>
                            <PaginationLink
                                isActive={Number(page) === currentPage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleChangePage(parseInt(page))
                                }}>
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            handleChangePage(Number(page) + 1)
                        }} disabled={Number(page) === totalPage}>Selanjutnya</Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
