import { Table } from "antd";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResizeDetector } from 'react-resize-detector';

import {setSelectedRowKeys} from '../../../redux/dataSlice';
import FilterDropdown from './FilterDropdown';
import FilterIcon from './FilterIcon';
import TableFooter from './TableFooter';

import {createQueryDataMessage} from '../../../utils/normalOperations';
import RowOperationBar from '../RowOperationBar';

import './index.css';

export default function ListTable({sendMessageToParent}){
    const dispatch=useDispatch();
    const { height,ref } = useResizeDetector();
    const {origin,item}=useSelector(state=>state.frame);
    const {currentView} = useSelector(state=>state.data);
    const {fields,views,modelID}=useSelector(state=>state.definition);
    const {selectedRowKeys,list,fixedColumn,filter,pagination,sorter}=useSelector(state=>state.data.views[state.data.currentView].data);

    //根据视图列配置生成列
    const getColumn=(field,index,isFixed)=>{
        return {
            dataIndex:field.field,
            title:field.name,
            filterDropdown:<FilterDropdown field={field} index={index}/>,
            filterIcon: <FilterIcon field={field}/>,
            width:field.width,
            fixed:(isFixed?'left':''),
            ellipsis: true,
        }
    }

    const getOperationColumn=(rowToolbar)=>{
        const {showCount,buttons,width}=rowToolbar;
        return { 
            title: '操作', 
            dataIndex: '__action',
            width: width,
            fixed:'left',
            render: (text, record, index) => <RowOperationBar 
                                                sendMessageToParent={sendMessageToParent}
                                                showCount={showCount} 
                                                buttons={buttons} 
                                                record={record}/>
        }
    }

    const viewConf=useMemo(()=>{
        return views.find(item=>item.viewID===currentView);
    },[currentView,views]);
    
    const columns=useMemo(()=>{
        let columns=[];
        if(viewConf){
            const rowToolbar=viewConf.toolbar?.rowToolbar;
            if(rowToolbar){
                console.log('rowToolbar',rowToolbar);
                columns.push(getOperationColumn(rowToolbar));
            }
            if(viewConf.fields){
                viewConf.fields.forEach((fieldItem,index) => {
                    const fieldConf=fields.find(item=>item.field===fieldItem.field);
                    if(fieldConf){
                        columns.push(getColumn({...fieldConf,...fieldItem},index,fixedColumn>index)); 
                    }
                });
            }
        }
        return columns
    },[fields,viewConf,fixedColumn]);


    const searchFields=useMemo(()=>{
        let searchFields=[];
        const viewConf=views.find(item=>item.viewID===currentView);
        if(viewConf&&viewConf.fields){
            viewConf.fields.forEach((fieldItem,index) => {
                const fieldConf=fields.find(item=>item.field===fieldItem.field);
                if(fieldConf){
                    searchFields.push({field:fieldItem.field,dataType:fieldConf.dataType});
                }
            });
        }
        return searchFields
    },[fields,currentView,views]);

    useEffect(()=>{
        if(item&&origin&&searchFields.length>0){
            const frameParams={frameType:item.frameType,frameID:item.key,origin:origin};
            const queryParams={modelID,viewID:currentView,filter,pagination,sorter,fields:searchFields};
            sendMessageToParent(createQueryDataMessage(frameParams,queryParams));
        }
    },[searchFields,filter,pagination,sorter,sendMessageToParent,origin,item,currentView,modelID]);

    //处理行的选中
    const onSelectChange=selectedRowKeys => {
        dispatch(setSelectedRowKeys(selectedRowKeys));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    //处理行选中结束

    return (
        <div className="list-table">
            <Table 
                columns={columns} 
                dataSource={list} 
                size="small" 
                bordered 
                rowSelection={rowSelection}
                rowKey='id'
                footer={()=>(<TableFooter/>)}
                pagination={false}
                scroll={{ y: height-80 }}
            />
            <div ref={ref} style={{height:"100%",width:"100%"}}>{}</div>
        </div>
    )
}