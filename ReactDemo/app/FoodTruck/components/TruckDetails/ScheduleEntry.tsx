import moment from 'moment';
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import { IFoodTruckScheduleEntry } from '../../models';

export interface IScheduleEntry
{
    readonly entry: IFoodTruckScheduleEntry;
}

const ScheduleEntry = ({ entry: { locationName, address, start, end } }: IScheduleEntry) =>
{
    const startMoment = moment(start);
    const endMoment = moment(end);
    const header = `${startMoment.format('MMM D YYYY')} ${startMoment.format('LT')} to ${endMoment.format('LT')}`;

    return (
        <ListGroupItem header={header}>
            <p>
                <strong>{locationName}</strong><br />
                {address}
            </p>
        </ListGroupItem>
    );
};

export { ScheduleEntry };
