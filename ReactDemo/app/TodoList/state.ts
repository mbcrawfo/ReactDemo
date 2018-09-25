export interface ITodoListItem
{
    readonly id: number;
    readonly text: string;
    readonly completed: boolean;
}

export enum VisibilityFilter
{
    All = 'SHOW_ALL',
    Completed = 'SHOW_COMPLETED',
    Active = 'SHOW_ACTIVE',
}

export interface ITodoState
{
    readonly visibilityFilter: VisibilityFilter;
    readonly items: ReadonlyArray<ITodoListItem>;
}
