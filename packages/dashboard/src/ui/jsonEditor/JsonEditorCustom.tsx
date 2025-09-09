import Editor, {OnMount} from '@monaco-editor/react';

const jsonSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			description: 'Ім’я користувача'
		},
		age: {
			type: 'number',
			description: 'Вік користувача'
		},
		isActive: {
			type: 'boolean',
			description: 'Активність користувача'
		}
	},
	required: ['name']
}

export default function JsonEditorCustom({
											 value,
											 onChange,
											 height,
											 schema,
										 }: {
	value: string
	onChange: (value: string | undefined) => void
	height?: string
	schema?: object;
}) {
	
	const handleEditorMount: OnMount = (editor, monaco) => {
		if (!schema) {
			return
		}
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true,
			allowComments: true,
			schemas: [
				{
					uri: 'custom-schema',
					fileMatch: ['*'],
					schema,
				},
			],
		});
	};
	
	return (
		<Editor
			height={height}
			defaultLanguage="json"
			value={value}
			onChange={onChange}
			theme="vs-dark"
			onMount={handleEditorMount}
			options={{
				minimap: {enabled: false},
				formatOnType: true,
				formatOnPaste: true,
				scrollBeyondLastLine: false
			}}
		/>
	);
}
