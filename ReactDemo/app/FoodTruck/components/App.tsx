import { BoundSortHeader } from '@app/FoodTruck/containers/BoundSortHeader';
import { FilteredTruckList } from '@app/FoodTruck/containers/FilteredTruckList';
import { TruckListLoadingIndicator } from '@app/FoodTruck/containers/TruckListLoadingIndicator';
import { TruckListSearch } from '@app/FoodTruck/containers/TruckListSearch';
import { SortDirection } from '@app/SortDirection';
import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const App = () => (
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
                    <FilteredTruckList />
                </TruckListLoadingIndicator>
            </Col>
        </Row>
    </Grid>
);

export { App };
