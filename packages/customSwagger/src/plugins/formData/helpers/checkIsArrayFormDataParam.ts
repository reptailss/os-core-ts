import {getCurrentMethod} from './getCurrentMethod'

const getCurrentBody = ({
                            key,
                            method,
                        }: {
    key: string,
    method: any,
}) => {
   try{
       if('requestBody' in method){
           return method?.requestBody?.content['multipart/form-data']?.schema?.properties[key]
       }
       return  method?.parameters?.find((param: any) => param.name === key)
   }catch (error){
       return null
   }

}
export const checkIsArrayFormDataParam = ({
                                              request,
                                              spec,
                                              key,
                                          }: {
    request: Request,
    spec: any,
    key: string,
}): boolean => {
    const method = getCurrentMethod({
        spec,
        request,
    })
    if (!method) {
        return false
    }

    const currentParam = getCurrentBody({
        method,
        key
    })
    return currentParam?.type === 'array'
}
