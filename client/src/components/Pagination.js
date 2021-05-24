import range from "lodash-es/range";
import { Pagination } from "react-bootstrap";

export const CustomPagination = ({page, pageCount, setPage}) => {
    return (
        <Pagination>
            <Pagination.First onClick={() => setPage(1)}/>
            { page > 1 && <Pagination.Prev onClick={() => setPage(page -  1)} />}

            { page > 4 && <Pagination.Ellipsis /> }
            
            {
                range(
                    Math.max(1, page - 4), 
                    Math.min(page + 4, pageCount)
                ).map((pageItem) => 
                    <Pagination.Item 
                        key={pageItem} 
                        active={page === pageItem} 
                        onClick={() => setPage(pageItem)}
                        activeLabel=""
                    >{pageItem}</Pagination.Item>
            )}

            { page < (pageCount - 4) && <Pagination.Ellipsis />}

            { page < pageCount && <Pagination.Next onClick={() => setPage(page +  1)} />}
            <Pagination.Last onClick={() => setPage(pageCount)} />
        </Pagination>
    );
}