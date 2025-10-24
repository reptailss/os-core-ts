import React from 'react';
import JsonEditorCustom from "@ui/jsonEditor/JsonEditorCustom";
import {buildWhereSchema} from "@helpers/whereSchema/buildWhereSchema";
import {useMedia} from "@hooks/useMedia";


const schema = buildWhereSchema({
	type: "object",
	properties: {
		date: { type: "string", format: "date-time" },
		route_path: { type: ["string","null"] },
		url: { type: "string" },
		service_key: { type: "string" },
		response_status_code: { type: "number" },
		response_time: { type: "number" },
		method: { type: "string" },
		error: { type: "number" },
		error_code: { type: ["string","null"] },
		open_user_id: { type: "number" },
		is_system: { type: "number" },
	},
	required: ["_id"],
	additionalProperties: false
})


const WhereEditorSystemStatusRequests = ({
									  value,
									  onChange
								  }: {
	value: string | undefined;
	onChange: (value: string | undefined) => void
}) => {
	
	const{isDesktop} = useMedia()
	
	return (
		<JsonEditorCustom
			value={value || ''}
			onChange={onChange}
			schema={schema}
			height={!isDesktop ? '200px' : '200px'}
		/>
	);
};

export default WhereEditorSystemStatusRequests;