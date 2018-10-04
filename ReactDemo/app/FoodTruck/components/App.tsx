import '@bootstrap-css';

import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { TrucksList } from './TrucksList';

const App = () => (
    <Grid>
        <Row>
            <Col md={4}>
                <TrucksList />
            </Col>
        </Row>
    </Grid>
);

export { App };
