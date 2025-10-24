export function getRequestsInitialDate(): { initialDateStart: Date, initialDateEnd: Date } {
    const now = new Date();
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 1);
    const initialDateEnd = initialDate
    now.setDate(now.getDate() );

    return {initialDateStart:new Date(), initialDateEnd};
}
