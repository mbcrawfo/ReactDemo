import '@bootstrap-css';

import { StarRating } from '@app/components/StarRating';
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import { IFoodTruck } from '../../models';

export interface IListItemProps
{
    readonly truck: IFoodTruck;
    readonly selected: boolean;
    readonly selectTruck: (id: number) => void;
}

class ListItem extends React.PureComponent<IListItemProps>
{
    public readonly render = () =>
    {
        const { truck: { name, rating }, selected } = this.props;

        return (
            <ListGroupItem href="" active={selected} onClick={this.onClick}>
                <h4>
                    {name}
                    <div className="pull-right">
                        <StarRating rating={rating} />
                    </div>
                </h4>
            </ListGroupItem>
        );
    }

    private readonly onClick = () =>
    {
        const { truck: { id }, selectTruck} = this.props;
        selectTruck(id);
    }
}

export { ListItem };
