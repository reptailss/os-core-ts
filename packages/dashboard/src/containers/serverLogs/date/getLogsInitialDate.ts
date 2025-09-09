export function getLogsInitialDate(): { initialDateStart: string, initialDateEnd: string } {
    const now = new Date();
    const initialDateEnd = now.toLocaleDateString('en-GB');
    now.setDate(now.getDate() - 7);
    const initialDateStart = now.toLocaleDateString('en-GB');

    return {initialDateStart, initialDateEnd};
}
