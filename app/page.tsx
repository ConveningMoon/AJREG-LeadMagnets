import { Hero }         from '@/components/sections/Hero'
import { Benefits }     from '@/components/sections/Benefits'
import { QuizSection }  from '@/components/sections/QuizSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { Footer }       from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <QuizSection />
      <Testimonials />
      <Footer />
    </main>
  )
}
