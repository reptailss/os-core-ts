import {Dispatch, SetStateAction} from "react";

export type SetStateFn<State> = Dispatch<SetStateAction<State>>