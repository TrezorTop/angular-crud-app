export interface Environment {
  production: boolean,
}

export interface TimepadApi {
  apiUrl: string,
  apiKey: string,
  organization: {
    id: number,
    subdomain: string
  },
}

export interface TimepadEvent {
  id?: string
  organization: {
    id: number,
    subdomain: string
  },
  starts_at: string
  name: string
  categories: [
    {
      id: string,
      name: string
    }
  ],
  description_short?: string
}
