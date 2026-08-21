import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BottomNav from '../BottomNav'

describe('BottomNav', () => {
  it('nomeia como Agenda a área que reúne provas e trabalhos', () => {
    render(
      <BottomNav
        activeView="home"
        onHome={() => {}}
        onHomework={() => {}}
        onSchedule={() => {}}
        onCalendar={() => {}}
        onLeaderboard={() => {}}
      />,
    )

    expect(screen.getByRole('button', { name: 'Agenda' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Provas' })).not.toBeInTheDocument()
  })
})
