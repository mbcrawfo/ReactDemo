import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IProps
{
    readonly show: boolean;
}

const TruckEditor = ({ show }: IProps) =>
(
    <Modal show={show} onHide={() => {}}>
        <Modal.Header closeButton={true}>
            <Modal.Title>Edit Food Truck</Modal.Title>
        </Modal.Header>

        <Modal.Body>text</Modal.Body>

        <Modal.Footer>
            <Button>Cancel</Button>
            <Button>Save</Button>
        </Modal.Footer>
    </Modal>
);

export { TruckEditor };
