import React, { useState } from 'react'
import { fileStructure } from '../config'
import { FaFolderOpen } from "react-icons/fa6";
import { PiFilesFill } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa";
import "../App.css"


const Comment=({data,click})=>{

    return(
        <>
          <div onClick={()=>click(data.id)} className='flex text-white items-center gap-x-2 my-2 mx-2 cursor-pointer'>
                  <span className='flex'>
                    {
                      data.isFolder? <><FaAngleRight/> <FaFolderOpen size={"1.3rem"}/></>:<PiFilesFill size={"1.3rem"}/>
                    }
                    </span>
                  <span className='text-[18px]'>{data.fName}</span>
                  
             </div>
        </>
    )
}

const Filecomp=({data,setActualData})=>{
    const [showChild,setShowChild]=useState(false);
    const [newActual,setNewActual]=useState(data);



    

    const handleClick=(id)=>{
        
        console.log(id)
        newActual.forEach(item => {
            if (item.id === id) {
                item.showChild = !item.showChild;
            } else if (item.children) {
                console.log(id+"Hello")
                toggleShowChildInNested(item.children, id);
            }
        });

        function toggleShowChildInNested(children, id) {
            children.forEach(child => {
                if (child.id === id) {
                    child.showChild = !child.showChild;
                } else if (child.children) {
                    toggleShowChildInNested(child.children, id);
                }
            });
        }

    

       
    }

         return(
            <>
              {
                newActual.map((item)=>{
                    return(
                        <>
                          <Comment data={item} click={(id)=>handleClick(id)}/>
                          <div className='pl-4'>
                           {item.showChild && <Filecomp data={item.children}/>}
                          </div>
                        </>
                    )
                })
              }
            </>
         )
     }


const Filesystem = () => {
    const [actualData,setActualData]=useState(fileStructure);
  return (
    <div className='bg-slate-800 h-[100vh] w-[100vw]'>
         <div className='scrollbars w-[20%] border border-white h-[100vh] overflow-x-scroll overflow-y-scroll mx-2'>
            <div > 
              <Filecomp data={actualData} setData={setActualData}/>
            </div>  
         </div>
    </div>
  )
}

export default Filesystem

