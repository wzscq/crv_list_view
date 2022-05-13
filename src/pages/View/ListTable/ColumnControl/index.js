import { FIELD_TYPE } from "../../../../utils/constant";

export default function ColumnControl({text,field, record, index}){
    let value=text;
    if(text&&field.fieldType===FIELD_TYPE.MANY2ONE){
        if(field.optionLabel&&text.list&&text.list.length>0){
            value=text.list[0][field.optionLabel];
        } else {
            value=text.value?text.value:text;
        }
    }

    if(field.options){
        const option=field.options.find(item=>item.value==value);
        if(option){
            value=option.label;
        }
    }
    
    return (
        <span>{value}</span>
    );
}