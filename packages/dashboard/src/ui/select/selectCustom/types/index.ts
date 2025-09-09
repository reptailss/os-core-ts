export interface ISelectCustomItem<T>{
    label:string,
    value:string | number,
    fullData?:T
}

export interface ISelectCustomGroupItem<T=any>{
    label:string,
    value:string | number,
    groupValue:string,
    fullData?:T
}