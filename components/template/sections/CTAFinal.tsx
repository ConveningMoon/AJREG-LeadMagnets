'use client'
import type { LMContent } from '@/lib/lm-content'

type CTAFinalProps = LMContent['ctaFinal']

function scrollToQuiz() {
  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
}

export function CTAFinal({ title, paragraph, ctaText, whatsappUrl, whatsappLinkText }: CTAFinalProps) {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-[940px] mx-auto px-6 text-center">
        <h2
          className="font-heading font-bold text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
        >
          {title}
        </h2>
        <p className="font-body text-white/70 text-base leading-relaxed max-w-2xl mx-auto mt-4">
          {paragraph}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollToQuiz}
            className="bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-[1.04] transition-transform duration-200 cursor-pointer"
          >
            {ctaText}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {whatsappLinkText}
          </a>
        </div>
      </div>
    </section>
  )
}
