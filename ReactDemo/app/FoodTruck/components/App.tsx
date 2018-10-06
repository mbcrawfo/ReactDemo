import '@bootstrap-css';

import React from 'react';
import { Button, ButtonToolbar, Col, Grid, Row } from 'react-bootstrap';

import { TruckDetails } from './TruckDetails';
import { TruckList } from './TruckList';

const App = () => (
    <Grid>
        <Row>
            <Col md={4}>
                <TruckList />
            </Col>
            <Col md={8}>
                <Row>
                    <Col md={12}>
                        <ButtonToolbar className="pull-right" style={{ paddingBottom: '2vh' }}>
                            <Button disabled={true}>Placeholder 1</Button>
                            {' '}
                            <Button disabled={true}>Placeholder 2</Button>
                            {' '}
                            <Button disabled={true}>Placeholder 3</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <TruckDetails />
                    </Col>
                </Row>
            </Col>
        </Row>
    </Grid>
);

export { App };
