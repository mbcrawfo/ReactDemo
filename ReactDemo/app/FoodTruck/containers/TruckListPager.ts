import { Pager } from '@app/components/Pager';
import { setTruckPage } from '@app/FoodTruck/actions';
import { FoodTruckAction } from '@app/FoodTruck/reducers';
import { IFoodTruckState } from '@app/FoodTruck/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: IFoodTruckState) => ({
    currentPage: state.truckList.request.page,
    pageSize: state.truckList.request.pageSize,
    // total *visible* items
    totalItems: state.data.trucks.filteredItems,
});

const mapDispatchToProps = (dispatch: Dispatch<FoodTruckAction>) => ({
    setPage: (page: number) => dispatch(setTruckPage(page)),
});

const TruckListPager = connect(mapStateToProps, mapDispatchToProps)(Pager);
export { TruckListPager };
