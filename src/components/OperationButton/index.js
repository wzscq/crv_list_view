import { useState } from "react";
import { Popconfirm,Button } from "antd";

import I18nLabel from "../I18nLabel";

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
                <I18nLabel label={operation.name}/>
            </Button>
        </Popconfirm>
    )
}