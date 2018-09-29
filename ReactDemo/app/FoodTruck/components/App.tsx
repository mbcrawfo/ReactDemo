import { TruckListPanel } from '@app/FoodTruck/components/TruckListPanel';
import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const App = () => (
    <Grid>
        <Row>
            <Col md={4}>
                <TruckListPanel />
            </Col>
        </Row>
    </Grid>
);

export { App };
