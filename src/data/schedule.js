// Horário da Turma 43 — tarde (13h30–17h10)
// day: 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab

export const SUBJECT_COLORS = {
  'Língua Portuguesa':  { bg: 'bg-blue-100',   text: 'text-blue-800',   dot: '#3B82F6' },
  'Educação Física':    { bg: 'bg-orange-100',  text: 'text-orange-800', dot: '#F97316' },
  'Língua Inglesa':     { bg: 'bg-purple-100',  text: 'text-purple-800', dot: '#8B5CF6' },
  'Matemática':         { bg: 'bg-green-100',   text: 'text-green-800',  dot: '#22c55e' },
  'Ciências':           { bg: 'bg-teal-100',    text: 'text-teal-800',   dot: '#0D9488' },
  'História':           { bg: 'bg-amber-100',   text: 'text-amber-800',  dot: '#F59E0B' },
  'Arte':               { bg: 'bg-pink-100',    text: 'text-pink-800',   dot: '#EC4899' },
  'Geografia':          { bg: 'bg-lime-100',    text: 'text-lime-800',   dot: '#84CC16' },
  'Ensino Religioso':   { bg: 'bg-yellow-100',  text: 'text-yellow-800', dot: '#EAB308' },
  'Laboratório':        { bg: 'bg-cyan-100',    text: 'text-cyan-800',   dot: '#06B6D4' },
  'Robótica':           { bg: 'bg-red-100',     text: 'text-red-800',    dot: '#EF4444' },
}

// quinzenal: true → Robótica alterna com a outra matéria nas quartas
export const SCHEDULE = {
  1: [ // Segunda-feira
    { time: '13h30', subject: 'Língua Portuguesa' },
    { time: '14h20', subject: 'Educação Física' },
    { time: '15h10', subject: 'Língua Portuguesa' },
    { time: '16h20', subject: 'Geografia' },
    { time: '17h10', subject: 'Geografia' },
  ],
  2: [ // Terça-feira
    { time: '13h30', subject: 'Língua Portuguesa' },
    { time: '14h20', subject: 'Laboratório' },
    { time: '15h10', subject: 'Língua Inglesa' },
    { time: '16h20', subject: 'Matemática' },
    { time: '17h10', subject: 'Matemática' },
  ],
  3: [ // Quarta-feira
    { time: '13h30', subject: 'Educação Física' },
    { time: '14h20', subject: 'Ciências' },
    { time: '15h10', subject: 'Ciências' },
    { time: '16h20', subject: 'Robótica/Matemática', quinzenal: true },
    { time: '17h10', subject: 'Robótica/Matemática', quinzenal: true },
  ],
  4: [ // Quinta-feira
    { time: '13h30', subject: 'Língua Portuguesa' },
    { time: '14h20', subject: 'Língua Portuguesa' },
    { time: '15h10', subject: 'História' },
    { time: '16h20', subject: 'História' },
    { time: '17h10', subject: 'Arte' },
  ],
  5: [ // Sexta-feira
    { time: '13h30', subject: 'Língua Inglesa' },
    { time: '14h20', subject: 'Língua Inglesa' },
    { time: '15h10', subject: 'Matemática' },
    { time: '16h20', subject: 'Matemática' },
    { time: '17h10', subject: 'Ensino Religioso' },
  ],
}

export const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
export const DAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
