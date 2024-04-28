import {  Dialog,  DialogTrigger,} from "@/components/ui/dialog"
export default function Dialogbox({iconButton, dialogBody}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{iconButton}</DialogTrigger>
      {dialogBody}
    </Dialog>
  )
}
