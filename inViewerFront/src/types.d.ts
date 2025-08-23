import type React from "react";

export interface Job {
  work_id: string,
  title: string,
  description: string,
  salary: number,
  name: string,
  username:string,
}

export interface NewWork {
  description: string,
  title: string,
  salary: string,
  boss: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

export interface Solicitude {
  username: string,
  name: string,
  resume_url: string,
  created_at: Date,
  solicitude_id: string,
  user_id: string,
  work_id: string
}