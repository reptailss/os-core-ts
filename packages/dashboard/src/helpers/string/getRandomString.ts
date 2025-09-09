export const getRandomString = (string_length: number = 5): string => {
    let randomStringLength = 5;
    if (typeof string_length !== 'undefined') randomStringLength = string_length;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < randomStringLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
