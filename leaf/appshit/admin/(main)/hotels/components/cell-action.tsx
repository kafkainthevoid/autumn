'use client'

import { FC, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { EditIcon, TrashIcon } from 'lucide-react'

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
  deletable: boolean
}

const CellAction: FC<CellActionProps> = ({ id, deletable }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/hotels/${id}`)
      toast({ description: `Hotel deleted` })
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

        {deletable && (
          <Button
            className='p-2 h-8 w-8 bg-rose-600 hover:bg-rose-600/90'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <TrashIcon className='w-4 h-4 text-white' />
          </Button>
        )}
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
            <AlertDialogAction
              onClick={onConfirm}
              className='bg-rose-600 hover:bg-rose-600/90 text-white'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CellAction
