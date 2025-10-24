import React, {useMemo} from 'react';
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import {ERROR_CODES} from "@containers/requests/select/selectErrorCodes/constants";


interface Props {
	value: string[],
	onChange: (value: string[]) => void,
	width?: string | number
	errorCodes?: string[]
}

const SelectErrorCodes = ({
							  value,
							  onChange,
							  width,
							  errorCodes,
						  }: Props) => {
	
	const targetErrorCodes = useMemo(() => {
		if (typeof errorCodes === 'undefined') {
			return ERROR_CODES
		}
		return errorCodes.map((value) => {
			return {
				value,
				label: value
			}
		})
	}, [errorCodes])
	return (
		<SelectMultiSearch
			value={value}
			onChange={onChange}
			data={targetErrorCodes}
			label={'Коди помилок'}
			width={width}
		/>
	);
};

export default SelectErrorCodes;