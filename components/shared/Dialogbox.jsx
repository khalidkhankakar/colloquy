import {  Dialog,  DialogTrigger,} from "@/components/ui/dialog"
export default function Dialogbox({iconButton, dialogBody}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{iconButton}</DialogTrigger>
      {dialogBody}
    </Dialog>
  )
}
