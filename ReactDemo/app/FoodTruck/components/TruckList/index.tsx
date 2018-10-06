import '@bootstrap-css';

import { SortDirection } from '@app/SortDirection';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { ListBodyContainer } from '../../containers/TruckList/ListBodyContainer';
import { ListSummaryContainer } from '../../containers/TruckList/ListSummaryContainer';
import { LoadingSpinnerContainer } from '../../containers/TruckList/LoadingSpinnerContainer';
import { PagerContainer } from '../../containers/TruckList/PagerContainer';
import { SearchBoxContainer } from '../../containers/TruckList/SearchBoxContainer';
import { SortHeaderContainer } from '../../containers/TruckList/SortHeaderContainer';

const TruckList = () => (
    <React.Fragment>
        <Row>
            <Col md={12}>
                <form>
                    <SearchBoxContainer />
                </form>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <SortHeaderContainer text="Name" sortName="name" />
            </Col>
            <Col md={6}>
                <SortHeaderContainer text="Rating" sortName="rating" initialSort={SortDirection.Desc} />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <LoadingSpinnerContainer>
                    <ListBodyContainer />
                </LoadingSpinnerContainer>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <div className="text-center">
                    <Col md={12}>
                        <PagerContainer />
                        <ListSummaryContainer />
                    </Col>
                </div>
            </Col>
        </Row>
    </React.Fragment>
);

export { TruckList };
