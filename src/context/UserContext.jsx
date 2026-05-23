import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const UserContext = createContext(null)
const KEY = 'jaffa_chapi_user'

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
  })

  const [pointsToast, setPointsToast] = useState(null) // { amount, total, ts }

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!pointsToast) return
    const t = setTimeout(() => setPointsToast(null), 5000)
    return () => clearTimeout(t)
  }, [pointsToast])

  const persist = useCallback((u) => {
    setUser(u)
    if (u) localStorage.setItem(KEY, JSON.stringify(u))
    else localStorage.removeItem(KEY)
  }, [])

  function login({ phone, username }) {
    let saved = null
    try { saved = JSON.parse(localStorage.getItem(KEY)) } catch {}

    if (saved?.phone === phone) {
      const updated = { ...saved, lastVisit: Date.now() }
      persist(updated)
      return { isNew: false, user: updated }
    }
    const newUser = { phone, username, points: 10, joinDate: Date.now(), lastVisit: Date.now() }
    persist(newUser)
    return { isNew: true, user: newUser }
  }

  function logout() { persist(null) }

  function addPoints(pts) {
    if (!pts || pts <= 0) return
    setUser(prev => {
      if (!prev) return prev
      const updated = { ...prev, points: prev.points + pts }
      localStorage.setItem(KEY, JSON.stringify(updated))
      // Fire the toast with the latest total
      setPointsToast({ amount: pts, total: updated.points, ts: Date.now() })
      return updated
    })
  }

  function dismissToast() { setPointsToast(null) }

  return (
    <UserContext.Provider value={{ user, login, logout, addPoints, pointsToast, dismissToast }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() { return useContext(UserContext) }
