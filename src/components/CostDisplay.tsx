import { CostBreakdown } from '../state/types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card'
import { SeparatorHorizontal } from 'lucide-react'

export default function CostDisplay({ cost }: { cost: CostBreakdown }) {
  return (
    <Card className="shadow-none border bg-muted/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Estimated Cost</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Base Item</span>
          <span>¥{cost.base}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Technique</span>
          <span>¥{cost.techniqueFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Print Area</span>
          <span>¥{cost.areaFee}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/40 p-4">
         <div className="flex w-full justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">¥{cost.total}</span>
         </div>
      </CardFooter>
    </Card>
  )
}
