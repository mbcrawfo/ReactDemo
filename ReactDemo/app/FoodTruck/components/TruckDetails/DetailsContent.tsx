import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

export interface IDetailsContentProps
{
    readonly truckSelected: boolean;
}

const DetailsContent = ({ truckSelected }: IDetailsContentProps) => (
    <Tabs defaultActiveKey={1} id="truck-details-content">
        <Tab eventKey={1} title="Menu" disabled={!truckSelected}>
            <p>Menu</p>
        </Tab>
        <Tab eventKey={2} title="Schedule" disabled={!truckSelected}>
            <p>Schedule</p>
        </Tab>
    </Tabs>
);

export { DetailsContent };
