import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterStatusModal from './FilterStatusModal';
import FilterCategoryModal from './FilterCategoryModal';


function FilterMenuArea(props){
    const [openStatusFilter, setOpenStatusFilter] = useState(false);
    const [targetStatusText, setTargetStatusText] = useState("条件なし");
    const [beforeCheckedStatusIds, setBeforeCheckedStatusIds] = useState([]); 
    const [openCategoryFilter, setOpenCategoryFilter] = useState(false);
    const [targetCategoryText, setTargetCategoryText] = useState("条件なし");
    const [beforeCheckedSubcategoryIds, setBeforeCheckedSubcategoryIds] = useState([]); 

    const clickFilterButton = ()=>{
        props.filterQuestions(1);
    }
    const changeKeyword =(event)=>{
        props.setKeyword(event.target.value);
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
                        <td className="col-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <span>キーワード</span>
                            </div>
                        </td>
                        <td>
                            <input type="text" value={props.keyword} onChange={changeKeyword} maxLength="50" style={{width:"100%", display:"block"}}></input>
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
                    checkedStatusIds={props.checkedStatusIds}
                    setCheckedStatusIds={props.setCheckedStatusIds}
                    beforeCheckedStatusIds={beforeCheckedStatusIds}
                    setBeforeCheckedStatusIds={setBeforeCheckedStatusIds}
                />
            }
            {openCategoryFilter &&
                <FilterCategoryModal
                    setOpenCategoryFilter={setOpenCategoryFilter}
                    setTargetCategoryText={setTargetCategoryText}
                    categories={props.categories} 
                    subcategories={props.subcategories} 
                    checkedSubcategoryIds={props.checkedSubcategoryIds}
                    setCheckedSubcategoryIds={props.setCheckedSubcategoryIds}
                    beforeCheckedSubcategoryIds={beforeCheckedSubcategoryIds}
                    setBeforeCheckedSubcategoryIds={setBeforeCheckedSubcategoryIds}
                />
            }
        </div>
    )
}

export default FilterMenuArea;