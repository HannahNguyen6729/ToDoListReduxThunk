import React from 'react'
import {useState} from 'react'

const courses = [
  {id: 1, name: 'html, css'},
  {id: 2, name: 'javascript'},
  {id: 3, name: 'reactJS'},

]
// export default function About() {
//   const[checkedId, setCheckedId] = useState()
//   return (
//     <div className='container p-5'>
//       {courses.map(item=> (
//         <div key={item.id}>
//            <input type="radio" value={item.id} checked={checkedId === item.id? true:false}  
//             onChange = {() =>{ setCheckedId(item.id)}}
//            />
//            {item.name}
//         </div>
//       ))}
//     </div>
//   )
// }
export default function About() {
  let[checkedId, setCheckedId] = useState([])
  const handleCheck = (id) => {
    // let index = checkedId.findIndex(item => item === id)
    // if(index !== -1) {
    //   checkedId = checkedId.filter(item => item !== id);
    //   setCheckedId([...checkedId])
    // }else{
    //   setCheckedId( [...checkedId, id])
    // }

    //cach2:
    let flag = checkedId.includes(id);
    if(flag){
      //true, co trung id trong mang
      let newArray = checkedId.filter(item => item !==id)
      setCheckedId(newArray)
    }else{
      //false, khong co id do trong mang
      setCheckedId( [...checkedId, id])
    }
    
  }
  console.log(checkedId)
  return (
    <div className='container p-5'>
      {courses.map(item=> (
        <div key={item.id}>
           <input type="checkbox"
           onChange={() =>handleCheck(item.id)}
           //kiem tra trong mang checkedId co {item.id} hay khong, co thi tra ve true--> checked, khong co -->false-->unchecked
           checked={checkedId.includes(item.id)}
           />
           {item.name}
        </div>
      ))}
    </div>
  )
}

