import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class QA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question_id: location.pathname.split('/').slice(-1)[0],
            question: "",
            choices: [],
            answer: "",
        };
    }
    componentDidMount() {
        /*
        const func = async ()=>{
            try{
                let res = await axios.get('/getQAndA/' + this.state.question_id);
                let dbData = res.data.dbData;
                let test = '[1,["test1","test2"],[3,4,5],6,7]';
                console.log(dbData);
                //this.setState({choices: JSON.parse(dbData)});
                console.log(this.state.choices);
                //this.setDate({qAndA: dbData.qAndA});
                //console.log(this.state.choices);
                //console.log(this.state.qAndA);
            }
            catch (error){
                console.log(error.response.data);
                alert("サーバーエラーが発生しました。");
            }
        }
        func();
        */
        fetch('http://192.168.56.100' + '/getQA/' + this.state.question_id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.dbData);
                    this.setState({
                        question: JSON.parse(JSON.stringify(result.dbData.question)),
                        choices: JSON.parse(JSON.stringify(result.dbData.choices)),
                        answer: JSON.parse(JSON.stringify(result.dbData.answer)),
                    });
                },
            // 補足：コンポーネント内のバグによる例外を隠蔽しないためにも
            // catch()ブロックの代わりにここでエラーハンドリングすることが重要です
            (error) => {
                this.setState({
                        error
                    });
                }
            )
    }
    render(){
        //this.setState({question_id: 1});
        //this.setState({question_id: location.pathname.split('/').slice(-1)[0]});
        /*
        */
        return (
            <div>
                <h1>問題{this.state.question_id}</h1>
                <p>{this.state.question.question_text}</p>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>choice_id</th>
                            <th>choice_symbol</th>
                            <th>choice_text</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.choices.map((choice) => <tr key={choice.choice_id}>
                                                        <td>{choice.choice_id}</td>
                                                        <td>{choice.choice_symbol}</td>
                                                        <td>{choice.choice_text}</td>
                                                        </tr>)}
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary">回答</button>
            </div>
        );
    }
}

export default QA;

if (document.getElementById('qa')) {
    ReactDOM.render(<QA />, document.getElementById('qa'));
}