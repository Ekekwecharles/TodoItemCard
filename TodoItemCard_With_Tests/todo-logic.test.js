import { describe, expect, it } from 'vitest'
import {
  MS_HOUR,
  MS_MINUTE,
  calendarDayDiff,
  formatDueDateLabel,
  getTimeRemainingHint,
  startOfDay,
} from './todo-logic.js'

describe('startOfDay', () => {
  it('normalizes to local midnight', () => {
    const d = new Date('2026-06-15T14:30:00.000Z')
    const s = startOfDay(d)
    expect(s.getHours()).toBe(0)
    expect(s.getMinutes()).toBe(0)
    expect(s.getSeconds()).toBe(0)
  })
})

describe('calendarDayDiff', () => {
  it('returns 1 when due is the next local calendar day', () => {
    const now = new Date(2026, 3, 14, 22, 0, 0)
    const due = new Date(2026, 3, 15, 10, 0, 0)
    expect(calendarDayDiff(now, due)).toBe(1)
  })

  it('returns 0 on the same local calendar day', () => {
    const now = new Date(2026, 3, 14, 8, 0, 0)
    const due = new Date(2026, 3, 14, 20, 0, 0)
    expect(calendarDayDiff(now, due)).toBe(0)
  })
})

describe('formatDueDateLabel', () => {
  it('prefixes Due with a short formatted date', () => {
    const due = new Date('2026-04-16T18:00:00.000Z')
    const label = formatDueDateLabel(due)
    expect(label.startsWith('Due ')).toBe(true)
    expect(label).toMatch(/2026/)
  })
})

describe('getTimeRemainingHint', () => {
  it('returns Due now when within 90s', () => {
    const due = new Date('2026-04-16T12:00:00.000Z')
    const now = new Date(due.getTime() - 30_000)
    expect(getTimeRemainingHint(now, due)).toBe('Due now!')
  })

  it('returns overdue by hours when past due by >= 1 hour', () => {
    const due = new Date('2026-04-16T12:00:00.000Z')
    const now = new Date(due.getTime() + 2 * MS_HOUR)
    expect(getTimeRemainingHint(now, due)).toBe('Overdue by 2 hours')
  })

  it('returns overdue by minutes when past due by < 1 hour', () => {
    const due = new Date('2026-04-16T12:00:00.000Z')
    const now = new Date(due.getTime() + 5 * MS_MINUTE)
    expect(getTimeRemainingHint(now, due)).toBe('Overdue by 5 minutes')
  })

  it('returns Due tomorrow when calendar diff is 1', () => {
    const now = new Date(2026, 3, 14, 12, 0, 0)
    const due = new Date(2026, 3, 15, 12, 0, 0)
    expect(getTimeRemainingHint(now, due)).toBe('Due tomorrow')
  })

  it('returns Due in N days when calendar diff > 1', () => {
    const now = new Date(2026, 3, 14, 12, 0, 0)
    const due = new Date(2026, 3, 17, 12, 0, 0)
    expect(getTimeRemainingHint(now, due)).toBe('Due in 3 days')
  })

  it('returns Due in hours when same day and hours left', () => {
    const due = new Date(2026, 4, 16, 18, 0, 0)
    const now = new Date(due.getTime() - 3 * MS_HOUR)
    expect(getTimeRemainingHint(now, due)).toBe('Due in 3 hours')
  })

  it('returns Due in minutes when same day and under an hour', () => {
    const due = new Date(2026, 4, 16, 18, 0, 0)
    const now = new Date(due.getTime() - 45 * MS_MINUTE)
    expect(getTimeRemainingHint(now, due)).toBe('Due in 45 minutes')
  })
})
