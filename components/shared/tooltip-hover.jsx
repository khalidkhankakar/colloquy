import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

const Tooltiphover = ({iconButton=()=>{}, tooltipText=''}) => {
  return (
<TooltipProvider>
  <Tooltip>
    {/* if you provide the asChild this will submit the form */}
    <TooltipTrigger>{iconButton}</TooltipTrigger>
    <TooltipContent>
      <p className="text-sm">{tooltipText}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}

export default Tooltiphover