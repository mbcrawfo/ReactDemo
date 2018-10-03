import { connect } from 'react-redux';

import { mapDispatchToTruckListProps, mapStateToTruckListProps, TruckList } from '../TruckList';
import { IFoodTruckAppState } from '../types';

const mapStateToProps = (state: IFoodTruckAppState) => mapStateToTruckListProps(state.truckList);

const TruckListPanel = connect(mapStateToProps, mapDispatchToTruckListProps)(TruckList);
export { TruckListPanel };
