import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import '../site.css';

interface ILoremProps
{
    interval: number,
    paragraphs: Array<string>
}

interface ILoremState
{
    autoAdvance: boolean,
    index: number,
    countdown: number
}

class Lorem extends React.PureComponent<ILoremProps, ILoremState>
{
    static readonly counterInterval = 100;

    paragraphTimerId: any;
    counterTimerId: any;

    constructor(props: ILoremProps)
    {
        super(props);

        this.state = {
            autoAdvance: true,
            index: 0,
            countdown: props.interval
        };
    }

    readonly startTimers = (props: ILoremProps) =>
    {
        this.paragraphTimerId = setInterval(this.showNextParagraph, props.interval);
        this.counterTimerId = setInterval(this.updateCountdown, Lorem.counterInterval);
    };

    readonly clearTimers = () =>
    {
        clearInterval(this.paragraphTimerId);
        clearInterval(this.counterTimerId);
    };

    readonly showNextParagraph = () => this.setState((state, props) =>
    {
        if (state.autoAdvance)
        {
            this.clearTimers();
            this.startTimers(props);
        }

        return {
            index: (state.index + 1) % props.paragraphs.length,
            countdown: props.interval
        };
    });

    readonly updateCountdown = () => this.setState((state) => ({
        countdown: state.countdown - Lorem.counterInterval
    }));

    readonly toggleAutoAdvance = () => this.setState((state, props) =>
    {
        const autoAdvance = !state.autoAdvance;

        if (autoAdvance)
        {
            this.startTimers(props);
        }
        else
        {
            this.clearTimers();
        }

        return {
            autoAdvance: autoAdvance,
            countdown: props.interval
        };
    });

    readonly componentDidMount = () =>
    {
        if (this.state.autoAdvance)
        {
            this.startTimers(this.props);
        }
    };

    readonly componentWillUnmount = () => this.clearTimers();

    readonly render = () =>
    {
        const text = this.props.paragraphs[this.state.index];
        const index = this.state.index + 1;
        const total = this.props.paragraphs.length;
        const autoAdvance = this.state.autoAdvance;
        const countdown = Math.ceil(this.state.countdown / 1000);

        const toggleButtonClasses = classNames("btn", "btn-default", {
            active: autoAdvance
        });
        const toggleButtonStateText = autoAdvance ? 'Y' : 'N';

        return (
            <div>
                <h1 className="text-center">Lorem Ipsum</h1>
                <h4 className="text-center">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h4>
                <h5 className="text-center">"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5>
                <p>{text}</p>
                <p>Paragraph {index} of {total}</p>

                <button className="btn btn-primary" onClick={this.showNextParagraph}>
                    Next{autoAdvance && <span> ({countdown})</span>}
                </button>

                <button className={toggleButtonClasses} onClick={this.toggleAutoAdvance}>
                    Auto-Advance: {toggleButtonStateText}
                </button>
            </div>
        );
    }
}

const paragraphData = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis pulvinar felis at mollis. Quisque fermentum lorem ut elit interdum congue. Sed hendrerit sapien non ligula suscipit, at tempus nunc molestie. Morbi ac felis sed magna placerat ultricies. Vestibulum rhoncus placerat nisi, in ullamcorper felis imperdiet sed. Integer egestas lacus quis lacus viverra cursus. Aliquam erat volutpat. Sed pretium, risus eu malesuada sagittis, nisi eros laoreet justo, quis semper nisl lacus quis purus. Vestibulum dictum arcu quis euismod suscipit. Donec semper mattis urna, ut euismod eros eleifend non. Praesent semper, enim eget accumsan vehicula, tortor velit venenatis lorem, id ullamcorper odio nibh vitae tellus. Donec eleifend gravida purus vitae sagittis. Cras vitae dapibus arcu. Morbi et ultrices sapien. Pellentesque sit amet massa at metus malesuada lobortis in nec risus.',
    'Cras pellentesque metus et magna pulvinar cursus. Aliquam eget purus sodales, posuere lectus nec, tristique neque. Ut porttitor nunc non erat ullamcorper, in tincidunt tellus rutrum. Integer et sollicitudin lacus. Curabitur quis suscipit ante. Integer ornare sapien in enim facilisis, quis lobortis metus fringilla. Morbi justo erat, bibendum eu fermentum et, hendrerit vitae lorem. Donec feugiat sem sed erat condimentum accumsan. Vestibulum vehicula diam vitae eros blandit pharetra. Nullam eget tellus cursus dui congue aliquam. Nullam id mauris ut tellus porta volutpat.',
    'Maecenas non semper libero, ac semper urna. Pellentesque mattis viverra ante, iaculis aliquam ipsum. Curabitur eleifend gravida maximus. In ut urna mollis velit laoreet consectetur ut a justo. Donec et elit a metus pulvinar luctus. Sed vitae mi vehicula, eleifend orci ac, facilisis ante. Cras augue ligula, volutpat blandit eros vitae, facilisis tempus lacus. Ut eget diam tempus, lacinia arcu nec, lacinia orci. Nulla faucibus sed mi eget sodales. Sed varius urna at elit cursus finibus pulvinar et quam. Aliquam facilisis nibh sem, nec mollis elit consectetur non. Sed sodales at dolor imperdiet tristique. Quisque rutrum augue id rutrum faucibus. Fusce fermentum vel est ac rutrum. Vivamus placerat eget diam ut suscipit. Praesent elementum rutrum hendrerit.',
    'Suspendisse potenti. Curabitur vitae diam sed est fringilla egestas ac id mi. Curabitur eu euismod justo. Donec venenatis efficitur tincidunt. Etiam a mollis nisi, eu pellentesque lacus. Donec finibus sodales ornare. Donec maximus dapibus nibh id dapibus. Nunc eu dolor congue, auctor tellus condimentum, ultrices magna. Fusce in quam sed eros imperdiet facilisis.',
    'Sed cursus suscipit euismod. Duis vitae fermentum erat, non faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla et dolor tortor. Phasellus sollicitudin tempor ipsum. In vel vulputate purus. Nunc ultricies consectetur congue.'
];

ReactDOM.render(
    <Lorem interval={15000} paragraphs={paragraphData}/>,
    document.getElementById('lorem-content')
);