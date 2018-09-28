import { connect } from 'react-redux';

import { IFoodTruckState } from '@app/FoodTruck/state';
import { LoadingIndicator } from '@app/components/LoadingIndicator';

const mapStateToProps = (state: IFoodTruckState) => ({
    show: state.truckList.isLoading,
});

export const TruckListLoadingIndicator = connect(mapStateToProps)(LoadingIndicator);
