import { useState } from 'react';
import { useEffect } from 'react';
import listData from './data.json';
import Job from './Job';

function App() {
 const [jobsData,setJobsData] = useState(listData)
 const [tagsArray,setTagsArray] = useState([])
  const [chosenTagsArray,setChosenTagsArray] = useState([])
 const [removedTagsArray,setRemoveTagsArray] = useState([])
 const [renderTags,setRenderTags] = useState(false)


 function filterJobList(tag){
    setTagsArray(prevTags => {
      return new Set([...prevTags,tag])
    })
    setRenderTags(true)
    setChosenTagsArray(prevState => {
      return [...prevState,tag]
    })
    renderChosenTag()
  }




  // handling the chosen tags , and rendering there contents
  function renderChosenTag(){
    const matchingJobs = jobsData.filter(job => {
      const hasMatchingRole = chosenTagsArray.includes(job.role);
      const hasMatchingLevel = chosenTagsArray.includes(job.level);
      const hasMatchingLanguages = job.languages.some(language => chosenTagsArray.includes(language));
      const hasMatchingTools = job.tools.some(tool => chosenTagsArray.includes(tool));
      return hasMatchingRole && hasMatchingLevel && hasMatchingLanguages && hasMatchingTools;
    })
    setJobsData(matchingJobs)
  }
    
  

  function removeTag(tag){
    setTagsArray(prevTags => {
      return [...prevTags].filter(allTags => {
        return allTags !== tag ;
      })
    })
  } 

 function clearTags(){
   setTagsArray([])
 }
 

  useEffect(() => {
    if(tagsArray.length === 0){
      setRenderTags(false)
      setJobsData(listData)
    }
    for(let x of tagsArray){
      renderChosenTag(x)
    }
  },[tagsArray])




 const jobsElement = jobsData.map(job => {
  return(
    <Job 
      key={job.id}
      {...job}
      filterJobList={filterJobList}
    />
  )
 })

 const tagsElement = [...tagsArray].map((tag,index) => {
   return(
    <span className='tag' key={index}>{tag}
      <img 
        src="/images/icon-remove.svg" 
        alt="remove tags" 
        aria-labelledby="remove-tags"
        onClick={()=> removeTag(tag)}
      />
      <title id="remove-tags"></title>
    </span>
   )
 })

 

  return (
    <>
      <div className='header-section'></div>
      <main>
        {renderTags ?
          <div className='chosen-tags'>
              <div>
                {tagsElement}
              </div>
              <button className='clear' onClick={clearTags}title="Clear Tags">Clear</button>
          </div>
          :
          ""
        }
        <div className='jobs'>
          {jobsElement}
        </div>
      </main>
    </>
  )
}

export default App
