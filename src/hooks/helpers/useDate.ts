import { useEffect, useMemo, useState } from 'react'

export function useDate(date: any) {
  const dateInstance = new Date(date)
  const [currentDateInstance, setCurrentDate] = useState(new Date())
  const day = useMemo(() => dateInstance.getDay(), [dateInstance])
  const month = useMemo(() => dateInstance.getMonth(), [dateInstance])
  const year = useMemo(() => dateInstance.getFullYear(), [dateInstance])
  const hours = useMemo(() => dateInstance.getHours(), [dateInstance])
  const seconds = useMemo(() => dateInstance.getSeconds(), [dateInstance])
  const diff = useMemo(
    () => Math.abs((currentDateInstance as any) - (dateInstance as any)),
    [currentDateInstance, dateInstance]
  )

  const [secondsFromNow, setSecondsFromNow] = useState<number>(0)
  const [hoursFromNow, setHoursFromNow] = useState<number>(0)
  const [minutesFromNow, setMinutesFromNow] = useState<number>(0)
  const [daysFromNow, setDaysFromNow] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const seconds = (diff / 1000).toFixed(0)
    const minutes = (diff / 1000 / 60).toFixed(0)
    const hours = (diff / 1000 / 60 / 60).toFixed(0)
    const days = (diff / 1000 / 60 / 60 / 24).toFixed(0)
    setSecondsFromNow(Number(seconds))
    setMinutesFromNow(Number(minutes))
    setHoursFromNow(Number(hours))
    setHoursFromNow(Number(hours))
    setDaysFromNow(Number(days))
  }, [currentDateInstance])

  return {
    dateInstance,
    day,
    month,
    year,
    hours,
    seconds,
    secondsFromNow,
    minutesFromNow,
    daysFromNow,
    hoursFromNow,
  }
}
