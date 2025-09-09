import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import {User} from "@containers/user/types";
import {clearAuthCookie} from "@containers/auth/helpers/helpers";

export function useLogOut(): {
    logOut: () => void
} {
    const {setUser, setIsAuth} = useAuthContext()

    const logOut = () => {
        clearAuthCookie()
        setUser({} as User)
        setIsAuth(false)
    }

    return {
        logOut
    }
}
