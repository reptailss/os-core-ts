import React from 'react';
import JsonEditorCustom from "@ui/jsonEditor/JsonEditorCustom";
import {buildWhereSchema} from "@helpers/whereSchema/buildWhereSchema";
import {useMedia} from "@hooks/useMedia";


const schema = buildWhereSchema({
	type: "object",
	properties: {
		type: { type: "string" },
		description: { type: "string" },
		app_datetime: { type: "string", format: "date-time" },
		app_name: { type: "string" },
		app_version: { type: "number" },
		user_id: { type: "number" },
		user_email: { type: "string", format: "email" },
		location_lat: { type: "number" },
		location_long: { type: "number" },
		card_id: { type: "number" },
		limit: { type: "number" },
		card_limit: { type: "number" },
		limit_left: { type: "number" },
		balance: { type: "number" },
		card_number: { type: "string" },
		privileges: { type: "string" },
		regions: { type: "string" },
		status: { type: "string" },
		type_card: { type: "string" },
		timestamp: { type: "number" },
		result_type: { type: "string" },
		result_reason: { type: "string" },
		limits_left: { type: "string" },
		timestamp_action: { type: "string" },
		server_datetime: { type: "string", format: "date-time" }
	},
	required: ["_id"],
	additionalProperties: false
})


const WhereEditorMobileAppLogs = ({
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
			height={!isDesktop ? '200px' : undefined}
		/>
	);
};

export default WhereEditorMobileAppLogs;