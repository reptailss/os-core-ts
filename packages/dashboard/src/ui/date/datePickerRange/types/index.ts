export type OnSaveDatePickerRangeCB = (data: {
    dateStart: Date
    dateEnd: Date
    showTime: boolean
}) => Promise<void>
