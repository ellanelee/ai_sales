"use client"

import { useEffect} from "react"
import { authInitWithToken } from "@/services/authInit"

export function AuthInitializer() {
  useEffect(() => {
     authInitWithToken(); 
  }, [])
  return null
}
