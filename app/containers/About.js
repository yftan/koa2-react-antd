import React, { Component } from 'react'
import { Rate } from 'antd'
import Axios from 'axios'

class About extends Component{
  constructor(){
    super();
    this.state={
      value: 3,
      count: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.JobPostTest = this.JobPostTest.bind(this);
  }
  handleChange(value) {
    this.setState({ value });
  }
  JobPostTest(){
    Axios.post('/api/jobs',{
      "j_num": "2",
      "j_name": "mx",
      "j_date": "2017-5-27",
      "j_des": "这是二个测试"
    }).then(function(response){
            console.log(response)
            this.successCallback().bind(this)
        }).catch(function(error){
            console.log(error)
        })
  }
  render(){
    const { value } = this.state;
    return (
      <div>
        <span>
          {/*<Rate onChange={this.handleChange} value={value} />*/}
          {/*{value && <span className="ant-rate-text">{value} stars</span>}*/}
          <Rate onChange={this.handleChange} value={value} />
          {value && <span className="ant-rate-text">{value} stars</span>}
        </span>
        <br />
          <input type='button' value='post测试' onClick = {this.JobPostTest}/>
      </div>
    )
  }
}

export default About
