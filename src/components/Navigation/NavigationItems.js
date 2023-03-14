import React from 'react'

function NavigationItems(props) {
  const { id, navTitle, navUrl} = props
  return (
    <div>
       <nav>
      <ul>  
          <li key={id}>
            <a href={navUrl}>{navTitle}</a>
          </li>
      </ul>
    </nav>
    </div>
  )
}

export default NavigationItems
