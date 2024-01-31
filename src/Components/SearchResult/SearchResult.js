import { useState } from 'react'
import * as S from './SearchResult.styled'
import { getUsersSort } from '../../API/userLoginApi';
import { PaginationBar } from '../Pagination/PaginationBar';

export const SearchResult = ({ count, query, setFoundUsers, setIsError, setError }) => {

    const [sortIsVisible, setSortIsVisible] = useState(false);
    const [isAscSortActive, setIsAscSortActive] = useState(false);
    const [isDescSortActive, setIsDescSortActive] = useState(false);
    const [ activePage, setActivePage ] = useState(1);

    const sortAppear = () => {
        setSortIsVisible(!sortIsVisible);
    }

    const sortResults = (sortOrder) => {

        if (sortOrder === 'asc') {
            setIsAscSortActive(true);
            setIsDescSortActive(false);
        }
        if (sortOrder === 'desc') {
            setIsAscSortActive(false);
            setIsDescSortActive(true);
        }

        getUsersSort({ query, sortOrder, page: activePage })
        .then((users) => {setFoundUsers(users);})
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error)
            setIsError(true)
            setError(error.message)
        })
    }

    return (
        <S.SearchResultWrapper>
            <S.SearchResultContainer>
                <S.SearchResultBox>Found {count} results for {query}</S.SearchResultBox>
                <S.SearchSortBox onClick={() => sortAppear()}>Sort by <span>repositories</span>
                    <S.SortList $sortIsVisible={sortIsVisible}>
                        <S.SortListItem $isActive={isAscSortActive} onClick={() => sortResults('asc')}>Ascending</S.SortListItem>
                        <S.SortListItem $isActive={isDescSortActive} onClick={() => sortResults('desc')}>Descending</S.SortListItem>
                    </S.SortList>
                </S.SearchSortBox>
            </S.SearchResultContainer>
            <PaginationBar count={count} query={query} setFoundUsers={setFoundUsers} activePage={activePage} setActivePage={setActivePage} setError={setError} setIsError={setIsError} />
        </S.SearchResultWrapper>
    )
}