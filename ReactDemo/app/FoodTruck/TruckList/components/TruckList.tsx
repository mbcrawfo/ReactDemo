import '@bootstrap-css';

import { LoadingSpinner } from '@app/components/LoadingSpinner';
import { Pager } from '@app/components/Pager';
import { SearchBox } from '@app/components/SearchBox';
import { SortHeader } from '@app/components/SortHeader';
import SortDirection from '@app/SortDirection';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { IFetchTruckRequest } from '../../api';
import { IFoodTruck } from '../../types';
import { TruckListBody } from './TruckListBody';
import { TruckListSummary } from './TruckListSummary';

export interface ITruckListProps
{
    readonly searchTerm: string;
    readonly setSearchTerm: (term: string) => void;
    readonly sort: SortDirection;
    readonly sortName: IFetchTruckRequest['sortName'];
    readonly setSort: (sort: SortDirection, sortName: IFetchTruckRequest['sortName']) => void;
    readonly loading: boolean;
    readonly visibleTrucks: ReadonlyArray<IFoodTruck>;
    readonly selectedTruckId: number | null;
    readonly setSelectedTruck: (id: number) => void;
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly filteredTrucks: number;
    readonly totalTrucks: number;
    readonly setPage: (page: number) => void;
    readonly errorMessage: string;
}

class TruckList extends React.PureComponent<ITruckListProps>
{
    public readonly render = () =>
    {
        const {
            searchTerm,
            setSearchTerm,
            sort,
            sortName,
            loading,
            visibleTrucks,
            selectedTruckId,
            setSelectedTruck,
            pageNumber,
            pageSize,
            filteredTrucks,
            totalTrucks,
            setPage,
            errorMessage,
        } = this.props;

        return (
            <React.Fragment>
                <Row>
                    <Col md={12}>
                        <form>
                            <SearchBox currentTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <SortHeader
                            text="Name"
                            sort={sortName === 'name' ? sort : null}
                            setSort={this.sortByName}
                        />
                    </Col>
                    <Col md={6}>
                        <SortHeader
                            text="Rating"
                            sort={sortName === 'rating' ? sort : null}
                            initialSort={SortDirection.Desc}
                            setSort={this.sortByRating}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {errorMessage && <p className="text-center">Error: {errorMessage}</p>}
                        <LoadingSpinner show={loading}>
                            <TruckListBody
                                trucks={visibleTrucks}
                                selectedId={selectedTruckId}
                                onTruckClick={setSelectedTruck}
                            />
                        </LoadingSpinner>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="text-center">
                            <Col md={12}>
                                <Pager
                                    page={pageNumber}
                                    pageSize={pageSize}
                                    items={filteredTrucks}
                                    setPage={setPage}
                                />
                                <TruckListSummary
                                    page={pageNumber}
                                    pageSize={pageSize}
                                    items={filteredTrucks}
                                    filtered={filteredTrucks < totalTrucks}
                                />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    private readonly sortByName = (sort: SortDirection) => this.props.setSort(sort, 'name');
    private readonly sortByRating = (sort: SortDirection) => this.props.setSort(sort, 'rating');
}

export { TruckList };
