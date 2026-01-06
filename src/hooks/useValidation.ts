import { useState, useEffect } from 'react'
import { ProductType, CustomizationArea, Technique, BasicParams, DesignParams, ValidationResult, CostBreakdown } from '../state/types'

export function useValidation(
  product: ProductType,
  area: CustomizationArea[],
  technique: Technique,
  basic: BasicParams,
  design: DesignParams
) {
  const [results, setResults] = useState<ValidationResult[]>([])
  const [cost, setCost] = useState<CostBreakdown>({ base: 0, techniqueFee: 0, areaFee: 0, total: 0 })

  useEffect(() => {
    const r: ValidationResult[] = []
    let base = 0
    let techniqueFee = 0
    let areaFee = 0

    // Base price
    if (product === 't-shirt') base = 40
    if (product === 'sweatshirt') base = 80
    if (product === 'hoodie') base = 100

    // Area check
    if (product !== 'hoodie' && area.includes('hood')) {
      r.push({ state: 'reject', reason: '此产品无帽子区域', rule: 'AREA_INVALID' })
    }
    
    // Multi-area cost
    areaFee = area.length * 10 // Simplistic cost model

    // Technique check
    if (technique === 'embroidery') {
      techniqueFee = 20
      if (area.includes('back') && area.length === 1) { // Simplistic check for back area size risk
         // embroidery on back is fine, but maybe large size risk
      }
      
      if (design.colorsCount && design.colorsCount > 6) {
          r.push({ state: 'reject', reason: '刺绣颜色不能超过6色', rule: 'TECHNIQUE_LIMIT' })
      }
    } else {
      techniqueFee = 10
    }

    // Design check
    if (design.widthMm && design.widthMm > 350) {
      r.push({ state: 'reject', reason: '设计宽度超出最大限制', rule: 'SIZE_LIMIT' })
    }
    if (design.dpi && design.dpi < 150) {
      r.push({ state: 'risk', reason: 'DPI 过低，印刷可能模糊', rule: 'QUALITY_CHECK' })
    }

    setResults(r.length ? r : [{ state: 'ok', reason: '配置有效', rule: 'ALL_PASS' }])
    setCost({ base, techniqueFee, areaFee, total: base + techniqueFee + areaFee })
  }, [product, area, technique, basic, design])

  return { results, cost }
}
