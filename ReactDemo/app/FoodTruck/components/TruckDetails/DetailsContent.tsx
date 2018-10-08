import '@bootstrap-css';

import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { MenuCategoryListContainer } from '../../containers/TruckDetails/MenuCategoryListContainer';
import { ScheduleListContainer } from '../../containers/TruckDetails/ScheduleListContainer';

export interface IDetailsContentProps
{
    readonly truckSelected: boolean;
    readonly menuLoading: boolean;
    readonly scheduleLoading: boolean;
}

const DetailsContent = ({ truckSelected, menuLoading, scheduleLoading }: IDetailsContentProps) => (
    <Tabs defaultActiveKey={1} id="truck-details-content">
        <Tab eventKey={1} title="Menu" disabled={!truckSelected}>
            <LoadingSpinner show={menuLoading}>
                <MenuCategoryListContainer />
            </LoadingSpinner>
        </Tab>
        <Tab eventKey={2} title="Schedule" disabled={!truckSelected}>
            <LoadingSpinner show={scheduleLoading}>
                <ScheduleListContainer />
            </LoadingSpinner>
        </Tab>
    </Tabs>
);

export { DetailsContent };
