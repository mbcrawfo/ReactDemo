import { LoadingSpinner } from '@app/components/LoadingSpinner';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: IFoodTruckState) => ({
    show: state.truckList.isLoading,
});

const TruckListLoadingIndicator = connect(mapStateToProps)(LoadingSpinner);
export { TruckListLoadingIndicator };
