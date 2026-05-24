import { Hero }         from '@/components/sections/Hero'
import { AgentIntro }   from '@/components/sections/AgentIntro'
import { Benefits }     from '@/components/sections/Benefits'
import { Testimonials } from '@/components/sections/Testimonials'
import { QuizSection }  from '@/components/sections/QuizSection'
import { Footer }       from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <AgentIntro />
      <Benefits />
      <Testimonials />
      <QuizSection />
      <Footer />
    </main>
  )
}
