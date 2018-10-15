import '@bootstrap-css';

import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IProps
{
    readonly show: boolean;
    readonly cancel: () => void;
}

const TruckEditor = ({ show, cancel }: IProps) =>
(
    <Modal show={show} onHide={cancel}>
        <Modal.Header closeButton={true}>
            <Modal.Title>Edit Food Truck</Modal.Title>
        </Modal.Header>

        <Modal.Body>text</Modal.Body>

        <Modal.Footer>
            <Button onClick={cancel}>Cancel</Button>
            <Button>Save</Button>
        </Modal.Footer>
    </Modal>
);

export { TruckEditor };
