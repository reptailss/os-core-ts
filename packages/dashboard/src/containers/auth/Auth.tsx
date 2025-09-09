import React, {ReactNode} from 'react'
import Spinner from "@ui/spinner/Spinner";
import {useAuthInit} from "@containers/auth/hooks/useAuthInit";
import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import SignIng from "@containers/auth/signIn/SignIn";


interface Props {
    children: ReactNode
}

const Auth = ({children}: Props) => {


    const {isAuth} = useAuthContext()

    const {isLoading} = useAuthInit()

    if (isLoading) {
        return <Spinner/>
    }

    if (!isAuth) {
        return <SignIng/>
    }


    return (
        <>
            {children}
        </>
    );
};

export default Auth;
