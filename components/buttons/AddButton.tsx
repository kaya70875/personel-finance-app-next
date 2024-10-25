'use client'

import React from 'react'

export default function AddButton({buttonText}: {buttonText: string}) {

    const handleClick = () => {
      console.log('add button clicked');
    }

  return (
    <button className="add-button" onClick={handleClick}>+ Add New {buttonText}</button>
  )
}
