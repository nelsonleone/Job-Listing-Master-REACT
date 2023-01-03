export default function Job(props){

   function getChosenTags(tags){
      props.filterJobList(tags)
   }

   const tools = props.tools.length > 0 
    ? 
    props.tools.map((tool,index) => {
      return <button key={index} onClick={() => getChosenTags(tool)}>{tool}</button>
    })
    :
    ""
   ;
   const languages = props.languages.map((language,index) => {
      return <button key={index} onClick={() => getChosenTags(language)}>{language}</button>
   })


   return(
      <div className={props.featured ? "job-data-container featured-job" : "job-data-container"}>
         <div>
            <img src={props.logo} alt={`${props.company} Logo`}/>
            <div className="row">
               <h2>{props.company}</h2>
               {props.new 
                 ?
                 <span className="new">New!</span>
                 :
                 ""
               }
               {props.featured 
                 ?
                 <span className="featured">Featured</span>
                 :
                 ""
               }
            </div>
            <h2 className="job-position">{props.position}</h2>
            <div className="job-short-details">
               <ul>
                  <li>{props.postedAt}</li>
                  <li>{props.contract}</li>
                  <li>{props.location}</li>
               </ul>
            </div>
         </div>

         <div className="tag-section">
            <button onClick={() => getChosenTags(props.role)}>{props.role}</button>
            <button onClick={() => getChosenTags(props.level)}>{props.level}</button>
            {languages}
            {tools}
         </div>
      </div>
   )
}
