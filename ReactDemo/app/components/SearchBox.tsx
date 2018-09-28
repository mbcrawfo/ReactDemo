import React from 'react';
import '@bootstrap-css';

export interface ISearchBoxProps
{
    readonly currentTerm: string;
    readonly setSearchTerm: (term: string) => void;
}

export const SearchBox = ({ currentTerm, setSearchTerm }: ISearchBoxProps) =>
{
    const inputRef = React.createRef<HTMLInputElement>();

    const onKeyUp = () =>
    {
        const input = inputRef.current;
        if (!input || input.value.trim() === currentTerm)
        {
            return;
        }

        setSearchTerm(input.value);
    };

    return <input className="form-control" ref={inputRef} type="text" placeholder="Type to Search" onKeyUp={onKeyUp} />;
};
