import {useState} from "react";
import {ParamsGetToken} from "@containers/auth/types/auth";
import {authenticate} from "@containers/auth/api/api";
import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import {saveTokens} from "@containers/auth/helpers/helpers";
import {buildErrorsMessages} from "@helpers/errors/buildError";
import {getUserInfo} from "@containers/user/api";


export function useAuth(): {
    isLoading: boolean,
    isError: boolean,
    signIn: (body: ParamsGetToken) => Promise<void>,
    errorMessages: string | null,
} {


    const {setIsAuth, setUser,} = useAuthContext()


    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessages, setErrorMessages] = useState<string | null>(null)

    const signIn = async (body: ParamsGetToken) => {
        try {
            setIsLoading(true)
            const res = await authenticate(body)
            if (!res?.access_token) {
                setIsLoading(false)
                setIsAuth(false)
                return
            }
            const user = await getUserInfo(res.access_token)
            if (!user?.id) {
                setIsLoading(false)
                setIsAuth(false)
                return
            }
            setUser(user)
            saveTokens(res)
            setErrorMessages(null)
            setIsError(false)
            setIsAuth(true)

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            setErrorMessages(buildErrorsMessages(error))
        }
    }

    return {
        signIn,
        isLoading,
        isError,
        errorMessages,
    }
}
