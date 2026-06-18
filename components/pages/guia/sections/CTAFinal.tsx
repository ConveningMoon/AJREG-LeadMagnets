'use client'

function scrollToQuiz() {
  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
}

export function CTAFinal() {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-[940px] mx-auto px-6 text-center">
        <h2
          className="font-heading font-bold text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
        >
          Esta guía es tuya, gratis, hoy.
        </h2>
        <p className="font-body text-white/70 text-base leading-relaxed max-w-2xl mx-auto mt-4">
          No importa si estás apenas explorando o listo para empezar. La guía te da el mapa
          completo para que cuando llegue el momento, ya sepas qué hacer y a quién llamar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollToQuiz}
            className="bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-[1.04] transition-transform duration-200 cursor-pointer"
          >
            Quiero mi guía gratuita →
          </button>
          <a
            href="https://wa.me/14077159052?text=Hola%20Adriana%2C%20vi%20tu%20gu%C3%ADa%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            O escríbele directamente a Adriana por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
