import { useCallback, useState } from 'react'
import { createStudyRepository } from '../repositories/studyRepository'

export const SYNC_STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
  STALE: 'stale',
})

function isStaleError(error) {
  return error?.message?.includes('session_stale') || error?.details?.includes('session_stale')
}

function canonicalStateError(session, answers) {
  return Object.assign(new Error('Seu progresso mudou em outra aba. Recarregamos a versão mais recente.'), {
    code: 'SESSION_STALE',
    session,
    answers,
  })
}

export function useStudySession(repository = createStudyRepository()) {
  const [session, setSession] = useState(null)
  const [answers, setAnswers] = useState([])
  const [status, setStatus] = useState(/** @type {string} */ (SYNC_STATUS.IDLE))
  const [error, setError] = useState(/** @type {unknown} */ (null))

  const startOrResume = useCallback(
    async ({ userId, subjectId, contentId, questionIds }) => {
      setStatus(SYNC_STATUS.LOADING)
      setError(null)
      try {
        let active = await repository.findOpenSession(contentId)
        if (!active) {
          try {
            active = await repository.createSession({ userId, subjectId, contentId, questionIds })
          } catch (creationError) {
            // Duas abas podem criar ao mesmo tempo. A constraint escolhe a canônica.
            if (/** @type {{ code?: string }} */ (creationError).code !== '23505') throw creationError
            active = await repository.findOpenSession(contentId)
          }
        }
        const savedAnswers = await repository.listAnswers(active.id)
        setSession(active)
        setAnswers(savedAnswers)
        setStatus(SYNC_STATUS.SAVED)
        return { session: active, answers: savedAnswers }
      } catch (requestError) {
        setError(requestError)
        setStatus(SYNC_STATUS.ERROR)
        throw requestError
      }
    },
    [repository],
  )

  const saveAnswer = useCallback(
    async (answerData) => {
      setStatus(SYNC_STATUS.SAVING)
      setError(null)
      try {
        const updatedSession = await repository.saveAnswer({
          ...answerData,
          sessionId: session.id,
          expectedUpdatedAt: session.updated_at,
        })
        setSession(updatedSession)
        setAnswers((previous) => {
          const withoutPrevious = previous.filter((item) => item.question_id !== answerData.questionId)
          return [
            ...withoutPrevious,
            {
              id: answerData.answerId,
              question_id: answerData.questionId,
              answer: answerData.answer,
              is_correct: answerData.isCorrect,
            },
          ]
        })
        setStatus(SYNC_STATUS.SAVED)
        return updatedSession
      } catch (requestError) {
        if (isStaleError(requestError)) {
          const canonicalSession = await repository.findOpenSession(session.content_id)
          const canonicalAnswers = canonicalSession ? await repository.listAnswers(canonicalSession.id) : []
          setSession(canonicalSession)
          setAnswers(canonicalAnswers)
          setError(null)
          setStatus(SYNC_STATUS.STALE)
          throw canonicalStateError(canonicalSession, canonicalAnswers)
        }
        setError(requestError)
        setStatus(SYNC_STATUS.ERROR)
        throw requestError
      }
    },
    [repository, session],
  )

  const complete = useCallback(async () => {
    setStatus(SYNC_STATUS.SAVING)
    setError(null)
    try {
      const completed = await repository.completeSession(session.id)
      setSession(completed)
      setStatus(SYNC_STATUS.SAVED)
      return completed
    } catch (requestError) {
      setError(requestError)
      setStatus(SYNC_STATUS.ERROR)
      throw requestError
    }
  }, [repository, session])

  return { session, answers, status, error, startOrResume, saveAnswer, complete }
}
