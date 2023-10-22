import {Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CustomPagination = ({limit, now, totalPages, setPage}) => {
    const navigate = useNavigate();
    // console.log(`limit : ${limit}, now : ${now}, totalPages : ${totalPages}`)
    let number = Math.floor((now - 1) / 5);
    // console.log(`number : ${number}`)
    let items = [];
    for (let i = 1; i <= limit && limit * number + i <= totalPages; i++) {
        const pageNumber = limit * number + i;
        items.push(
            pageNumber === now ?
                <Pagination.Item active>
                    {pageNumber}
                </Pagination.Item> :
                <Pagination.Item onClick={() => {
                    setPage(pageNumber);
                    navigate(`?page=${pageNumber}`)
                }}>
                    {pageNumber}
                </Pagination.Item>
        );
    }
    const prevPage = (number - 1) * limit + 1
    const nextPage = (number + 1) * limit + 1
    // console.log(`prevPage : ${prevPage}, nextPage : ${nextPage}`)
    if (items.length === 0) {
        items.push(<Pagination.Item disabled>1</Pagination.Item>)
    }
    return (
        <Pagination>
            {prevPage < 1 ?
                <Pagination.Prev disabled/> :
                <Pagination.Prev
                    onClick={() => {
                        setPage(prevPage);
                        navigate(`?page=${prevPage}`)
                    }}/>}
            {items}
            {nextPage > totalPages ?
                <Pagination.Next disabled/> :
                <Pagination.Next onClick={() => {
                    setPage(nextPage);
                    navigate(`?page=${nextPage}`)
                }}/>}
        </Pagination>
    );
}

export default CustomPagination;