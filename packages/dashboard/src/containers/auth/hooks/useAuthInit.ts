import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import {checkToken} from "@containers/auth/helpers/helpers";
import {useEffect, useState} from "react";
import {getUserInfo} from "@containers/user/api";


export function useAuthInit(): {
    isLoading: boolean,
} {

    const [isLoading, setIsLoading] = useState(true)

    const {
        setIsAuth,
        setUser
    } = useAuthContext()

    useEffect(() => {
        const authFn = async () => {

            setIsLoading(true)
            try {
                const tokens = await checkToken()
                if (!tokens) {
                    setIsLoading(false)
                    setIsAuth(false)
                    return
                }

                const user = await getUserInfo(tokens.access_token)

                if (!user?.id) {
                    setIsLoading(false)
                    setIsAuth(false)
                    return
                }

                setUser(user)
                setIsAuth(true)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
                setIsAuth(false)
            }
        }
        authFn();

    }, [])

    return {
        isLoading,
    }
}
