
import { OrderedMap } from 'immutable';


type Keys = 'tags' | 'summary' | 'responses' | 'requestBody' | 'security'

export type OperationSwagger = OrderedMap<Keys,any>

