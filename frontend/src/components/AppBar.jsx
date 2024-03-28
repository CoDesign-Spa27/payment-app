import React from 'react'
 
const AppBar = ({username,profile}) => {

  return (
    <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
    </div>
    <div className="flex">
        <div className="flex flex-col capitalize justify-center h-full mr-4">
            {username}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex capitalize flex-col justify-center h-full text-xl">
                {profile}
            </div>
        </div>
    </div>
</div>
  )
}

export default AppBar
