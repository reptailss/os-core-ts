export type OnSaveDatePickerRangeCB = (data: {
    dateStart: string,
    dateEnd: string,
    showTime: boolean
}) => Promise<void>
