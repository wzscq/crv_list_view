import {useCallback, useState} from 'react';
import { Space,Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {setFieldFilter,resetFieldFilter} from '../../../../redux/dataSlice';
import { getControl } from './Controls';

export default function FilterInput({sendMessageToParent,field}){
    const dispatch=useDispatch();
    const filter = useSelector(state=>state.data.views[state.data.currentView].data.filter);
    const [filterValue,setFilterValue]=useState(filter[field.field]);

    const onFilterChange=(value)=>{
        setFilterValue(value);
        //dispatch(setFieldFilter({[field.field]:e.target.value}));
    }

    const resetFilter=()=>{
        dispatch(resetFieldFilter(field.field));
    }

    const onSearch=useCallback(()=>{
        dispatch(setFieldFilter({[field.field]:filterValue}));
    },[field,filterValue,dispatch]);

    return (
    <div>
        {getControl(field,sendMessageToParent,filterValue,onFilterChange)}
        <Space style={{}}>
            <Button
                type="primary"
                onClick={onSearch}
                size="small"
                style={{ width: 90 }}
                >
                查询
            </Button>
            <Button
                type="primary"
                onClick={resetFilter}
                size="small"
                style={{ width: 90 }}
                >
                重置
            </Button>
        </Space>
    </div>);
}