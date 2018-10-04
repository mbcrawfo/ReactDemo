// const fetchTruckMenuIfNeededEpic: Epic<RootAction, RootAction, IFoodTruckAppState, IEpicServices> =
//     (action$, state, { api }) =>
//         action$.pipe(
//             filter(isActionOf(TruckListActions.selectTruck)),
//             filter(action => action.payload !== null),
//             map(action => action.payload!),
//             switchMap(foodTruckId =>
//                 iif(() => state.value.data.menuItems.has(foodTruckId),
//                     of(TruckDetailsActions.setMenuData(state.value.data.menuItems.get(foodTruckId)!)),
//                     from(api.fetchMenu(foodTruckId)).pipe(
//                         flatMap(menuItems => [
//                             TruckDetailsActions.fetchMenu.success({ foodTruckId, menuItems }),
//                             TruckDetailsActions.setMenuData(menuItems),
//                         ]),
//                         catchError(error => of(TruckDetailsActions.fetchMenu.failure(error)))
//                     )
//                 )
//             )
//         );
