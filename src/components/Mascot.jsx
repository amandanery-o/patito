import neutro from '../assets/patito-neutro.png'
import feliz from '../assets/patito-feliz.png'
import celebrando from '../assets/patito-celebrando.png'
import triste from '../assets/patito-triste.png'
import surpreso from '../assets/patito-surpreso.png'

const IMAGES = { neutro, feliz, celebrando, triste, surpreso }

const SIZES = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-36 h-36',
  xl: 'w-48 h-48',
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
