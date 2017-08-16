import React from 'react'
import JobList from './jobList.js'

class Job extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <section className="panel" >
                        <header className="panel-heading">
                            ????
                        </header>
                        <div className="panel-body">
                            <JobList source="/api/jobs/all" />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}