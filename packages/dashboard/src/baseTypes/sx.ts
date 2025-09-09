import {SxProps,} from "@mui/system";


type NestedSxProps = {
    [key: string]: SxProps | undefined | any;
};


export type SxStyle<T = NestedSxProps> = SxProps & T;
