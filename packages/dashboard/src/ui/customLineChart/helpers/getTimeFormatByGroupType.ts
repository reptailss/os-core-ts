import {GroupType} from "@containers/groups/types";

export const getLineChartTimeFormatByGroupType = ( groupType: GroupType)=>{
    switch (groupType){
        case "minutes": return 'MM-DD HH:mm'
        case "hours": return 'MM-DD HH:mm'
        case "day": return 'MM-DD-YYYY'
        case "month": return 'MM-YYYY'
    }
}