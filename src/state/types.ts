export type ProductType = 't-shirt' | 'sweatshirt' | 'hoodie'

export type CustomizationArea = 'front' | 'back' | 'left-sleeve' | 'right-sleeve' | 'hood'

export type Technique = 'dtg' | 'embroidery'

export type SizeOption = 'S' | 'M' | 'L' | 'XL'

export type ColorOption = 'black' | 'white' | 'gray'

export type ValidationState =
  | 'ok'
  | 'risk'
  | 'reject'
  | 'manual'

export interface BasicParams {
  size: SizeOption | null
  color: ColorOption | null
  quantity: number | null
}

export interface DesignParams {
  widthMm: number | null
  heightMm: number | null
  colorsCount: number | null
  dpi: 72 | 150 | 300 | null
  background: 'transparent' | 'opaque' | null
}

export interface ValidationResult {
  state: ValidationState
  reason: string
  rule: string
}

export interface CostBreakdown {
  base: number
  techniqueFee: number
  areaFee: number
  total: number
}
