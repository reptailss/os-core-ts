import {DiContainer, DiLifetime} from '@di'

export function Injectable(options: {lifetime?: DiLifetime} = {}): ClassDecorator {
    return (target: any) => {
        DiContainer.register(target, {lifetime: options.lifetime || 'singleton'})
    }
}