import neutro from '../assets/patito-neutro.png'
import feliz from '../assets/patito-feliz.png'
import celebrando from '../assets/patito-celebrando.png'
import triste from '../assets/patito-triste.png'
import surpreso from '../assets/patito-surpreso.png'

const IMAGES = { neutro, feliz, celebrando, triste, surpreso }

const SIZES = {
  sm: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24',
  md: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
  lg: 'w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72',
  xl: 'w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80',
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
