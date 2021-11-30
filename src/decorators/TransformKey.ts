import { Transform } from 'class-transformer';

export function TransformKey(newKey: string){
    return Transform( (field) => {
        const {obj, key, value} = field
        obj[newKey] = value;
        delete(obj[key])
        return field
    })
}