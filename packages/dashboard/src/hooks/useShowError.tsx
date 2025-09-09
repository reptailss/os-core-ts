import {useSnackBar} from "@hooks/useSnackBar";
import {buildErrorsMessages} from "@helpers/errors/buildError";


export function useShowError(){

    const{setSnackBar} = useSnackBar()

    const onShowError = (e:any)=>{
        const message = buildErrorsMessages(e)
        setSnackBar({
            message:message,
            variant:'error'
        })
    }

    return {
        onShowError
    }
}