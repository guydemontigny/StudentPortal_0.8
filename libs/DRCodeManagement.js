import {getCredentials, saveCredentials, initialCredentials } from './sessionStorage'
import {apiUrl} from '../appConfigs/config'

function flushDRCode(studentId, code){
    fetch(`${apiUrl()}DrLogout?studentId=${studentId}&code=${code}`)
}

export function resendDRCode(){
    const credentials = getCredentials()
    const code = credentials.code
    credentials.code = "resend"
    saveCredentials(credentials)
    flushDRCode(credentials.studentId, code)
    window.location.reload(false)
}
    
export function logout(){
    if (typeof window !== 'undefined') {
        const studentId = getCredentials().studentId
        const code = getCredentials().code
        const credentials = initialCredentials()
        credentials.error = "ERR020 Logout"
        saveCredentials(credentials)
        sessionStorage.removeItem ('locations')
        sessionStorage.removeItem ('skills')
        sessionStorage.removeItem ('studentAvailabilities')
        sessionStorage.removeItem ('student')
        sessionStorage.removeItem ('currentTab')
        flushDRCode(studentId, code)
        window.location.reload(false)
    }
}