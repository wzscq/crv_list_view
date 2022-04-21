import {Pagination} from 'antd';
import { useDispatch,useSelector } from 'react-redux';

import {setPagination} from '../../../redux/dataSlice';

import './TableFooter.css';

export default function TableFooter(){
    const dispatch=useDispatch()
    const {total,pagination} = useSelector(state=>state.data.views[state.data.currentView].data);

    const onPaginationChange=(page, pageSize)=>{
        dispatch(setPagination({...pagination,current:page,pageSize:pageSize}));
    }

    return (
        <div className="list-table-footer">
            <div className="list-table-pagination">
                <Pagination onChange={onPaginationChange} size="small" {...pagination} total={total} showSizeChanger />
            </div>
        </div>
    );
}