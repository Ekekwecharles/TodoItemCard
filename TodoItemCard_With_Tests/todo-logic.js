// Pure date/time helpers and demo constants (unit-tested separately from DOM).

export const TODO = {
  title: 'Ship the testable todo card',
  initialStatus: 'In Progress',
  dueIso: '2026-04-16T18:00:00.000Z',
}

export const MS_MINUTE = 60_000
export const MS_HOUR = 60 * MS_MINUTE
export const MS_DAY = 24 * MS_HOUR

export function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** Calendar day difference in local time: dueDay − nowDay */
export function calendarDayDiff(now, due) {
  return Math.floor((startOfDay(due).getTime() - startOfDay(now).getTime()) / MS_DAY)
}

export function formatDueDateLabel(due) {
  const formatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(due)
  return `Due ${formatted}`
}

export function getTimeRemainingHint(now, due) {
  const diff = due.getTime() - now.getTime()
  const abs = Math.abs(diff)

  if (abs < 90_000) return 'Due now!'

  if (diff < 0) {
    const overdue = -diff
    const hours = Math.floor(overdue / MS_HOUR)
    if (hours >= 1) return `Overdue by ${hours} ${hours === 1 ? 'hour' : 'hours'}`
    const minutes = Math.max(1, Math.floor(overdue / MS_MINUTE))
    return `Overdue by ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }

  const days = calendarDayDiff(now, due)
  if (days === 1) return 'Due tomorrow'
  if (days > 1) return `Due in ${days} days`

  const hoursLeft = Math.floor(diff / MS_HOUR)
  if (hoursLeft >= 1) return `Due in ${hoursLeft} ${hoursLeft === 1 ? 'hour' : 'hours'}`
  const minutesLeft = Math.max(1, Math.ceil(diff / MS_MINUTE))
  return `Due in ${minutesLeft} ${minutesLeft === 1 ? 'minute' : 'minutes'}`
}
