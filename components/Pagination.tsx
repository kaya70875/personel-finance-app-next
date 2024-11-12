'use client';

import React, { useEffect, useState } from 'react'
import './styles/_Pagination.scss'

interface PaginationProps {
    postsPerPage: number,
    totalPosts: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number;
}

export default function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }: PaginationProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 425px)').matches);
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    let pages = []

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    if (isMobile) {
        pages = [...pages.slice(0, 2)];

        if (currentPage > 1) {
            if (currentPage > 2) {
                pages.push(currentPage);
                pages.shift();
            }

            if(currentPage !== totalPages - 1) {
                pages.push(currentPage + 1);
            }
        }

        if(currentPage !== totalPages) {
            pages.push(totalPages);
        }

        if (currentPage === totalPages) {
            pages = [...pages.slice(0, pages.length - 2), totalPages];
        }
    }

    return (
        <div className='pagination-wrapper'>
            {pages.map((page, index) => {
                return <button className={`pagination-btn ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)} key={index}>{page}</button>
            })}
        </div>
    )
}
