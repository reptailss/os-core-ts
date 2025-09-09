
export const setCookie = (name:any = null, value = '', options:any = {}) => {
    options = {
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 60 * 30184000).toUTCString(),
        ...options,
    };

    if (typeof value === "object") {
        value = JSON.stringify(value);
    }

    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options?.hasOwnProperty(optionKey) ?  options[optionKey] : {};
        if (optionValue !==true) {
            updatedCookie += "=" + optionValue;
        }
    }
    if(document){
        document.cookie = updatedCookie;
    }
};

export const getCookie = (name:string) => {
    let matches = document.cookie.match(
        new RegExp(
            // eslint-disable-next-line no-useless-escape
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
        )
    );
    if (name === "language") {
        let navigator_name =
            window?.navigator?.language;
        return matches
            ? decodeURIComponent(matches[1])
            : navigator_name.split("-")[0];
    }
    let value = matches ? decodeURIComponent(matches[1]) : '';

    try {
        value = JSON.parse(value);
    } catch (e) {
    }

    return value;


};