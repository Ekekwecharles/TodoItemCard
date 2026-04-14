// DOM wiring: checkbox toggles title strike + status "Done";
// due label + time remaining hint recomputed every ~60s.

import {
  TODO,
  formatDueDateLabel,
  getTimeRemainingHint,
} from './todo-logic.js'

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

  syncDueUI(new Date(), due)

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
