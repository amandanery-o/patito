import { useCallback, useEffect, useMemo, useState } from 'react'
import { createHomeworkRepository } from '../repositories/homeworkRepository'

export function useHomework(userId, repository) {
  const stableRepository = useMemo(() => repository || createHomeworkRepository(), [repository])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(Boolean(userId))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      setItems(await stableRepository.list())
    } catch {
      setError('Não conseguimos carregar os temas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [stableRepository, userId])

  useEffect(() => {
    load()
  }, [load])

  async function run(operation) {
    if (!userId) {
      setError('Entre na sua conta para salvar seus temas.')
      throw new Error('authentication_required')
    }
    setSaving(true)
    setError('')
    try {
      await operation()
      await load()
    } catch (requestError) {
      setError('Não conseguimos salvar. Confira a internet e tente novamente.')
      throw requestError
    } finally {
      setSaving(false)
    }
  }

  return {
    items,
    loading,
    saving,
    error,
    reload: load,
    createHomework: (data) => run(() => stableRepository.create({ ...data, userId })),
    updateHomework: (id, changes) => run(() => stableRepository.update(id, changes)),
    removeHomework: (id) => run(() => stableRepository.remove(id)),
  }
}
