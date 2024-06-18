export interface Fighter {
  id: number
  name: string
  surname: string
  patronymic?: string
  birthday?: Date | null
  country: string
  city: string
  club?: string
  pic?: string
}
