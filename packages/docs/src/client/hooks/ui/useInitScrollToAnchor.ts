import {useEffect} from "react";

export function useInitScrollToAnchor() {
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (!hash) {
            return
        }
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }, []);
}
