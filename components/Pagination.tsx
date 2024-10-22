import React from 'react'
import './styles/_Pagination.scss'

interface PaginationProps {
    postsPerPage: number,
    totalPosts: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage : number;
}

export default function Pagination({ postsPerPage, totalPosts, setCurrentPage , currentPage } : PaginationProps) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className='pagination-wrapper'>
            {pages.map((page, index) => {
                return <button className={`pagination-btn ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)} key={index}>{page}</button>
            })}
        </div>
    )
}
