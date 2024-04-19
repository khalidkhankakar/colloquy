import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const DateOfBirthYears =['1992', '1993', '1994', '1995', '1996', '2000', '2001','2002']
export const DateOfBrithMonths =['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
export const DateOfBrithDays =['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']

export const formGender =['Male', 'Female','Other']