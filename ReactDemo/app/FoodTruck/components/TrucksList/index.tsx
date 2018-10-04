import '@bootstrap-css';

import { SortDirection } from '@app/SortDirection';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { TrucksListBody } from '../../containers/TrucksList/TrucksListBody';
import { TrucksListSummary } from '../../containers/TrucksList/TrucksListSummary';
import { TrucksLoadingSpinner } from '../../containers/TrucksList/TrucksLoadingSpinner';
import { TrucksPager } from '../../containers/TrucksList/TrucksPager';
import { TrucksSearchBox } from '../../containers/TrucksList/TrucksSearchBox';
import { TrucksSortHeader } from '../../containers/TrucksList/TrucksSortHeader';

const TrucksList = () => (
    <React.Fragment>
        <Row>
            <Col md={12}>
                <form>
                    <TrucksSearchBox />
                </form>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <TrucksSortHeader text="Name" sortName="name" />
            </Col>
            <Col md={6}>
                <TrucksSortHeader text="Rating" sortName="rating" initialSort={SortDirection.Desc} />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <TrucksLoadingSpinner>
                    <TrucksListBody />
                </TrucksLoadingSpinner>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <div className="text-center">
                    <Col md={12}>
                        <TrucksPager />
                        <TrucksListSummary />
                    </Col>
                </div>
            </Col>
        </Row>
    </React.Fragment>
);

export { TrucksList };
