import type { Request, Response } from "express"
import { Models } from "../models/models.js"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { validateUser, validateRegister } from "../validations/zod.js"

const errorMap: Record<string, number> = {
  InvalidTypes: 400,
  UserNotFound: 404,
  RepeatedUser: 400,
  ConnectionError: 500,
  EmptyData: 404
}

function throwError(message: string, name: string, res: Response) {
  const status = errorMap[name] || 400
  return res.status(status).json({ message })
}

export class Controllers {
  static sendCode = async (req:Request, res:Response) => {
    const { email } = req.body

    try {   
      const sentcode = await Models.sendCode(email)
      return res.status(200).json({ message: sentcode?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static verifyCode = async (req:Request, res:Response)  => {
    const { code, email } = req.body

    try {
      const verification = await Models.verifyCode(code, email)
      res.status(200).json({ message: verification?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static resetPassword = async (req:Request, res:Response) =>  {
    const { code, email, newPassword } = req.body

    try {
      const resetState = await Models.resetPassword(email, code, newPassword)
      return res.status(200).json({ message : resetState?.message})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static login = async (req:Request, res:Response) => {
    const result = validateUser(req.body)

    if(result.error) {
      const error = JSON.parse(result.error.message)[0].message
      return res.status(400).json({ message: error })
    }

    const { username, password } = req.body

    try {
      const logged = await Models.login(username, password)
      if(!logged) return res.status(404).json({ message: 'not found'})
      const token = jwt.sign(logged, 'jhjhjhjhjhkhyjfbtuftfty', { expiresIn: '1h' })
      res.cookie('access_token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
      })
      res.status(200).json({ user: logged })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getUser = async (req:Request, res:Response) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json({ message: 'No token' })

    try {
      const payload = jwt.verify(token, 'jhjhjhjhjhkhyjfbtuftfty') as JwtPayload & { user_id : string }
      const id = payload.user_id
      const user = await Models.getUser(id)
      res.status(200).json(user)
    } catch {
      res.status(403).json({ message: 'Token inválido' })
    }
  }

  static verify = (req:Request, res:Response) => {
    res.status(200).json({ user: (req as any).user })
  }

  static logout = (req:Request, res:Response) => {
    res.clearCookie('access_token', {
      httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    res.status(200).json({ message: 'Logged out successfully' })
  }

  static sendEmailCode = async (req:Request, res:Response) => {
    const { email } = req.body

    try { 
      const insertEmailRegister = await Models.sendEmailCode(email)
      return res.status(200).json({ message: insertEmailRegister?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static verifyEmailCode = async (req:Request, res:Response) => {
    const { email, code } = req.body

    try {
      const verifyCode = await Models.verifyEmailCode(email, code)
      return res.status(200).json({ message: verifyCode?.message})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static register = async (req:Request, res:Response) => {
    const result = validateRegister(req.body)

    if(result.error) {
      const error = JSON.parse(result.error.message)[0].message
      return res.status(400).json({ message: error })
    }

    const { name, username, password, email, birthdate:cumple, code } = req.body
    const birthdate = new Date(cumple)

    try {
      const registered = await Models.register({ name, username, password, email, birthdate, code})
      if(!registered) return res.status(400).json({ message: 'error' })
        res.status(200).json({ message: 'created succesfully'})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getWorks = async (req:Request, res:Response) => {
    try {
      const works = await Models.getWorks()
      return res.status(200).json({ data: works })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static publishWork = async (req:Request, res:Response) =>  {
    const { description, boss, title} = req.body

    const salary = parseFloat(req.body.salary)

    try {
      const insertJob = await Models.publishWork({description, salary, boss, title})
      return res.status(200).json({ message: insertJob?.message})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static sendSolicitude = async (req:Request, res:Response) => {
    const { work_id, user_id } = req.body
    const cv_url = req.file?.path
    if(!cv_url) return res.status(400).json({ message: 'Share your curriculum' })
    try {
      const postSolicitude = await Models.sendSolicitude({ work_id, user_id, cv_url })
      return res.status(200).json({ message: postSolicitude?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getSolicitudesByWork = async (req:Request, res:Response) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ message: 'Invalid data' })
    try {
      const solicitudes = await Models.getSolicitudesByWork({ id })
      return res.status(200).json({ data: solicitudes})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static addSkills = async (req:Request, res:Response) => {
    const { user_id, skill_id } = req.body
    if(!user_id || !skill_id) return res.status(400).json({ message: 'No data provided' })

    try { 
      const addSkill = await Models.addSkills({ user_id , skill_id })
      return res.status(200).json({ message: addSkill })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static removeSkill = async (req:Request, res:Response) => {
    const { user_id, skill_id } = req.body
    if(!user_id || !skill_id) return res.status(400).json({ message: 'No data provided' })

    try { 
      const remSkill = await Models.removeSkill({ user_id , skill:skill_id })
      return res.status(200).json({ message: remSkill })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static searchSkill = async (req:Request, res:Response) => {
    const { search } = req.params
    if(!search) return res.status(400).json({ message: 'Empty search not allowed' })

    try {
      const skills = await Models.searchSkills(search)
      return res.status(200).json({ data: skills })
    } catch (e: any) {
      throwError(e.message, e.name, res)
    }
  }

  static getWorksBySearch = async (req:Request, res:Response) => {
    const { search } = req.params
    if(!search) return res.status(400).json({ message: 'No Search Available'})

    try {
      const jobs = await Models.getWorksBySearch({ search })
      return res.status(200).json({ data: jobs })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static removeSolicitude = async (req:Request, res:Response) => {
    const { work_id, user_id } = req.body
    if(!work_id || !user_id) return res.status(400).json({ message: 'No data provided' })

    try {
      const remSolicitud = await Models.removeSolicitude({ work_id, user_id })
      return res.status(200).json({ message: remSolicitud })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getSKillsByUser = async (req:Request, res:Response) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ message: 'no data provided' })
    try {
      const skills = await Models.getSkillsByUser({ id })
      return res.status(200).json({ data: skills})
    } catch (e: any) {
      throwError(e.message, e.name, res)
    }
  }

  static getSkills = async (req:Request, res:Response) => {
    try {
      const skills = await Models.getSkills()
      return res.status(400).json({ data: skills})
    } catch (e: any) {
      throwError(e.message, e.name, res)
    }
  }

  static getJobsByUser = async (req:Request, res:Response) => {
    const { id } = req.params

    if(!id) return res.status(400).json({ message: 'No data provided'})

    try {
       const works = await Models.getWorksByUser({ id })
       return res.status(200).json({ data: works })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static removeJob = async (req:Request, res:Response) => {
    const { id } = req.params

    if(!id) return res.status(400).json({ message: 'No data provided' })

    try { 
      const remove = await Models.removeJob({ id })
      return res.status(200).json({ message: remove?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getMySolicitudes = async (req:Request, res:Response) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ message: 'Invalid data' })
    try {
      const solicitudes = await Models.getMySolicitudes({ id })
      return res.status(200).json({ data: solicitudes})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static getSolicitudes = async (req:Request, res:Response) => {
    try {
      const solicitudes = await Models.getSolicitudes()
      return res.status(200).json({ data: solicitudes})
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }

  static updateProfile = async (req:Request, res:Response) => {
    const { name, username, user_id } = req.body

    if(!name || !username || !user_id) return res.status(400).json({ message: 'Data incomplete' })

    try {
      const updated = await Models.updateProfile(name, username, user_id)
      return res.status(200).json({ message: updated?.message })
    } catch (e:any) {
      throwError(e.message, e.name, res)
    }
  }
}