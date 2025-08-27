// LocalStorage
export const deleteFromLocal = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('registerEmail');
  localStorage.removeItem('code');
  localStorage.removeItem('registerCode');
};

// Base URL del backend
// La variable de entorno se inyecta en la compilación de React
// En tu archivo docker-compose.yml la definimos como REACT_APP_API_URL

// Endpoints del backend
export const getSkillsApi = `/api/getSkills`;
export const getUserSkillsApi = `/api/getUserSkills`;
export const getSolicitudesByWorkApi = `/api/getSolicitudesByWork`;
export const sendSolicitudeApi = `/api/sendSolicitude`;
export const getJobsApi = `/api/getJobs`;
export const getMySolicitudesApi = `/api/getMySolicitudes`;
export const getSolicitudesApi = `/api/getSolicitudes`;
export const registerApi = `/api/register`;
export const publishJobApi = `/api/publishJob`;
export const loginApi = `/api/login`;
export const removeSkillApi = `/api/removeSkill`;
export const addSkillApi = `/api/addSkill`;
export const logoutApi = `/api/logout`;
export const removeSolicitudeApi = `/api/removeSolicitude`;
export const getJobsBySearchApi = `/api/getJobsBySearch`;
export const getJobsByUserApi = `/api/getJobsByUser`;
export const verifyTokenApi = `/api/verifyToken`;
export const getUserApi = `/api/getUser`;
export const receiveCodeApi = `/api/receiveCode`;
export const receiveEmailCodeApi = `/api/receiveEmailCode`;
export const verifyEmailCodeApi = `/api/verifyEmailCode`;
export const verifyCodeApi = `/api/verifyCode`;
export const removeJobApi = `/api/removeJob`;
export const resetPasswordApi = `/api/resetPassword`;
export const searchSkillsApi = `/api/searchSkills`;
export const updateProfileApi = `/api/updateProfile`;
