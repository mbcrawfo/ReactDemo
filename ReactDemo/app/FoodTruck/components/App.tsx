import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { VisibleTruckList } from '@app/FoodTruck/containers/VisibleTruckList';
import { TruckListLoadingIndicator } from '@app/FoodTruck/containers/TruckListLoadingIndicator';
import { BoundSortHeader } from '@app/FoodTruck/containers/BoundSortHeader';
import { SortDirection } from '@app/SortDirection';
import { TruckListSearch } from '@app/FoodTruck/containers/TruckListSearch';

export const App = () => (
    <Grid>
        <Row>
            <Col md={4}>
                <Row>
                    <Col md={12}>
                        <form>
                            <TruckListSearch />
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <BoundSortHeader text="Name" sortName="name" />
                    </Col>
                    <Col md={6}>
                        <BoundSortHeader text="Rating" sortName="rating" initialSortDirection={SortDirection.Desc} />
                    </Col>
                </Row>
                <TruckListLoadingIndicator>
                    <VisibleTruckList />
                </TruckListLoadingIndicator>
            </Col>
        </Row>
    </Grid>
);
