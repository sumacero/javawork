import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterStatusModal from './FilterStatusModal';
import FilterCategoryModal from './FilterCategoryModal';


function FilterMenuArea(props){
    const [openStatusFilter, setOpenStatusFilter] = useState(false);
    const [targetStatusText, setTargetStatusText] = useState("条件なし");
    const [beforeCheckedStatuses, setBeforeCheckedStatuses] = useState([]); 
    const [openCategoryFilter, setOpenCategoryFilter] = useState(false);
    const [targetCategoryText, setTargetCategoryText] = useState("条件なし");
    const [beforeCheckedSubcategories, setBeforeCheckedSubcategories] = useState([]); 

    const clickFilterButton = ()=>{
        props.filterQuestions();
    }
 
    return(
        <div>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th colSpan="2">検索条件</th>
                    </tr>
                    <tr>
                        <td className="col-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>ステータス</div>
                                <button className="btn btn-primary" onClick={()=>setOpenStatusFilter(true)}>選択</button>
                            </div>
                        </td>
                        <td>
                            {targetStatusText}
                        </td>
                    </tr>
                    <tr>
                        <td className="col-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <span>カテゴリ</span>
                                <button className="btn btn-primary" onClick={()=>setOpenCategoryFilter(true)}>選択</button>
                            </div>
                        </td>
                        <td>
                            {targetCategoryText}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={clickFilterButton} className="btn btn-primary btn-block">
                                検索
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {openStatusFilter &&
                <FilterStatusModal
                    setOpenStatusFilter={setOpenStatusFilter}
                    setTargetStatusText={setTargetStatusText}
                    statuses={props.statuses} 
                    checkedStatuses={props.checkedStatuses}
                    setCheckedStatuses={props.setCheckedStatuses}
                    beforeCheckedStatuses={beforeCheckedStatuses}
                    setBeforeCheckedStatuses={setBeforeCheckedStatuses}
                />
            }
            {openCategoryFilter &&
                <FilterCategoryModal
                    setOpenCategoryFilter={setOpenCategoryFilter}
                    setTargetCategoryText={setTargetCategoryText}
                    categories={props.categories} 
                    subcategories={props.subcategories} 
                    checkedSubcategories={props.checkedSubcategories}
                    setCheckedSubcategories={props.setCheckedSubcategories}
                    beforeCheckedSubcategories={beforeCheckedSubcategories}
                    setBeforeCheckedSubcategories={setBeforeCheckedSubcategories}
                />
            }
        </div>
    )
}

export default FilterMenuArea;