'use client'

import { FC, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { Edit, EditIcon, MoreHorizontal, Trash, TrashIcon } from 'lucide-react'

import { toast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface CellActionProps {
  id: string
}

const CellAction: FC<CellActionProps> = ({ id }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/roomTypes/${id}`)
      toast({ description: `Room Type deleted` })
      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: 'Something went wrong' })
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <div className='flex gap-3'>
        <Button
          className='p-2 h-8 w-8 bg-emerald-600 hover:bg-emerald-600/90'
          size='sm'
          onClick={() => router.push(`${pathname}/${id}`)}
        >
          <EditIcon className='w-4 h-4 text-white' />
        </Button>

        {/* TODO: add delete later */}
        {/* {deletable && (
          <Button
            className='p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <TrashIcon className='w-4 h-4 text-white' />
          </Button>
        )} */}
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
