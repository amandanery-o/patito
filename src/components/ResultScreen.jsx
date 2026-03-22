export default function ResultScreen({ stars, xp, correct, total, onContinue, onHome }) {
  const messages = {
    3: ['Perfeito! 🎉', 'Incrível! Você é demais! 🐥', 'Mandou muito bem!'],
    2: ['Boa! 🐥', 'Quase perfeito! Continue assim!', 'Você está arrasando!'],
    1: ['Bom esforço! 🐥', 'Você consegue! Tente novamente!', 'Continue estudando!'],
  }
  const msg = messages[stars][Math.floor(Math.random() * 3)]

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 text-center">
      <div className="text-6xl animate-bounce">🐥</div>
      <p className="text-2xl font-bold text-gray-800">{msg}</p>

      <div className="flex gap-1 text-5xl">
        {[1, 2, 3].map(s => (
          <span key={s} className={`transition-all duration-300 ${s <= stars ? 'opacity-100 scale-110' : 'opacity-20'}`}>
            ⭐
          </span>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-2xl px-8 py-4 border border-yellow-200">
        <p className="text-3xl font-bold text-yellow-600">+{xp} XP</p>
        <p className="text-sm text-gray-500 mt-1">{correct}/{total} corretas</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onContinue} className="w-full text-lg btn-duo-green">
          Continuar 🚀
        </button>
        <button onClick={onHome} className="w-full btn-duo-gray">
          Início 🏠
        </button>
      </div>
    </div>
  )
}
