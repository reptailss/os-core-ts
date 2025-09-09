import {SetStateFn} from "@baseTypes/state";
import {User} from "@containers/user/types";


export interface AuthContext {
    isAuth: boolean,
    setIsAuth: SetStateFn<boolean>,
    user:User,
    setUser:SetStateFn<User>
}
