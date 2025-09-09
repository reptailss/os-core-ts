import React, {FC, ReactNode, useState} from 'react'

import {AuthContext} from "@containers/auth/types/authContext";
import {User} from "@containers/user/types";


export const AuthContextValue = React.createContext<AuthContext>({
    setIsAuth: () => {
    },
    isAuth: false,
    user: {} as User,
    setUser: () => {
    }
})

interface IProps {
    children: ReactNode,
}

export const AuthContextProvider: FC<IProps> = ({
                                                    children,
                                                }) => {


    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<User>({} as User)

    return (
        <AuthContextValue.Provider
            value={{
                isAuth,
                setIsAuth,
                setUser,
                user,
            }}
        >
            {children}
        </AuthContextValue.Provider>
    );
};

export default AuthContextProvider;
