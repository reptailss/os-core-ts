import {GroupColumn} from "@containers/groups/types";

export interface LineChartColumn<Row extends { date: Date }> extends GroupColumn<Row>{
    color:string
}