export const deleteFromLocal = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('registerEmail')
  localStorage.removeItem('code')
  localStorage.removeItem('registerCode')
}

export const getSkillsApi = `http://backend:3000/getSkills`
export const getUserSkillsApi = `http://backend:3000/getUserSkills`
export const getSolicitudesByWorkApi = `http://backend:3000/getSolicitudesByWork`
export const getJobsApi = `http://backend:3000/getJobs`
export const getMySolicitudesApi = `http://backend:3000/getMySolicitudes`
export const getSolicitudesApi = `http://backend:3000/getSolicitudes`
export const registerApi = `http://backend:3000/register`
export const publishJobApi = `http://backend:3000/publishJob`
export const loginApi = `http://backend:3000/login`
export const removeSkillApi = `http://backend:3000/removeSkill`
export const addSkillApi = `http://backend:3000/addSkill`
export const logoutApi = `http://backend:3000/logout`
export const removeSolicitudeApi = `http://backend:3000/removeSolicitude`
export const getJobsBySearchApi = `http://backend:3000/getJobsBySearch`
export const getJobsByUserApi = `http://backend:3000/getJobsByUser`
export const sendSolicitudeApi = `http://backend:3000/sendSolicitude`
export const verifyTokenApi = `http://backend:3000/verifyToken`
export const getUserApi = `http://backend:3000/getUser`
export const receiveCodeApi = `http://backend:3000/receiveCode`
export const receiveEmailCodeApi = `http://backend:3000/receiveEmailCode`
export const verifyEmailCodeApi = `http://backend:3000/verifyEmailCode`
export const verifyCodeApi = `http://backend:3000/verifyCode`
export const removeJobApi = `http://backend:3000/removeJob`
export const resetPasswordApi = `http://backend:3000/resetPassword`
export const searchSkillsApi = `http://backend:3000/searchSkills`
export const updateProfileApi = `http://backend:3000/updateProfile`