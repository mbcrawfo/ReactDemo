import '@bootstrap-css';

import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { TruckListPanel } from '../containers/TruckListPanel';

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
