import { GEOGRAPHY_SOURCE_TOPICS } from './geography-source-briefs.mjs'

export const EDITORIAL_CONFIGS = {
  'geografia-p1': {
    assessmentName: 'P1',
    subject: 'Geografia',
    subjectId: 'geografia',
    chapters: [7, 8],
    contentId: 'geografia-p1-capitulos-7-8',
    questionPrefix: 'geo-p1',
    title: 'Revisão P1 — Espaços rural e urbano',
    summary: 'Revisão dos capítulos 7 e 8: atividades econômicas dos espaços rural e urbano.',
    source: { provider: 'edebe', resourceId: 'courseware-252/chapters-7-8', version: '2024' },
    sourceTopics: GEOGRAPHY_SOURCE_TOPICS,
    contentScope:
      'capítulo 7 — atividades econômicas do espaço rural; capítulo 8 — atividades econômicas do espaço urbano',
    batches: [
      ['agricultura', 'grandes e pequenos produtores', 'agricultura orgânica'],
      ['pecuária', 'sistemas intensivo e extensivo', 'produtos da criação animal'],
      ['extrativismo', 'sustentabilidade', 'modernização do campo', 'êxodo rural'],
      ['indústria de base', 'bens intermediários', 'bens de consumo'],
      ['comércio', 'atacado e varejo', 'comércio interno e externo'],
      ['prestação de serviços', 'trabalho urbano', 'relações entre campo e cidade'],
    ],
  },
  'geografia-p2': {
    assessmentName: 'P2',
    subject: 'Geografia',
    subjectId: 'geografia',
    chapters: [11, 12],
    contentId: 'geografia-p2-capitulos-11-12',
    questionPrefix: 'geo-p2',
    title: 'Revisão P2 — População e migrações',
    summary: 'Revisão dos capítulos 11 e 12: população brasileira e fluxos migratórios.',
    source: { provider: 'edebe', resourceId: 'courseware-252/chapters-11-12', version: '2024' },
    sourceTopics: GEOGRAPHY_SOURCE_TOPICS,
    publicationOutput: 'src/data/generated/geografiaP2Content.json',
    contentScope: 'capítulo 11 — características da população brasileira; capítulo 12 — fluxos migratórios',
    batches: [
      ['demografia', 'indicadores demográficos', 'densidade demográfica'],
      ['distribuição da população brasileira', 'colonização', 'transportes', 'trabalho e clima'],
      ['setores de trabalho', 'trabalho formal e informal', 'direitos e igualdade'],
      ['migração', 'imigração', 'emigração', 'migração interna'],
      ['êxodo rural', 'migração sazonal', 'deslocamento pendular'],
      ['migrações internacionais', 'causas das migrações', 'diversidade cultural'],
    ],
  },
}

export function getEditorialConfig(name) {
  const config = EDITORIAL_CONFIGS[name]
  if (!config)
    throw new Error(`Configuração desconhecida: ${name}. Opções: ${Object.keys(EDITORIAL_CONFIGS).join(', ')}`)
  if (!config.sourceTopics?.length) throw new Error(`Fonte editorial ainda não conferida para ${name}`)
  return config
}
