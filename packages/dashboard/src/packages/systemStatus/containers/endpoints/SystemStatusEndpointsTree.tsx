import React from 'react';
import {SetStateFn} from "@baseTypes/state";
import {
	useGetEndpointsNodesBySystemEndpoints
} from "@packages/systemStatus/containers/endpoints/hooks/useGetEndpointsNodesBySystemEndpoints";
import EndpointsTreeView from "@containers/requests/endpointsTree/EndpointsTreeView";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";


interface Props {
	targetEndpoints: string[],
	setTargetEndpoints: SetStateFn<string[]>,
	onChangeEndpoints?: () => void
	systemEndpoints: SystemEndpoint[],
}

const SystemStatusEndpointsTree = ({
									   targetEndpoints,
									   setTargetEndpoints,
									   onChangeEndpoints,
									   systemEndpoints,
								   }: Props) => {
	
	
	const endpointsTree = useGetEndpointsNodesBySystemEndpoints({systemEndpoints})
	return (
		<EndpointsTreeView
			endpointsTree={endpointsTree}
			targetEndpoints={targetEndpoints}
			setTargetEndpoints={setTargetEndpoints}
			onChangeEndpoints={onChangeEndpoints}
		/>
	);
};

export default SystemStatusEndpointsTree;