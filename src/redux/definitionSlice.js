import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
    loaded:false,
    modelID:"core_user",
    fields:[
        {field:"id",name:"ID",dataType:"varchar"},
        {field:"user_name_en",name:"英文名称",dataType:"varchar"},
        {field:"user_name_zh",name:"中文名称",dataType:"varchar"},
        {field:"password",name:"密码",dataType:"password"},
        {field:"create_time",name:"创建时间",dataType:"datetime"},
        {field:"create_user",name:"创建人",dataType:"varchar"},
        {field:"update_time",name:"更新时间",dataType:"datetime"},
        {field:"update_user",name:"更新人",dataType:"varchar"},
        {field:"remark",name:"备注",dataType:"varchar"},
        {field:"version",name:"数据版本",dataType:"int"}
    ],
    operations:[
        {
            id:"create",
            name:"创建",
            type:"OP_TYPE_OPEN",
            params:{
                    url:"http://localhost:3003/index.html/#/core_user/form1",
                    location:"LOCATION_TYPE_MODAL",
                    title:"创建用户",
                    key:"/model/core_user/form1/create"
            },
            input:{},
            description:"打开用户管理功能"
        },
        {id:"edit",name:"编辑"},
        {id:"delete",name:"删除"}
    ],
    views:[
        {
            viewID:"view1",
            name:"用户信息维护",
            description:"仅包含必要的用户信息",
            fields:[
                {field:"id",width:100},
                {field:"user_name_en",width:200},
                {field:"user_name_zh",width:200},
                {field:"password",width:200},
                {field:"remark",width:200},
            ],
            filter:{},
            toolbar:{
                listToolbar:{
                    showCount:3,
                    items:[
                        {operationID:"create"},
                        {operationID:"delete"},
                    ]},
                rowToolbar:{
                    showCount:2,
                    items:[
                        {operationID:"edit"},
                        {operationID:"delete"},
                    ]
                }
            },
        },
        {
            viewID:"view2",
            name:"用户信息维护高级",
            description:"包含全部用户信息",
            fields:[
                {field:"id",width:200},
                {field:"user_name_en",width:200},
                {field:"user_name_zh",width:200},
                {field:"password",width:200},
                {field:"create_time",width:200},
                {field:"create_user",width:200},
                {field:"update_time",width:200},
                {field:"update_user",width:200},
                {field:"remark",width:200},
                {field:"version",width:200}
            ]
        }
    ],
}

console.log("definition",JSON.stringify(initialState));

export const definitionSlice = createSlice({
    name: 'definition',
    initialState,
    reducers: {
        setDefinition: (state,action) => {
           console.log(action.payload);
           state.modelID=action.payload.modelID;
           state.fields=action.payload.fields;
           state.operations=action.payload.operations;
           state.views=action.payload.views;
           state.loaded=true;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setDefinition } = definitionSlice.actions

export default definitionSlice.reducer