export function getSystemOsLogsInitialDate(): { initialDateStart: Date, initialDateEnd: Date } {
    const now = new Date();
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 1);
    const initialDateEnd = initialDate;
    now.setDate(now.getDate() - 1);

    return {initialDateStart:new Date(), initialDateEnd};
}
