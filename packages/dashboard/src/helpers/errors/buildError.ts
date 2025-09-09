

export function joinError(input: string | string[] | Record<string, unknown>): string {
    if (typeof input === "string") {
        return input;
    } else if (Array.isArray(input)) {
        const resultArray = input.map(joinError);
        return resultArray.filter(item => item !== "").join(", ");
    } else if (typeof input === "object" && input !== null) {
        let result = "";
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                const value = joinError(input[key] as string | string[] | Record<string, unknown>);
                if (value !== "") {
                    result += value + ", ";
                }
            }
        }
        return result.slice(0, -2);
    } else {
        return "";
    }
}


export function buildErrorsMessages(errors:any):string {
    if(typeof errors === 'string'){
        return  errors;
    }

    if(typeof errors?.message === 'string'){
        return  errors.message;
    }

    return joinError(errors)
}


