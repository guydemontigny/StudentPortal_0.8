import {getCredentials, saveCredentials, initialCredentials } from './sessionStorage'
import {apiUrl} from '../appConfigs/config'

function flushDRCode(studentId){
    fetch(`${apiUrl()}DrLogout?studentId=${studentId}`)
}

export function resendDRCode(){
    const credentials = getCredentials()
    credentials.code = "resend"
    saveCredentials(credentials)
    flushDRCode(credentials.studentId)
    window.location.reload(false)
}
    
export function logout(){
    if (typeof window !== 'undefined') {
        const studentId = getCredentials().studentId
        const credentials = initialCredentials()
        credentials.error = "ERR020 Logout"
        saveCredentials(credentials)
        sessionStorage.removeItem ('locations')
        sessionStorage.removeItem ('skills')
        sessionStorage.removeItem ('studentAvailabilities')
        sessionStorage.removeItem ('student')
        sessionStorage.removeItem ('currentTab')
        flushDRCode(studentId)
        window.location.reload(false)
    }
}