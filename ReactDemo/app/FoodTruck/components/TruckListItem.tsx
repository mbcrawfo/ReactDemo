import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import '@bootstrap-css';

import { StarRating } from '@app/components/StarRating';

export interface ITruckListItemProps
{
    readonly name: string;
    readonly rating: number;
    readonly selected: boolean;
    readonly onClick: () => void;
}

export const TruckListItem = ({ name, rating, selected, onClick }: ITruckListItemProps) => (
    <ListGroupItem href="" active={selected} onClick={onClick}>
        <h4>
            {name}
            <div className="pull-right">
                <StarRating rating={rating} />
            </div>
        </h4>
    </ListGroupItem>
);
