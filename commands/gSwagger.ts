import {SwaggerTSBuilder} from '@swagger'


new SwaggerTSBuilder().buildFromControllers().then(() => {
    console.log('Success build swagger schemas')
})
