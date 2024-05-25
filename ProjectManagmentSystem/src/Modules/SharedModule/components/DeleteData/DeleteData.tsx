import React from 'react'
import noData from "../../../../assets/images/no-data.png"
export default function DeleteData({deleteItem}) {
  return (
    <>
    <div className="text-center bg-inf p-4">
      <img src={noData} className='mb-4' alt="delete" />
      <h3>Delete This {deleteItem}</h3>
      <p className="text-muted">
      are you sure you want to delete this item ? if you are sure just click on delete it
      </p>
    </div>
   </>
  )
}
