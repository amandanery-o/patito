#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'

const inputPath = resolve(process.argv[2] || 'editorial/drafts/geografia-p1.json')
const outputPath = resolve(process.argv[3] || 'src/data/generated/geografiaP1Questions.json')

const overrides = {
  'geo-p1-007': {
    question: 'Uma pequena propriedade cultiva verduras e também cria galinhas. Que nome recebe a união dessas duas atividades?',
    options: ['Extrativismo', 'Agropecuária', 'Comércio', 'Prestação de serviços'],
    correctIndex: 1,
    explanation: 'Agropecuária é a união da agricultura, que cultiva o solo, com a pecuária, que cria animais.',
    sourceRef: { section: 'Agricultura e pecuária', pages: '72–73' },
  },
  'geo-p1-010': {
    question: 'Associe cada característica à atividade rural correspondente.',
    pairs: [
      { left: 'Cultivo de arroz', right: 'Agricultura' },
      { left: 'Criação de gado', right: 'Pecuária' },
      { left: 'Coleta de látex', right: 'Extrativismo vegetal' },
      { left: 'Pesca artesanal', right: 'Extrativismo animal' },
    ],
    explanation: 'Agricultura cultiva o solo, pecuária cria animais e extrativismo retira recursos que já existem na natureza.',
    sourceRef: { section: 'Agricultura, pecuária e extrativismo', pages: '72–75' },
  },
  'geo-p1-017': {
    question: 'Qual exemplo mostra uma matéria-prima fornecida pela pecuária para a indústria?',
    options: ['Areia usada na construção', 'Couro usado para fabricar calçados', 'Minério usado para produzir aço', 'Madeira usada para fabricar móveis'],
    correctIndex: 1,
    explanation: 'O couro vem da criação de animais e pode ser transformado pela indústria em calçados e bolsas.',
    sourceRef: { section: 'Pecuária', pages: '73' },
  },
  'geo-p1-019': {
    pairs: [
      { left: 'Leite', right: 'Criação de bovinos' },
      { left: 'Arroz', right: 'Cultivo do solo' },
      { left: 'Látex', right: 'Coleta da seiva de seringueiras' },
      { left: 'Lã', right: 'Criação de ovinos' },
    ],
  },
  'geo-p1-020': {
    question: 'Associe cada característica ao sistema de criação correspondente.',
    pairs: [
      { left: 'Animais confinados', right: 'Pecuária intensiva' },
      { left: 'Gado solto no pasto', right: 'Pecuária extensiva' },
      { left: 'Maior uso de tecnologia', right: 'Característica do sistema intensivo' },
      { left: 'Necessidade de áreas maiores', right: 'Característica do sistema extensivo' },
    ],
    explanation: 'A pecuária intensiva usa confinamento e mais tecnologia; a extensiva mantém os animais soltos e ocupa áreas maiores.',
    sourceRef: { section: 'Pecuária', pages: '73' },
  },
  'geo-p1-030': {
    question: 'Associe cada mudança no campo à sua consequência.',
    pairs: [
      { left: 'Uso de tratores e colheitadeiras', right: 'Produção mais rápida e eficiente' },
      { left: 'Substituição do trabalho braçal', right: 'Redução de alguns postos de trabalho' },
      { left: 'Mudança de trabalhadores para a cidade', right: 'Êxodo rural' },
      { left: 'Uso de conhecimentos técnicos', right: 'Novas oportunidades para profissionais especializados' },
    ],
    explanation: 'A modernização aumenta a eficiência, transforma o trabalho e pode contribuir para o êxodo rural.',
    sourceRef: { section: 'Trabalhadores do espaço rural', pages: '77' },
  },
  'geo-p1-058': {
    pairs: [
      { left: 'Fábrica que produz geladeiras', right: 'Atividade industrial' },
      { left: 'Loja que vende eletrodomésticos', right: 'Atividade comercial' },
      { left: 'Empresa que fornece energia elétrica', right: 'Serviço de utilidade pública' },
      { left: 'Hospital que atende pacientes', right: 'Serviço de saúde' },
    ],
  },
  'geo-p1-059': {
    question: 'Associe cada atividade ao local em que ela aparece no exemplo.',
    pairs: [
      { left: 'Cultivo de arroz em uma fazenda', right: 'Área rural de produção agrícola' },
      { left: 'Atendimento em uma escola', right: 'Área urbana de prestação de serviços' },
      { left: 'Criação de bovinos para produzir leite', right: 'Área rural de produção pecuária' },
      { left: 'Venda de produtos em uma loja', right: 'Área urbana de atividade comercial' },
    ],
  },
}

const pageOverrides = {
  'geo-p1-001': ['Agricultura', '72'],
  'geo-p1-002': ['Agricultura', '72'],
  'geo-p1-003': ['Agricultura orgânica no Brasil', '78'],
  'geo-p1-004': ['Agricultura orgânica no Brasil', '78'],
  'geo-p1-005': ['Agricultura', '72'],
  'geo-p1-006': ['Agricultura orgânica no Brasil', '78'],
  'geo-p1-008': ['Trabalhadores do espaço rural', '77'],
  'geo-p1-009': ['Agricultura, pecuária e extrativismo', '72–75'],
}

const sourceSectionOverrides = {
  'Agricultura e pecuária': 'Agricultura; Pecuária',
  'Agricultura, pecuária e extrativismo': 'Agricultura; Pecuária; Extrativismo animal, mineral e vegetal',
  'Trabalho e modernização do campo': 'Trabalhadores do espaço rural',
  'Produção e preservação': 'Agricultura orgânica no Brasil',
  'Indústria': 'Indústria: base, bens intermediários e bens de consumo',
  'Bens de consumo': 'Indústria: base, bens intermediários e bens de consumo',
  'Campo e cidade conectados': 'Prestação de serviços',
}

function rotateOptions(question) {
  if (question.type !== 'multipleChoice') return question
  const rotation = (Number(question.id.slice(-3)) - 1) % 4
  const options = question.options.map((_, index) => question.options[(index + rotation) % 4])
  return { ...question, options, correctIndex: (question.correctIndex - rotation + 4) % 4 }
}

const draft = JSON.parse(await readFile(inputPath, 'utf8'))
const questions = draft.questions.map(question => {
  const overridden = { ...question, ...overrides[question.id] }
  const page = pageOverrides[question.id]
  const referenced = page ? { ...overridden, sourceRef: { section: page[0], pages: page[1] } } : overridden
  const traceable = {
    ...referenced,
    sourceRef: {
      ...referenced.sourceRef,
      section: sourceSectionOverrides[referenced.sourceRef.section] || referenced.sourceRef.section,
    },
  }
  const difficulty = ['geo-p1-033', 'geo-p1-042', 'geo-p1-052'].includes(question.id)
    ? 'intermediate'
    : traceable.difficulty
  return rotateOptions({ ...traceable, difficulty })
})

const approved = { ...draft, status: 'approved', questions }
const validation = validateEditorialContent(approved)
if (!validation.valid) throw new Error(`Conteúdo não aprovado: ${validation.errors.join('; ')}`)

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`Banco aprovado criado em ${outputPath}`)
