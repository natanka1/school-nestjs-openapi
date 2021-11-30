export type ObjectRenameFieldsMap = Array<{from:string, to:string}>

export function renameProperty({oldName, newName}:{oldName: string, newName:string}):any {

    // Do nothing if the names are the same
    if (oldName === newName) {
        return this;
    }
   // Check for the old property name to avoid a ReferenceError in strict mode.
    
   if (Object.hasOwnProperty.bind(this)(oldName)) {
       this[newName] = this[oldName];
       delete this[oldName];
   }

   return this;
};
                
export function renameProperties<FROM_TYPE, TO_TYPE>({from, map, isReversedMap=false} : {from: FROM_TYPE, map: ObjectRenameFieldsMap, isReversedMap?:boolean}): TO_TYPE{
    for (const item of map) {
        const [oldName, newName] = isReversedMap ? [item.to, item.from]: [item.from, item.to]
        renameProperty.apply(from, [{oldName, newName}]) 
    }
    const obj: unknown = from;
    return  obj as TO_TYPE;
}


export function cast<FROM_TYPE, TO_TYPE>(obj: FROM_TYPE): TO_TYPE {
    const obj1: unknown = obj;
    return obj1 as TO_TYPE;
  }

  export function updateProperties<T>(newData:T, oldData:T){
    for(const property in newData){
      oldData[property] = newData[property]
    }
    return oldData
  }