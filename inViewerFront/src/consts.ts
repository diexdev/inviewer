export const deleteFromLocal = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('registerEmail')
  localStorage.removeItem('code')
  localStorage.removeItem('registerCode')
}

export const getSkillsApi = `http://localhost:4000/getSkills`
export const getUserSkillsApi = `http://localhost:4000/getUserSkills`
export const getSolicitudesByWorkApi = `http://localhost:4000/getSolicitudesByWork`
export const getJobsApi = `http://localhost:4000/getJobs`
export const getMySolicitudesApi = `http://localhost:4000/getMySolicitudes`
export const getSolicitudesApi = `http://localhost:4000/getSolicitudes`
export const registerApi = `http://localhost:4000/register`
export const publishJobApi = `http://localhost:4000/publishJob`
export const loginApi = `http://localhost:4000/login`
export const removeSkillApi = `http://localhost:4000/removeSkill`
export const addSkillApi = `http://localhost:4000/addSkill`
export const logoutApi = `http://localhost:4000/logout`
export const removeSolicitudeApi = `http://localhost:4000/removeSolicitude`
export const getJobsBySearchApi = `http://localhost:4000/getJobsBySearch`
export const getJobsByUserApi = `http://localhost:4000/getJobsByUser`
export const sendSolicitudeApi = `http://localhost:4000/sendSolicitude`
export const verifyTokenApi = `http://localhost:4000/verifyToken`
export const getUserApi = `http://localhost:4000/getUser`
export const receiveCodeApi = `http://localhost:4000/receiveCode`
export const receiveEmailCodeApi = `http://localhost:4000/receiveEmailCode`
export const verifyEmailCodeApi = `http://localhost:4000/verifyEmailCode`
export const verifyCodeApi = `http://localhost:4000/verifyCode`
export const removeJobApi = `http://localhost:4000/removeJob`
export const resetPasswordApi = `http://localhost:4000/resetPassword`
export const searchSkillsApi = `http://localhost:4000/searchSkills`
export const updateProfileApi = `http://localhost:4000/updateProfile`