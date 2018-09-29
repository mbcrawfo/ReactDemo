import { repeat } from 'lodash';
import React from 'react';

export interface IStarRatingProps
{
    readonly rating: number;
    readonly maxRating?: number;
    readonly showEmpty?: boolean;
}

const StarRating = ({ rating, maxRating = 5, showEmpty = true}: IStarRatingProps) =>
{
    const filledStars = repeat('\u2605', rating);
    const emptyStar = showEmpty ? '\u2606' : ' ';
    const emptyStars = repeat(emptyStar, maxRating - rating);
    const stars = filledStars + emptyStars;

    return (
        <span style={{ color: 'gold' }}>
            {stars}
        </span>
    );
};

export { StarRating };
