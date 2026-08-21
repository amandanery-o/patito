const QUESTION_TYPES = new Set(['multipleChoice', 'matchColumns'])
const DIFFICULTIES = new Set(['easy', 'intermediate', 'challenging'])
const PROVIDERS = new Set(['edebe', 'richmond'])

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validateQuestion(question, index, errors) {
  const path = `questions[${index}]`
  if (!hasText(question.id)) errors.push(`${path}.id é obrigatório`)
  if (!QUESTION_TYPES.has(question.type)) errors.push(`${path}.type não é permitido`)
  if (!DIFFICULTIES.has(question.difficulty)) errors.push(`${path}.difficulty não é permitida`)
  if (!hasText(question.question)) errors.push(`${path}.question é obrigatória`)
  if (!hasText(question.explanation)) errors.push(`${path}.explanation é obrigatória`)
  if (!hasText(question.sourceRef?.section)) errors.push(`${path}.sourceRef.section é obrigatória`)
  if (!hasText(question.sourceRef?.pages)) errors.push(`${path}.sourceRef.pages é obrigatória`)

  if (question.type === 'multipleChoice') {
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${path}.options deve ter 4 alternativas`)
    }
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
      errors.push(`${path}.correctIndex deve apontar para uma das 4 alternativas`)
    }
    if (
      Array.isArray(question.options) &&
      new Set(question.options.map((option) => option.trim().toLowerCase())).size !== question.options.length
    ) {
      errors.push(`${path}.options não pode repetir alternativas`)
    }
  }
  if (question.type === 'matchColumns') {
    if (!Array.isArray(question.pairs) || question.pairs.length < 3 || question.pairs.length > 6) {
      errors.push(`${path}.pairs deve ter entre 3 e 6 associações`)
    } else {
      const rightItems = question.pairs.map((pair) => pair.right.trim().toLowerCase())
      if (new Set(rightItems).size !== rightItems.length)
        errors.push(`${path}.pairs não pode repetir itens da coluna direita`)
    }
  }
}

export function validateEditorialContent(content) {
  const errors = []
  const warnings = []
  if (!hasText(content.id)) errors.push('id é obrigatório')
  if (!hasText(content.subjectId)) errors.push('subjectId é obrigatório')
  if (!hasText(content.title)) errors.push('title é obrigatório')
  if (!hasText(content.summary)) errors.push('summary é obrigatório')
  if (!PROVIDERS.has(content.source?.provider)) errors.push('source.provider deve ser edebe ou richmond')
  if (!hasText(content.source?.resourceId)) errors.push('source.resourceId é obrigatório')
  if (!hasText(content.source?.version)) errors.push('source.version é obrigatória')
  if (!hasText(content.generation?.model)) errors.push('generation.model é obrigatório')
  if (!hasText(content.generation?.promptVersion)) errors.push('generation.promptVersion é obrigatória')
  if (!['draft', 'approved'].includes(content.status)) errors.push('status deve ser draft ou approved')

  if (!Array.isArray(content.questions)) errors.push('questions deve ser uma lista')
  else {
    content.questions.forEach((question, index) => validateQuestion(question, index, errors))
    const ids = content.questions.map((question) => question.id)
    if (new Set(ids).size !== ids.length) errors.push('IDs de questões devem ser únicos')
    const normalizedQuestions = content.questions
      .filter((question) => question.type === 'multipleChoice')
      .map((question) => question.question.trim().toLocaleLowerCase('pt-BR'))
    if (new Set(normalizedQuestions).size !== normalizedQuestions.length)
      errors.push('Enunciados de questões devem ser únicos')
    if (content.status === 'approved' && content.questions.length < 60)
      errors.push('conteúdo aprovado deve ter ao menos 60 questões')
    const associationCount = content.questions.filter((question) => question.type === 'matchColumns').length
    if (content.questions.length >= 60 && associationCount < 12)
      warnings.push('recomenda-se cerca de 15 questões de associação')
  }
  return { valid: errors.length === 0, errors, warnings }
}
