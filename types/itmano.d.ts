interface ItmlanoInstance {
  submit: (payload: Record<string, unknown>) => Promise<void>
}

declare global {
  interface Window {
    itmano?: ItmlanoInstance
  }
}

export {}
