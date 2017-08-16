import React from 'react'
import Axios from 'axios'

class JobSelect extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            loading : true,
            err: null,
            data : null
        }
    }

    componentDidMount() {
        Axios.get(this.props.source).then(
            data =>{this.setState({loading:false,data:data});}
        )
    }

    render(){
        let joblist = null;
        if(this.state.loading != true){
            let data = this.state.data.data.jobAll;
            console.log(this.state);
            joblist = data.map((job =>{
                return(
                    <option key={job._id} value={job.j_num}>{job.j_num}</option>
                )
            }))
        }   
        return (
            <select id={this.props.inputid} name={this.props["inputName"]} className="form-control">
                <option key={-1} value={-1}>未设定</option>
                {joblist}
            </select>);
    }
}

export default JobSelect