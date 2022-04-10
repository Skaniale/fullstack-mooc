const Title = (props) => {
    return <h1>{props.title}</h1>
  }
  
  
  const Header = (props) => {
    console.log("Header props: ", props)
    return <h2>{props.header}</h2>
  }
  
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <div>
        {props.parts.map(part =>
          <p key ={part.id}>
            {console.log("PART value check", part)}
            {part.name + " "}
            {part.exercises}
          </p>)} 
        </div>
      </div>
    )
  }
  
  
  function sumExercises(props) {
    const totalSum = props.parts.reduce(
      (previousNum, currentNum)=>previousNum+currentNum.exercises,
    0)
      console.log("reduce sum: ", totalSum)
  
    return totalSum
  }
  
  
  const Total = (props) => {
    console.log("TOTAL props: ", props)
    const sumEx = sumExercises(props)
    console.log("TOTAL sum: ", sumEx)
    return (
      <div>
          <b> 
            total of {sumEx} exercises
          </b>
      </div>
    )
  }
  
   
  const Course = (props) => {
    const courses = props.courses
    const title = props.title
  
    console.log("titteli: ", title)
    console.log("kurssit: ", courses)
    return(
      <div>
        {console.log("TITLE value check: ", title)}
        <Title title={title}/>
        {courses.map(course =>
          <div key ={courses.id}>
            {console.log("COURSE value check: ", course)}
            <Header header={course.name}/>
            {console.log("Course Header: ", course.name)}
            <Part parts={course.parts}/>
            {console.log("Course Parts: ", course.parts)}
            <Total parts={course.parts}/>
          </div>)} 
      </div>
    )
  }

export default Course