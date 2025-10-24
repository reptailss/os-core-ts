export function parseLinkArgumentsCode(input: string): {
    before: string,
    label: string,
    module: string,
    section: string,
    after: string
    id: string
} {
 
    const match = input.match(/#linkModule\((.*?)\)/);
    if (!match) {
        return {
            before: '',
            label: '',
            module: '',
            section: '',
            after: '',
            id: '',
        }
    }
    const params = match[1].replace('#', '').split(',').map(param => param.trim());
    const beforeMatch = input.split('#linkModule')[0] || '';

    const afterMatch = input.split('#)')[1] || '';
    if (params.length === 3) {
        return {
            before: beforeMatch,
            after: afterMatch,
            module: params[2],
            label: params[1],
            id: params[0],
            section: ''
        };
    }
    if (params.length === 4) {
        return {
            before: beforeMatch,
            after: afterMatch,
            label: params[1],
            module: params[2],
            section: params[3],
            id: params[0]
        };
    }
    return {
        before: beforeMatch,
        after: afterMatch,
        label: params[1],
        section: '',
        module: '',
        id: params[0]
    };
}
