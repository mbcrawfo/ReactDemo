import '@bootstrap-css';

import React from 'react';
import { Button, ButtonToolbar, Col, Grid, Row } from 'react-bootstrap';

import { truckEditorActions } from '../../modules/TruckEditor';
import { ConfirmationModalContainer, TruckEditorContainer } from '../containers/modules';
import { SelectedTruckButton } from '../containers/SelectedTruckButton';
import { actions } from '../store';
import { TruckDetails } from './TruckDetails';
import { TruckList } from './TruckList';

const App = () => (
    <React.Fragment>
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
                                <SelectedTruckButton bsStyle="primary" actionCreator={truckEditorActions.show}>
                                    Edit
                                </SelectedTruckButton>
                                <SelectedTruckButton bsStyle="danger" actionCreator={actions.deleteTruck.begin}>
                                    Delete
                                </SelectedTruckButton>
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
        <TruckEditorContainer />
    </React.Fragment>
);

export { App };
