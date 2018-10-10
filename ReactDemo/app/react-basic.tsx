import React from 'react';

// The most basic React component is a function that returns elements to display.
// This is called a Stateless Functional Component.  It can optionally take parameters
// via a props (properties) object.  SFC's should always be the first choice for structuring
// a component.
export const BasicComponent = () => <p>I'm a component.</p>;

// A component may also be a class.  This is identical to the BasicComponent above.
export class ClassComponent extends React.PureComponent
{
    public readonly render = () => <p>I'm a component.</p>;
}

interface IProps
{
    readonly text: string;
    readonly value: number;
}

// When a component has props, we often use parameter destructuring to avoid having to write
// extra code in the render method.
export const ComponentWithProps = ({ text, value }: IProps) => (
    <p>Text is '{text}' and value is '{value}'.</p>
);

interface IStatefulComponentProps
{
    readonly initialCount: number;
}

interface IStatefulComponentState
{
    readonly count: number;
    readonly unusedValue: string;
}

// Class components may have internal state.  PureComponent is the preferred base class.
// Using it means that we are not allowed to change the state directly, instead we tell React
// what state properties have changed and allow it to merge the changes into the state object.
// React also automatically provides logic to determine when the component needs to be re-rendered.
// tslint:disable-next-line:max-classes-per-file
export class StatefulComponent extends React.PureComponent<IStatefulComponentProps, IStatefulComponentState>
{
    constructor(props: IStatefulComponentProps)
    {
        super(props);

        // Initialization is the only time we can directly set state
        this.state = {
            count: props.initialCount,
            unusedValue: 'abc123',
        };
    }

    public readonly render = () =>
    {
        const { count } = this.state;

        return (
            <div>
                <button type="button" onClick={this.reset}>Reset Count</button>
                <button type="button" onClick={this.increment}>Count: {count}</button>
            </div>
        );
    }

    private readonly reset = () =>
    {
        // setState takes in only the changed values.
        // This will update count without affecting unusedValue
        this.setState({ count: 0 });
    }

    private readonly increment = () =>
    {
        // When the state change depends on the current state, we must provide a callback to do the update.
        // This is necessary because React will batch state updates together for performance reasons,
        // so the state may have changed by the time this update is applied.
        this.setState((state, props) => ({ count: state.count + 1 }));
    }
}

interface ICondition
{
    readonly condition: boolean;
}

// Everything in React is Javascript (Typescript), so to do things like conditional output,
// we just change what the component returns.
export const ConditionalRendering = ({ condition }: ICondition) =>
{
    if (condition)
    {
        return <h1>True condition output.</h1>;
    }
    else
    {
        return <p>False condition output.</p>;
    }
};

// A component can also have no output.
export const ConditionalOutput = ({ condition }: ICondition) =>
{
    if (!condition)
    {
        // React will render nothing
        return null;
    }

    return <p>Conditional output is happening.</p>;
};

// We can also use TS to conditionally display parts of the component output.
export const AdditionalOutput = ({ condition }: ICondition) => (
    // React render methods must return a single XML node.  To avoid adding unnecessary elements to
    // the DOM, we can wrap output in a React Fragment.
    <React.Fragment>
        {condition && <p>This output means condition is true.</p>}
        <p>This output is always display.</p>
    </React.Fragment>
);

interface IChildren
{
    readonly children: React.ReactNode;
}

// React components can also wrap one another
export const SillyHeader = ({ text, children }: IChildren & { text: string }) => (
    <React.Fragment>
        <h2>{text}</h2>
        {children}
    </React.Fragment>
);

export const ParagraphWithHeader = (
    <SillyHeader text="Some header text.">
        <p>Some paragraph content.</p>
    </SillyHeader>
);

// With a slight tweak we can let the header accept totally dynamic content.  This ability
// to compose components together makes React extremely powerful and flexible when building
// reusable components.
export const SillyHeaderV2 = ({ header, children }: IChildren & { header: React.ReactNode }) => (
    <React.Fragment>
        {header}
        {children}
    </React.Fragment>
);

export const ParagraphWithRichHeader = (
    <SillyHeaderV2 header={<p>Some <strong>rich</strong> <em>header content</em>.</p>}>
        <p>Some paragraph content.</p>
    </SillyHeaderV2>
);

// TS is also used when a component needs to render multiple items.
export const WordList = ({ words }: { words: string[] }) =>
{
    // When items are repeated, React needs a key property to help it determine when the list items
    // need to be redrawn.  Ideally this is a unique identifier (e.g. database id), but the array
    // index can be used in a pinch.
    const listItems = words.map((word, index) => <li key={index}>{word}</li>);

    return <ul>{listItems}</ul>;
};

export const LoremIpsumList = <WordList words={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']} />;
