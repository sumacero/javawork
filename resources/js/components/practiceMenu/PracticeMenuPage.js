import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from './CategoryCheckbox';

function PracticeMenuPage(){
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/get-categories');
            const data = result.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data.subcategories)));
        };
        fetchData();
    },[]);
    return (
        <div className="container">
            <form method="GET" action="random-question">
                <CategoryCheckbox categories={categories} subcategories={subcategories}/>
                <input type="hidden" name="test[0]" value="123"></input>
                <input type="hidden" name="test[1]" value="456"></input>
                <input type="submit" value="出題開始">
                </input>
            </form>
        </div>
    );
}

if (document.getElementById('practice-menu-page')) {
    ReactDOM.render(<PracticeMenuPage />,document.getElementById('practice-menu-page'));
}
