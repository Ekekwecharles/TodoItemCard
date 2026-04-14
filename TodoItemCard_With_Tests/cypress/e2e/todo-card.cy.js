const childTestIds = [
  'test-todo-title',
  'test-todo-description',
  'test-todo-priority',
  'test-todo-due-date',
  'test-todo-time-remaining',
  'test-todo-status',
  'test-todo-complete-toggle',
  'test-todo-tags',
  'test-todo-tag-work',
  'test-todo-tag-urgent',
  'test-todo-tag-design',
  'test-todo-edit-button',
  'test-todo-delete-button',
]

describe('Todo card', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the card and all required child testids', () => {
    cy.get('[data-testid=test-todo-card]').should('be.visible')
    for (const id of childTestIds) {
      cy.get(`[data-testid=${id}]`).should('exist').and('be.visible')
    }
  })

  it('marks complete: status Done, title strike-through; Edit/Delete stay enabled', () => {
    cy.get('[data-testid=test-todo-edit-button]')
      .should('be.visible')
      .and('not.be.disabled')
    cy.get('[data-testid=test-todo-delete-button]')
      .should('be.visible')
      .and('not.be.disabled')

    cy.get('[data-testid=test-todo-complete-toggle]').click({ force: true })

    cy.get('[data-testid=test-todo-status]').should('have.text', 'Done')

    cy.get('[data-testid=test-todo-title]').should(($el) => {
      const el = $el[0]
      const hasCompletedClass = el.classList.contains('is-completed')
      const line = window.getComputedStyle(el).textDecorationLine
      const decoration = window.getComputedStyle(el).textDecoration
      const hasLineThrough =
        line === 'line-through' ||
        (decoration && String(decoration).includes('line-through'))
      expect(
        hasCompletedClass || hasLineThrough,
        'title should have is-completed and/or line-through',
      ).to.be.true
    })

    cy.get('[data-testid=test-todo-edit-button]')
      .should('be.visible')
      .and('not.be.disabled')
    cy.get('[data-testid=test-todo-delete-button]')
      .should('be.visible')
      .and('not.be.disabled')
  })

  it('can complete via label click', () => {
    cy.contains('label', 'Mark complete').click()
    cy.get('[data-testid=test-todo-status]').should('have.text', 'Done')
    cy.get('[data-testid=test-todo-complete-toggle]').should('be.checked')
  })

  it('uncheck restores In Progress and removes completed styling', () => {
    cy.get('[data-testid=test-todo-complete-toggle]').click({ force: true })
    cy.get('[data-testid=test-todo-status]').should('have.text', 'Done')

    cy.get('[data-testid=test-todo-complete-toggle]').click({ force: true })
    cy.get('[data-testid=test-todo-status]').should('have.text', 'In Progress')
    cy.get('[data-testid=test-todo-title]').should('not.have.class', 'is-completed')
  })

  it('shows priority and tag text', () => {
    cy.get('[data-testid=test-todo-priority]').should('contain', 'Medium')
    cy.get('[data-testid=test-todo-tag-work]').should('have.text', 'work')
    cy.get('[data-testid=test-todo-tag-urgent]').should('have.text', 'urgent')
    cy.get('[data-testid=test-todo-tag-design]').should('have.text', 'design')
  })

  it('fills due label and time hint after load', () => {
    cy.get('[data-testid=test-todo-due-date]').should('not.be.empty')
    cy.get('[data-testid=test-todo-time-remaining]').should('not.be.empty')
  })
})
