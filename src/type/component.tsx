export type BtnProps = {
  size?: string
  color?: string
  icon?: boolean
  noborder?: boolean
  rotate?: boolean
  url?: string
  children: React.ReactNode
}

export type IconProps = {
  value: string
  children?: React.ReactNode
}

export type LinkProps = {
  default?: boolean
  url: string
  children: React.ReactNode
  className?: React.ReactNode
}

export type ProgressBarProps = {
  start: number
  end: number
  color: string
}

export type ServicesProps = {
  id: 'branding' | 'digital' | 'motion'
  index: number
  category: string
  price?: string,
  availability?: number,
  name?: string
  isNew: string
  monthly?: string
  order?: number
}

export type ServiceAnim = {
  box: boolean
}

export type HeadingProps = {
  tag: string
  content: string
  className?: string
}
export type HeaderSubMenuItem = {
  name: string
  id: string
}
export type HeaderSubMenu = {
  active: boolean
  top: number | null
  left: number | null
  width: number | null
  size: number | null
  items: any[]
}

export type HeaderService = {
  id: string
  name: string
  category: string
  title: string
  resume: string
  content_title: string
  content_text: string
  picture_url: string
  picture_type: string
}

export type HeaderNav = {
  category: string
  submenu: boolean
  name: string
  id: number
  link: string
}
export type HeaderSubMenuMap = {
  id: string
  name: string
}

export type HeroBannerProject = {
  id: string
  brand: string
  url: string
}

export type FeedbackContainer = {
  text: string
  who: string
  job: string
  brand: string
}

export type FooterService = {
  id: string
  name: string
}

export type FooterNav = {
  id: string
  name: string
  link: string
  category: string
}

export type ModalProps = {
  update: (boolean: boolean) => void
  children: React.ReactNode
}

export type PresentationRefs = {
  box: React.RefObject<HTMLDivElement>
  cta: React.RefObject<HTMLDivElement>
}

export type ProjectsProps = {
  brand: string
  id: string
  category: string[]
  url: string
  main: boolean
  desc: { 
    title: string, 
    result: {text: string}[]
  }[]
}

export type ProjectsRefs = {
  title: React.RefObject<HTMLDivElement>
}
