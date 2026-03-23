import neutro from '../assets/patito-neutro.png'
import feliz from '../assets/patito-feliz.png'
import celebrando from '../assets/patito-celebrando.png'
import triste from '../assets/patito-triste.png'
import surpreso from '../assets/patito-surpreso.png'

const IMAGES = { neutro, feliz, celebrando, triste, surpreso }

// Tamanhos fixos para uso em componentes pequenos (header, cards)
const SIZES = {
  sm: 'w-14 h-14 sm:w-16 sm:h-16',
  md: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  lg: 'w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52',
  xl: 'w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64',
  // hero: ocupa a largura do container e escala com a tela
  hero: 'w-full max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto',
}

export default function Mascot({ mood = 'neutro', size = 'md', className = '' }) {
  return (
    <img
      src={IMAGES[mood] || IMAGES.neutro}
      alt={`Patito ${mood}`}
      className={`${SIZES[size] || SIZES.md} object-contain drop-shadow-md ${className}`}
    />
  )
}
