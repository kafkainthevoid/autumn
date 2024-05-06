import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { AmenityType } from "@prisma/client"
import Amenity from "../../modules/amenities/Amenity"

const AmenityPage = async () => {
  const user = await currentUser()

  if (!user?.id) return <div>Please login to access this site</div>

  const amenities = await db.amenity.findMany({
    where: { type: AmenityType.PURCHASABLE },
  })

  return <Amenity amenities={amenities} />
}

export default AmenityPage
