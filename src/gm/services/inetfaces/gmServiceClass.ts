import {GmModuleConstructorProp, IGmService} from '@gm/core'

export interface IGmServiceClass extends IGmService {
    serviceType: 'class'

    getConstructorProp():GmModuleConstructorProp

}

