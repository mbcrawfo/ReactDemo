import '@bootstrap-css';

import React from 'react';
import { Button, ButtonToolbar, Col, Grid, Row } from 'react-bootstrap';

import { DeleteButtonContainer } from '../containers/DeleteButtonContainer';
import { ConfirmationModalContainer } from '../containers/reusable';
import { TruckDetails } from './TruckDetails';
import { TruckList } from './TruckList';

const App = () => (
    <div>
        <Grid>
            <Row>
                <Col md={4}>
                    <TruckList />
                </Col>
                <Col mdOffset={1} md={7}>
                    <Row>
                        <Col md={12}>
                            <ButtonToolbar className="pull-right" style={{ paddingBottom: '5vh' }}>
                                <Button disabled={true}>Placeholder 1</Button>
                                <Button disabled={true}>Placeholder 2</Button>
                                <DeleteButtonContainer bsStyle="danger">
                                    Delete
                                </DeleteButtonContainer>
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
        <ConfirmationModalContainer />
    </div>
);

export { App };
