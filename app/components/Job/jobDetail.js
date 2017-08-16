import React from 'react'
import React from 'react-dom'
import Axios from 'axios'
import RiverPtList from '../RiverPt/riverPtList'

class JobDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            err: null,
            data: null
        }
        this.Refresh = this.Refresh.bind(this )
    }

    componentDidMount() {
        this.Refresh()
    }

    Refresh(){
        Axios.get(this.props.source).then(
            data => { this.setState({isLoading:false, data:data}); },
            err => { this.setState({loading:false, err:err}); }
        )
    }

    onReturnClickHandle(event){

    }
    render(){
       if(this.state.isLoading)
        {
            return (
                <span>
                    loading...
                </span>)
        }
        if(this.state.err)
        {
            return(
                <span>
                    error : { JSON.stringify(this.props.err) }
                </span>
            );
        }
        if(this.state.data.res == 'err')
        {
            return(
                <span>
                    error : { this.props.data.mess }
                </span>
            );
        }
        this.state.data = this.state.data.data.data[0];
        return(
            <div className="row">
                <div className="col-xs-12">
                    <section className="panel" >
                        <header className="panel-heading">
                            作业信息
                        </header>
                        <div className="panel-body" >
                            <h4>作业编号 : {this.state.data.j_num} </h4>
                            <h4>作业名称 : {this.state.data.j_name} </h4>
                            <h4>创建时间 : {this.state.data.j_date} </h4>
                            <h4>描述 : </h4>
                            <p className="muted"> {this.state.data.j_des }</p>
                            <button type="button" className="btn btn-default" onClick={this.onReturnClickHandle}><i className="fa fa-reply"> </i>&nbsp;返回</button>
                        </div>
                    </section>
                    <section className="panel" >
                        <header className="panel-heading">
                            点位信息
                        </header>
                        <div className="panel-body" >
                            <RiverPtList source={ "/riverptinfo/wgs/all?jnum=" + this.state.data.j_num} />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default JobDetail