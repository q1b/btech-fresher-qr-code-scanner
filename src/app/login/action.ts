'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function validatePassword(password:string) {
    (await cookies()).set('password', password)
    if(process.env.PASSWORD! === password) {
        redirect('/')
    }
}