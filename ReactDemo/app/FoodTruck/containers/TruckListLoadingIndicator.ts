import { LoadingIndicator } from '@app/components/LoadingIndicator';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: IFoodTruckState) => ({
    show: state.truckList.isLoading,
});

const TruckListLoadingIndicator = connect(mapStateToProps)(LoadingIndicator);
export { TruckListLoadingIndicator };
