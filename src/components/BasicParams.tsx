import { BasicParams, SizeOption, ColorOption } from '../state/types'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/SelectNew'
import { Input } from '../components/ui/Input'

interface Props {
  value: BasicParams
  onChange: (v: BasicParams) => void
}

export default function BasicParamsForm({ value, onChange }: Props) {
  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="px-0 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Size</label>
          <Select
            value={value.size ?? ''}
            onValueChange={val => onChange({ ...value, size: (val || null) as SizeOption | null })}
          >
            <SelectTrigger>
                <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
                {(['S', 'M', 'L', 'XL'] as SizeOption[]).map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Color</label>
          <Select
            value={value.color ?? ''}
            onValueChange={val => onChange({ ...value, color: (val || null) as ColorOption | null })}
          >
            <SelectTrigger>
                <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
                {(['black', 'white', 'gray'] as ColorOption[]).map(c => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Quantity</label>
          <Input
            type="number"
            min={1}
            value={value.quantity ?? ''}
            onChange={e => onChange({ ...value, quantity: e.target.value ? parseInt(e.target.value) : null })}
            placeholder="Enter quantity"
          />
        </div>
      </CardContent>
    </Card>
  )
}
