import { useDispatch, useSelector } from "react-redux";
import { Tag,Space } from 'antd';
import {SortAscendingOutlined,SortDescendingOutlined  } from '@ant-design/icons';
import { setSorter,resetFieldFilter,setFixedColumn } from "../../../redux/dataSlice";

import './index.css';
import { useCallback, useMemo } from "react";

export default function StatusBar(){
    const dispatch=useDispatch();
    const {fields}=useSelector(state=>state.definition);
    const {total,selectedRowKeys,sorter,filter,fixedColumn}=useSelector(state=>state.data.views[state.data.currentView].data);
    
    const resetFixedColumn=useCallback(()=>{
        dispatch(setFixedColumn(0));
    },[dispatch]);

    const fixedTab=useMemo(()=>{
        if(fixedColumn>0){
            return (<Tag closable onClose={resetFixedColumn}><span style={{padding:5}}>{'冻结列:'+fixedColumn}</span></Tag>);
        }
        return null;
    },[fixedColumn,resetFixedColumn]);
    
    const resetSorter=useCallback(()=>{
        dispatch(setSorter([]));
    },[dispatch]);

    const sorterTag=useMemo(()=>{
        if(sorter.length>0){
            const fieldConf=fields.find(item=>item.field===sorter[0].field);
            if(fieldConf){
                return (<Tag closable onClose={resetSorter}>{sorter[0].order==='asc'?<SortAscendingOutlined/>:<SortDescendingOutlined/>}<span style={{padding:5}}>{fieldConf.name}</span></Tag>);
            }
        }
        return null;
    },[sorter,fields,resetSorter]);

    const deleteFilter=useCallback((field)=>{
        dispatch(resetFieldFilter(field));
    },[dispatch]);

    const filterTags=useMemo(()=>{
        const filterTags=[];
        fields.forEach(field => {
            if(filter[field.field]){
                filterTags.push(
                    <Tag closable onClose={()=>deleteFilter(field.field)}><span style={{padding:5}}>{field.name}{":"}{filter[field.field]}</span></Tag>
                );
            }
        });
        return filterTags;
    },[filter,fields,deleteFilter])

    return (
        <div className="status-bar">
            <Space>
                <Tag>共{total}条，选中{selectedRowKeys.length}条</Tag>
                {fixedTab}
                {sorterTag}
                {filterTags}
            </Space>
        </div>
    )
}