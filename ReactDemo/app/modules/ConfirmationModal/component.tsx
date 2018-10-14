import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IProps
{
    readonly show: boolean;
    readonly title: string;
    readonly text: string;
    readonly onAccept: () => void;
    readonly onCancel: () => void;
    readonly acceptButtonText?: string;
    readonly cancelButtonText?: string;
}

const ConfirmationModal = ({
    show,
    title,
    text,
    onAccept,
    onCancel,
    acceptButtonText = 'Ok',
    cancelButtonText = 'Cancel',
}: IProps) =>
(
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton={true}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{text}</Modal.Body>

        <Modal.Footer>
            <Button onClick={onCancel}>{cancelButtonText}</Button>
            <Button bsStyle="primary" onClick={onAccept}>{acceptButtonText}</Button>
        </Modal.Footer>
    </Modal>
);

export { ConfirmationModal };
