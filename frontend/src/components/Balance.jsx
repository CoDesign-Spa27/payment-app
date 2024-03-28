import React from 'react'

const Balance = ({value}) => {
  return (
    <div className="flex">
    <div className="font-bold py-4 text-lg">
         Account balance
    </div>
    <div className="font-semibold py-4 ml-4 text-lg">
        Rs {value}
    </div>
</div>
  )
}

export default Balance
