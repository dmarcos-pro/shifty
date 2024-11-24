

export type TaskProps ={
  name: string
  id: string
  category: string
  image: string
  price: number
  update: (id: string, name: string, price: number) => void
  disabled: boolean
}
