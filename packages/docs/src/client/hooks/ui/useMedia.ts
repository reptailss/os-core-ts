import {useMediaQuery} from "@mui/material";

export function useMedia() {
    const isMobile = useMediaQuery('(max-width:320)');
    const tablet = useMediaQuery('(max-width:650px)');
    const isDesktop = useMediaQuery('(min-width:1200px)');

    const isTablet = !(isDesktop || tablet);
    return {
        isMobile,
        isTablet,
        isDesktop
    }
}
