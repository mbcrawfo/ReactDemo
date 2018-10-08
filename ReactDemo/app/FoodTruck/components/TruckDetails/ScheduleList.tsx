import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { IFoodTruckScheduleEntry } from '../../models';
import { ScheduleEntry } from './ScheduleEntry';

export interface IScheduleListProps
{
    readonly entries: ReadonlyArray<IFoodTruckScheduleEntry>;
}

const ScheduleList = ({ entries }: IScheduleListProps) =>
{
    const items = entries.map((entry, index) =>
        <ScheduleEntry key={index} entry={entry} />);

    return <ListGroup>{items}</ListGroup>;
};

export { ScheduleList };
