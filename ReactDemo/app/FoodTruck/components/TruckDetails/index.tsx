import '@bootstrap-css';

import React from 'react';

import { DetailsContentContainer } from '../../containers/TruckDetails/DetailsContentContainer';
import { DetailPanelContainer } from '../../containers/TruckDetails/DetailsPanelContainer';

const TruckDetails = () => (
    <DetailPanelContainer>
        <DetailsContentContainer />
    </DetailPanelContainer>
);

export { TruckDetails };
