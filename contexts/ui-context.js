import { createContext, useState, useContext } from 'react'

const DarkmodeContext = createContext()

function DarkmodeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(false)

  return (
    <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  )
}

function useDarkmode() {
  const context = useContext(DarkmodeContext)
  if (context === undefined) {
    throw new Error('useDarkmode must be used within a DarkmodeProvider')
  }
  return context
}

export { DarkmodeProvider, useDarkmode }