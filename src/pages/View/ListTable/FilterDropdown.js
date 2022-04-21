import {useCallback, useState} from 'react';
import {Input,Space,Button,Divider} from 'antd';
import {SortAscendingOutlined,SortDescendingOutlined,CheckOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {setSorter,setFieldFilter,resetFieldFilter,setFixedColumn} from '../../../redux/dataSlice';

import './FilterDropdown.css';

export default function FilterDropdown({ field,index,confirm }){
    const dispatch=useDispatch();
    const {sorter,filter,fixedColumn} = useSelector(state=>state.data.views[state.data.currentView].data);
    const ascActive=(sorter.length>0?sorter[0].field===field.field&&sorter[0].order==='asc':false);
    const descActive=(sorter.length>0?sorter[0].field===field.field&&sorter[0].order==='desc':false);
    const isFixed=(fixedColumn===index+1);
    const [filterValue,setFilterValue]=useState(filter[field.field]);

    const onFilterChange=(e)=>{
        setFilterValue(e.target.value);
        //dispatch(setFieldFilter({[field.field]:e.target.value}));
    }

    const resetFilter=()=>{
        dispatch(resetFieldFilter(field.field));
    }

    const onSearch=useCallback(()=>{
        dispatch(setFieldFilter({[field.field]:filterValue}));
    },[field,filterValue,dispatch]);

    return (
        <div className='filter-dropdown'>
            <Space direction="vertical">
                <Button
                    type='link'
                    size='small'
                    style={{color:ascActive?'#40a9ff':'grey'}}
                    icon={<SortAscendingOutlined/>}
                    onClick={() => {
                        dispatch(setSorter([{field:field.field,order:'asc'}]));
                    }}
                >
                    升序
                </Button>
                <Button
                    type='link'
                    size='small'
                    style={{color:descActive?'#40a9ff':'grey'}}
                    icon={<SortDescendingOutlined />}
                    onClick={() => {
                        dispatch(setSorter([{field:field.field,order:'desc'}]));
                    }}
                >
                    降序
                </Button>
            </Space>
            <Divider/>
            <Space direction="vertical">
                <Button
                    type='link'
                    size='small'
                    style={{color:isFixed?'#40a9ff':'grey'}}
                    icon={isFixed?<CheckOutlined />:null}
                    onClick={() => {
                        dispatch(setFixedColumn(index+1));
                    }}
                >
                    冻结列
                </Button>
            </Space>
            <Divider/>
            <Input
                placeholder={`Search ${field.field}`}
                value={filterValue}
                onChange={onFilterChange}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
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
        </div>
    );
}
    