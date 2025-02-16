import React, { useState } from 'react'

const SectionLoader = () => {
  return (
    <div className='w-full py-28 flex flex-col gap-3 justify-center items-center'>
        <span className="loader"></span>
        <p>Yuklanmoqda...!</p>
    </div>
  )
}

export default SectionLoader