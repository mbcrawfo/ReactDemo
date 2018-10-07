import { LoadingSpinner } from '@app/components/LoadingSpinner';
import { connect } from 'react-redux';

import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
    show: state.trucksLoading,
});

const LoadingSpinnerContainer = connect(mapStateToProps)(LoadingSpinner);
export { LoadingSpinnerContainer };
