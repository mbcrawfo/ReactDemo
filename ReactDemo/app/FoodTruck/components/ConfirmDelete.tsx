import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IConfirmDeleteProps
{
    readonly show: boolean;
    readonly truckName: string;
    readonly confirm: () => void;
    readonly cancel: () => void;
}

const ConfirmDelete = ({ show, truckName, confirm, cancel }: IConfirmDeleteProps) => (
    <Modal show={show} onHide={cancel}>
        <Modal.Header closeButton={true}>
            <Modal.Title>Delete Food Truck?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Do you want to delete <strong>{truckName}</strong>?</p>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={cancel}>
                Cancel
            </Button>
            <Button bsStyle="danger" onClick={confirm}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export { ConfirmDelete };
