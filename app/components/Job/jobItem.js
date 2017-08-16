import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import JobDetail from './jobDetail'

class JobItem extends React.Component{
    constructor(props){
        super(props)
        this.onClickHandle = this.onClickHandle.bind(this)
        this.onDeleteClickHandle = this.onDeleteClickHandle.bind(this)
    }

    onClickHandle(event){
        ReactDOM.render(<JobDetail source={"/jobs/"+this.props.j_num} />,
            document.getElementById('main_context'))
    }

    onDeleteClickHandle(event){
        if(!confirm('确认删除？')){
            return;
        }
        let url = '/jobs/'+this.props.j_id
        Axios.delete(url).then(
            data =>{
                if(data.data.res == 'suc'){
                    this.props.refreshCallback()
                }
            },
            err =>{}
        )
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="well well-large">
                        <h4>{ this.props.j_num }</h4>
                        <h5 >{ this.props.j_name }</h5>
                        <h5 >{ this.props.j_date }</h5>
                        <h5 >{ this.props.j_des }</h5>
                        <button className="btn btn-info" type="button" onClick={ this.onClickHandle } data-jnum={ this.props.j_num } >详情</button>&nbsp;&nbsp;
                        <button className="btn btn-danger" type="button" onClick={ this.onDeleteClickHandle } >删除</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default JobItem