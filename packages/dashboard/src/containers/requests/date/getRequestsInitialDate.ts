export function getRequestsInitialDate(): { initialDateStart: string, initialDateEnd: string } {
    const now = new Date();
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 1);
    const initialDateEnd = initialDate.toLocaleDateString('en-GB');
    now.setDate(now.getDate() - 1);
    const initialDateStart = now.toLocaleDateString('en-GB');

    return {initialDateStart, initialDateEnd};
}
