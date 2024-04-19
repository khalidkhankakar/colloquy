import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectInput = ({onValueChange, data=[],className='',placeholder}) => {
  return (
<Select onValueChange={onValueChange}>
  <SelectTrigger className={`${className}`}>
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    {
      data.map((item)=>{
        return <SelectItem key={item} value={item}>{item}</SelectItem>

      })
    }
      </SelectContent>
</Select>
  )
}

export default SelectInput