import { z } from "zod"

export const AddPropertyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  purpose: z.enum(["rent", "sale"], {
    required_error: "Property purpose is required",
  }),
  typeId: z.coerce.number().min(1, "Type is required"),
  statusId: z.coerce.number().min(1, "Status is required"),
  location: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    region: z.string().min(1, "Region is required"),
    landmark: z.string().min(1, "Landmark is required"),
  }),
  propertyFeature: z.object({
    bedrooms: z.coerce.number().min(1, "Bedrooms is required"),
    bathrooms: z.coerce.number().min(1, "Bathrooms is required"),
    parkingSpots: z.coerce.number().min(0),
    area: z.coerce.number().min(1, "Area is required"),
    hasSwimmingPool: z.boolean().default(false),
    hasGardenYard: z.boolean().default(false),
    hasBalcony: z.boolean().default(false),
  }),
  contact: z.object({
    name: z.string().min(1, "Contact name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
  }),
})

