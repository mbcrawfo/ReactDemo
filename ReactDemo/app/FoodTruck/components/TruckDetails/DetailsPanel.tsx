import '@bootstrap-css';

import { StarRating } from '@app/components/StarRating';
import React from 'react';
import { Panel } from 'react-bootstrap';

import { IFoodTruck } from '../../models';

export interface IDetailsPanelProps
{
    readonly truck: IFoodTruck | null;
    readonly children: React.ReactNode;
}

const DetailsPanel = ({ truck, children }: IDetailsPanelProps) =>
{
    const isActive = truck !== null;
    const style = isActive ? 'primary' : undefined;
    const {
        name = '',
        description = '',
        rating = 0,
    } = truck || {};

    const title = isActive
        ? <React.Fragment>{name} <div className="pull-right"><StarRating rating={rating} /></div></React.Fragment>
        : <span>&nbsp;</span>;

    return (
        <Panel bsStyle={style}>
            <Panel.Heading>
                <Panel.Title componentClass="h3">
                    {title}
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body style={{ minHeight: '70vh' }}>
                {isActive && <p>{description}</p>}
                {children}
            </Panel.Body>
        </Panel>
    );
};

export { DetailsPanel };
