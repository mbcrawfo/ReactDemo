import { FilteredTruckList } from '@app/FoodTruck/containers/FilteredTruckList';
import { TruckListLoadingIndicator } from '@app/FoodTruck/containers/TruckListLoadingIndicator';
import { TruckListPager } from '@app/FoodTruck/containers/TruckListPager';
import { TruckListPageSummary } from '@app/FoodTruck/containers/TruckListPageSummary';
import { TruckListSearch } from '@app/FoodTruck/containers/TruckListSearch';
import { TruckListSortHeader } from '@app/FoodTruck/containers/TruckListSortHeader';
import SortDirection from '@app/SortDirection';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TruckListPanel = () => (
    <div>
        <Row>
            <Col md={12}>
                <form>
                    <TruckListSearch />
                </form>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <TruckListSortHeader text="Name" sortName="name" />
            </Col>
            <Col md={6}>
                <TruckListSortHeader text="Rating" sortName="rating" initialSortDirection={SortDirection.Desc} />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <TruckListLoadingIndicator>
                    <FilteredTruckList />
                </TruckListLoadingIndicator>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <div className="text-center">
                    <Col md={12}>
                        <TruckListPager />
                        <TruckListPageSummary />
                    </Col>
                </div>
            </Col>
        </Row>
    </div>
);

export { TruckListPanel };
