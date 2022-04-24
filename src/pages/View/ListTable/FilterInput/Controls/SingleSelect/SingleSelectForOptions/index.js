import {Select} from 'antd';

const { Option } = Select;

export default function SingleSelectForOptions({field,filterValue,onFilterChange}){
    const onChange=(value)=>{
        onFilterChange(value);
    }

    const options=field.options.map((item,index)=>
    (<Option key={index} value={item.value}>{item.label}</Option>));
    
    return (<Select  
        style={{minWidth:200,marginBottom:8,display:'block'}}
        value={filterValue} 
        allowClear
        onChange={onChange}
        >
        {options}
    </Select>);
}