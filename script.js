// Plain JS version of the original component logic:
// - fixed demo data (same text/tags/dueIso)
// - checkbox toggles title strike + status "Done"
// - due label + time remaining hint recomputed every ~60s

const TODO = {
    title: 'Ship the testable todo card',
    initialStatus: 'In Progress',
    dueIso: '2026-04-16T18:00:00.000Z',
  }
  
  const MS_MINUTE = 60_000
  const MS_HOUR = 60 * MS_MINUTE
  const MS_DAY = 24 * MS_HOUR
  
  function startOfDay(d) {
    const x = new Date(d)
    x.setHours(0, 0, 0, 0)
    return x
  }
  
  // Calendar day difference in local time: dueDay − nowDay
  function calendarDayDiff(now, due) {
    return Math.floor((startOfDay(due).getTime() - startOfDay(now).getTime()) / MS_DAY)
  }
  
  function formatDueDateLabel(due) {
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(due)
    return `Due ${formatted}`
  }
  
  function getTimeRemainingHint(now, due) {
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
  
  function $(sel) {
    const el = document.querySelector(sel)
    if (!el) throw new Error(`Missing element: ${sel}`)
    return el
  }
  
  function syncDueUI(now, due) {
    const dueLabelEl = $('[data-testid="test-todo-due-date"]')
    const timeRemainingEl = $('[data-testid="test-todo-time-remaining"]')
  
    const dueIso = due.toISOString()
    dueLabelEl.dateTime = dueIso
    timeRemainingEl.dateTime = dueIso
  
    dueLabelEl.textContent = formatDueDateLabel(due)
    timeRemainingEl.textContent = getTimeRemainingHint(now, due)
  }
  
  function syncCompletionUI(completed) {
    const titleEl = $('[data-testid="test-todo-title"]')
    const statusEl = $('[data-testid="test-todo-status"]')
  
    titleEl.classList.toggle('is-completed', completed)
    statusEl.textContent = completed ? 'Done' : TODO.initialStatus
  }
  
  function main() {
    const due = new Date(TODO.dueIso)
  
    // Initial due info
    syncDueUI(new Date(), due)
  
    // Recompute on a ~60s interval (same as original)
    setInterval(() => {
      syncDueUI(new Date(), due)
    }, 60_000)
  
    const checkbox = $('[data-testid="test-todo-complete-toggle"]')
    checkbox.addEventListener('change', () => {
      syncCompletionUI(Boolean(checkbox.checked))
    })
  
    $('[data-testid="test-todo-edit-button"]').addEventListener('click', () => {
      console.log('edit', TODO.title)
    })
  
    $('[data-testid="test-todo-delete-button"]').addEventListener('click', () => {
      console.log('delete', TODO.title)
    })
  }
  
  main()
  
  
  