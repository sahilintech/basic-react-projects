import React, { useState, useEffect } from 'react'
// import rgbToHex from './utils'

const SingleColor = ({ color, index }) => {
  const [alert, setAlert] = useState(false)
  const bcg = color.rgb.join(',')
  const hexValue = `#${color.hex}`
  /* const hexValue1 = rgbToHex(...color.rgb) another way of converting rgb value to hex
   console.log(hexValue1) */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000);

    return () => {
      clearTimeout(timeout)
    }
  }, [alert])


  const handleClick = () => {
    navigator.clipboard.writeText(hexValue);
    setAlert(true)
  }
  return (
    <article className={`color ${index >= 10 && 'color-light'}`} style={{ backgroundColor: `rgb(${bcg})` }} onClick={handleClick}>
      <p className="percent-value">{color.weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
