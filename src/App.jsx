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
    renderChosenTag(tag)
  }




  // handling the chosen tags , and rendering there contents
 function renderChosenTag(tag){
    const newArray = listData.filter((data,index) => {
      if(data.level === tag || data.level === tagsArray.filter(tag => {
        return tag ===  data.level
      })){
        return data;
      }
    })
    setJobsData(newArray)
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
