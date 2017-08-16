import React from 'react'
import Axios from 'axios'
import JobItem from './jobItem'
import JobNew from './jobNew'

class JobList extends React.Component{
    constructor(props){
        this.state ={
            loading: true,
            err: null,
            data: null,
            keyword: null
        }
    }

    componentDidMount() {
        this.Refresh()
    }

    Refresh(){
        Axios.get(this.props.source).then(
            data => {this.setState({loading:false,data:data.data});}
        )
    }

    searchChangeHandle(event){
        this.setState({keyword:event.target.value})
    }
    
    render(){
        if(this.state.loading) {
            return (<span>Loading...</span>);
        }
        else if(this.state.err != null) {
            return (<span>Error : {this.state.err.mess}</span>);
        }else{
            var keyword = this.state.keyword;
            var data = this.state.data.data;
            var jobList = null;
            if(keyword != null && keyword.trim() != '')
            {
                jobList = data.map( (job) => {
                    if(job.j_num == keyword)
                        return (
                            <JobItem j_num={job.j_num} j_name={job.j_name} j_date={job.j_date} j_des={job.j_des} />
                        );
                });
            }
            else
            {
                jobList = data.map( (job) => {
                    return (
                        <JobItem j_id={job._id} j_num={job.j_num} j_name={job.j_name} j_date={job.j_date} j_des={job.j_des} refreshCallback={this.Refresh} />
                    );
                });
            }

            return (
                <div>
                    <JobNew refreshCallback={this.Refresh} />
                    <div className="input-group m-bot15">
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-default"><i className="fa fa-search"></i></button>
                        </span>
                        <input type="text" className="form-control" onChange={ this.searchChangeHandle } />
                    </div>
                    <div>
                        {jobList}
                    </div>
                </div>);
        }
    }
}
export default JobList
