const HOMEWORK_STORAGE_KEY = 'patito_e2e_homework'

function loadHomework() {
  return JSON.parse(localStorage.getItem(HOMEWORK_STORAGE_KEY) || '[]')
}

function saveHomework(items) {
  localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(items))
}

export const e2eHomeworkRepository = {
  async list(userId) {
    return loadHomework().filter((item) => item.user_id === userId)
  },

  async create({ id = crypto.randomUUID(), userId, description, pages, dueDate }) {
    const item = {
      id,
      user_id: userId,
      description: description.trim(),
      pages: pages.trim() || null,
      due_date: dueDate,
      completed: false,
    }
    saveHomework([...loadHomework(), item])
    return item
  },

  async update(id, changes, userId) {
    let updated = null
    const items = loadHomework().map((item) => {
      if (item.id !== id || item.user_id !== userId) return item
      updated = { ...item, ...changes }
      return updated
    })
    saveHomework(items)
    return updated
  },

  async remove(id, userId) {
    saveHomework(loadHomework().filter((item) => item.id !== id || item.user_id !== userId))
  },
}

export const e2eProgressRepository = { configured: false }
export const e2eSchoolEventsRepository = { list: async () => [] }
export const e2eProblemReportRepository = { submit: async () => ({ accepted: true }) }
