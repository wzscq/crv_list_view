import { useState } from "react";
import { Popconfirm,Button } from "antd";

export default function OperationButton({type,operation,doOperation}){
    const [promptVisible,setPromptVisible]=useState(false);

    const handleOk=()=>{
        doOperation(operation);
        setPromptVisible(false);
    }

    const handleCancel=()=>{
        setPromptVisible(false);
    }

    return (
        <Popconfirm
            title={operation.prompt}
            visible={promptVisible}
            onConfirm={handleOk}
            onCancel={handleCancel}
            okText={"确定"}
            cancelText={"取消"}
        >
            <Button 
                onClick={()=>operation.prompt?setPromptVisible(true):doOperation(operation)} 
                type={type}>
                {operation.name}
            </Button>
        </Popconfirm>
    )
}