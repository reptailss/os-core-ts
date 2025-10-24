import React, {ReactNode, useMemo, useState} from 'react';
import CardContent from "@mui/material/CardContent";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import EndpointTreeItem from './EndpointTreeItem';
import {transformEndpointsTree} from "./helpers/transformEndpointsTree";
import {sx} from './sx'
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
	endpointsTree: EndpointNode[],
	targetEndpoints: string[],
	setTargetEndpoints: SetStateFn<string[]>,
	children?: ReactNode,
	onChangeEndpoints?: () => void
}

const EndpointsTreeView = ({
							   endpointsTree,
							   targetEndpoints,
							   setTargetEndpoints,
							   children,
							   onChangeEndpoints,
						   }: Props) => {
	
	
	const [searchValue, setSearchValue] = useState<string>('');
	
	const items = useMemo(() => {
		if (searchValue.length >= 1) {
			const search = searchValue.trim().toLowerCase();
			const filtered = endpointsTree.filter((item) => {
				return item.fullPath.toLowerCase().includes(search)
			})
			return transformEndpointsTree(filtered)
		}
		return transformEndpointsTree(endpointsTree)
	}, [endpointsTree, searchValue])
	
	
	return (
		<CardContent>
			<TextField
				size={'small'}
				fullWidth
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
				label={'Пошук по сервісах'}
				sx={{
					marginBottom: '15px'
				}}
			/>
			
			<Button
				onClick={() => {
					setTargetEndpoints([])
				}}
				size={'small'}
				fullWidth
			>
				Очистити всі
			</Button>
			<RichTreeView
				items={items}
				aria-label="pages"
				multiSelect
				sx={sx.root}
				slots={{
					item: (props) => <EndpointTreeItem
						targetIds={targetEndpoints}
						setTargetIds={setTargetEndpoints}
						onChangeEndpoints={onChangeEndpoints}
						{...props}
					/>
				}}
			/>
			{children && children}
		</CardContent>
	
	);
};

export default EndpointsTreeView;
