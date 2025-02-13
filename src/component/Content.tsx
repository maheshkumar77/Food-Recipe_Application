import React from 'react'

const Content = () => {
  return (
    <div className="flex justify-center items-center w-full h-auto">
    <div className="grid grid-cols-4 gap-8 w-11/12 border-2 border-red-500 items-center">
        <div className="h-48 w-72 border-2 border-red-500 bg-indigo-600 hover:scale-105 transition-all duration-1000 cursor-pointer">1</div>
        <div className="h-48 w-72 border-2 border-red-500 bg-indigo-600 hover:scale-105 transition-all duration-1000 cursor-pointer">2</div>
        <div className="h-48 w-72 border-2 border-red-500 bg-indigo-600 hover:scale-105 transition-all duration-1000 cursor-pointer">3</div>
        <div className="h-48 w-72 border-2 border-red-500 bg-indigo-600 hover:scale-105 transition-all duration-1000 cursor-pointer">4</div>
    </div>
   </div>
  )
}

export default Content
