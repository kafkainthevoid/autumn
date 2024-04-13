import { db } from "@/lib/db"

import EditForm from "@/app/admin/(main)/amenities/components/edit-form"

const AmenityPage = async ({ params }: { params: { amenityId: string } }) => {
  const amenity = await db.amenity.findUnique({
    where: { id: params.amenityId },
  })

  return (
    <div className="p-10">
      <EditForm initialData={amenity} />
    </div>
  )
}

export default AmenityPage
