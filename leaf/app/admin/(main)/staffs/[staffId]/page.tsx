import { db } from "@/lib/db"
import EditForm from "../components/edit-form"

const StaffPage = async ({ params }: { params: { staffId: string } }) => {
  const staff = await db.user.findUnique({
    where: { id: params.staffId },
    include: { address: true },
  })

  return (
    <div className="p-10">
      <EditForm initialData={staff} />
    </div>
  )
}

export default StaffPage
