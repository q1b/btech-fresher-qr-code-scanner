'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function validatePassword(password:string) {
    if(process.env.PASSWORD! === password) {
        (await cookies()).set('password', password)
        redirect('/')
    }
}