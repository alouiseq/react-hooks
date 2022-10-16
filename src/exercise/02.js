// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initial = ''}) {
//  const initialName = localStorage.getItem('name') || ''
//  const [name, setName] = React.useState(initialName)

  // EC1
  //const getInitialName = () => localStorage.getItem('name') || ''
  // const [name, setName] = React.useState(getInitialName)
  
  // EC2
  // const getInitialName = () => localStorage.getItem('name') || ''
  // const [name, setName] = React.useState(getInitialName)
  //  React.useEffect(() => {
  //    localStorage.setItem('name', name)
  //  }, [name])


  // EC3
//  const useLocalStorageState = key => {
//    const getInitialData = () => localStorage.getItem(key) || ''
//    const [data, setData] = React.useState(getInitialData)
//
//    React.useEffect(() => {
//      localStorage.setItem(key, data)
//    }, [key, data])
//
//    return [data, setData]
//  }
//
//  const [name, setName] = useLocalStorageState('name')

  // EC4
  const useLocalStorageState = (key, initial) => {
    const [data, setData] = React.useState(() => {
      const value = localStorage.getItem(key)
      if (value) return JSON.parse(value)
      return typeof initial === 'function' ? initial() : initial
    })

    const prevKeyRef = React.useRef(key)

    React.useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        localStorage.removeItem(prevKey)
        prevKeyRef.current = key
      }
      localStorage.setItem(key, JSON.stringify(data))
    }, [key, data])

    return [data, setData]
  }

  const [name, setName] = useLocalStorageState('name', initial)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initial={5} />
}

export default App
