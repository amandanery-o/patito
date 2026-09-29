import historyP1Content from './generated/historiaP1Content.json'

export const HISTORY_TOPICS =
  historyP1Content.status === 'approved'
    ? [
        {
          id: 'historia-p1-colonizacao-migracoes',
          title: 'Revisão P1 — Colonização e migrações para o Brasil',
          chapter: '9 e 10',
          reviewLabel: 'Revisão para a P1',
          summary: historyP1Content.summary,
          source: historyP1Content.source,
          summarySections: [
            {
              title: 'Antes da chegada dos portugueses',
              text: 'Diversos povos originários já habitavam o território do atual Brasil muito antes de 1500. Eles formavam muitas etnias, com línguas, costumes e modos de vida diferentes. Por isso, a colonização não representa o início da história humana nessas terras.',
            },
            {
              title: 'Colonização e exploração',
              text: 'Os portugueses chegaram em 1500 e passaram a explorar riquezas, como o pau-brasil. O contato e a colonização alteraram profundamente a vida dos povos originários, que sofreram violência, doenças e escravização.',
            },
            {
              title: 'Diáspora africana',
              text: 'Milhões de africanos foram retirados à força de suas terras, separados de suas famílias e escravizados em outras regiões. Esse grande deslocamento forçado é chamado de diáspora africana.',
            },
            {
              title: 'Resistência e heranças culturais',
              text: 'Pessoas escravizadas resistiram de diversas maneiras. O sincretismo ajudou a preservar práticas religiosas, e os quilombos tornaram-se comunidades organizadas de proteção e resistência. Culturas indígenas e africanas deixaram marcas importantes na língua e na sociedade brasileira.',
            },
            {
              title: 'Imigração para o Brasil',
              text: 'No século XIX, guerras, pobreza, falta de terras e oportunidades de trabalho levaram muitos europeus ao Brasil. Alemães, italianos e ucranianos formaram comunidades e preservaram costumes, ao mesmo tempo que participaram da construção da cultura brasileira.',
            },
            {
              title: 'Outros povos e contribuições',
              text: 'Sírios e libaneses destacaram-se em atividades comerciais e contribuíram para a culinária. Japoneses chegaram em 1908 e trouxeram costumes, técnicas agrícolas e conhecimentos. Cada povo contribuiu de maneiras diversas, sem formar uma cultura única ou parada no tempo.',
            },
            {
              title: 'Migrações atuais e direitos',
              text: 'As pessoas ainda migram em busca de segurança e melhores condições de vida. Refugiados precisam deixar seus países diante de ameaças e situações perigosas. Migrantes e refugiados têm direito à dignidade, ao respeito e ao acolhimento.',
            },
          ],
          keyIdeas: [
            'Povos originários já viviam no território antes de 1500.',
            'A colonização trouxe exploração, violência, doenças e escravização.',
            'Diáspora africana foi um deslocamento forçado, não uma viagem voluntária.',
            'Sincretismo e quilombos foram formas de resistência.',
            'Imigrantes vieram por diferentes motivos e ajudaram a transformar a cultura brasileira.',
            'Migrantes e refugiados devem ser recebidos com respeito e dignidade.',
          ],
          questions: historyP1Content.questions,
        },
      ]
    : []
