import { range } from 'lodash';
import React from 'react';
import { Pagination } from 'react-bootstrap';

export interface IPagerProps
{
    readonly currentPage: number;
    readonly pageSize: number;
    readonly totalItems: number;
    readonly setPage: (page: number) => void;
}

const Pager = ({currentPage, pageSize, totalItems, setPage}: IPagerProps) =>
{
    const buttonCount = 5;
    const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
    const buttonStartPage = Math.min(
        Math.max(1, currentPage - 2),
        Math.max(1, pageCount - buttonCount + 1)
    );

    const setPageWhen = (condition: boolean, targetPage: number) => ({
        disabled: !condition,
        onClick: condition ?  () => setPage(targetPage) : undefined,
    });

    const pageButtons = range(0, buttonCount).map(i =>
    {
        const pageNumber = buttonStartPage + i;
        const isActive = pageNumber === currentPage;
        const clickable = pageNumber <= pageCount;

        return (
            <Pagination.Item key={pageNumber} active={isActive} {...setPageWhen(clickable, pageNumber)}>
                {pageNumber}
            </Pagination.Item>
        );
    });

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;

    return (
        <Pagination>
            <Pagination.First {...setPageWhen(!isFirstPage, 1)} />
            <Pagination.Prev {...setPageWhen(!isFirstPage, currentPage - 1)} />
            {pageButtons}
            <Pagination.Next {...setPageWhen(!isLastPage, currentPage + 1)} />
            <Pagination.Last {...setPageWhen(!isLastPage, pageCount)} />
        </Pagination>
    );
};

export { Pager };
