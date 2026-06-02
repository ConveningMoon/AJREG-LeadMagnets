import type { SubmitResult } from '@/lib/itmano'

interface ItmlanoInstance {
  submit: (payload: Record<string, unknown>) => Promise<SubmitResult | void>
}

declare global {
  interface Window {
    itmano?: ItmlanoInstance
  }
}

export {}
