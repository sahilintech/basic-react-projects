import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'



function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const jobs = await response.json();
      setJobs(jobs);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return (
      <section className='section loading'><h2>Loading...</h2></section>
    )
  }

  if (error) {
    return <h3>error</h3>
  }

  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {
            jobs.map((job, index)=>{
              return(
              <button className={`job-btn ${index===value && 'active-btn'}`} key={job.id} onClick={()=>setValue(index)}>{job.company}</button>
              )
            })
          }
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {
            duties.map((duty, index) => {
              return (
                <div className="job-desc" key={index}>
                  <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                  <p>{duty}</p>
                </div>
              )
            })
          }
          <button className='btn'>More Info</button>
        </article>
      </div>
    </section>
  )
}

export default App
