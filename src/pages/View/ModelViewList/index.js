import {useMemo} from 'react';
import { Select } from 'antd';
import { useSelector,useDispatch } from 'react-redux';

import {setCurrentView} from '../../../redux/dataSlice';

const { Option } = Select;

export default function ModelViewList(){
    const dispatch=useDispatch();
    const {views} = useSelector(state=>state.definition);
    const {currentView} = useSelector(state=>state.data);

    const onViewChange=(value)=>{
        dispatch(setCurrentView(value));
    }

    const options=useMemo(()=>{
        return views.map(item=>{
            return (<Option value={item.viewID}>{item.name}</Option>)
        });
    },[views]);

    const filterOption=(input, option) =>{
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    const filterSort=(optionA, optionB) => {
        return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }

    return (
        <Select filterOption={filterOption} filterSort={filterSort}  value={currentView} showSearch style={{ width: "100%"}} onChange={onViewChange}>
            {options}
        </Select>
    )
}