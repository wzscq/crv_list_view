import { Space } from "antd"
import { useCallback } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {FRAME_MESSAGE_TYPE} from '../../../utils/constant';
import OperationButton from '../../../components/OperationButton';

import './index.css';

export default function RowOperationBar({sendMessageToParent,record,showCount,buttons}){
    const {modelID}=useParams();
    const {operations} = useSelector(state=>state.definition);

    const doOperation=useCallback((opItem)=>{
        const operation=operations.find(element=>element.id===opItem.operationID);
        if(operation){
            const message={
                type:FRAME_MESSAGE_TYPE.DO_OPERATION,
                data:{
                    operationItem:{
                        ...operation,
                        input:{
                            modelID:modelID,
                            selectedRowKeys:[record['id']]
                        }
                    }
                }
            };
            sendMessageToParent(message);
        }
    },[modelID,operations,sendMessageToParent,record]);
    
    return (
        <Space className="row-operation-bar" size={5}>
        {
            buttons.map(item=>
                <OperationButton type='link' doOperation={doOperation} operation={item}/>
            )
        }
        </Space>
    )
}