import React, { useState, useEffect } from 'react'
import { getCredentials, getCurrentTab, getSkills, 
    saveWasModified, getWasModifiedColor, getLocations,
    getStudentAvailabilities} from '../libs/sessionStorage'
import {apiUrl} from '../appConfigs/config'
import {getDB} from '../libs/sessionStorage'
import { logout } from '../libs/DRCodeManagement'
import styles from '../styles/login.module.css'
import Center from 'react-center'
import Fade from 'react-reveal/Fade'

const SaveAllToDR = ({props}) => {
    const [errorMessageSaveStudentLocations, setErrorMessageSaveStudentLocations] = useState(null);
    const [errorMessageSaveStudentAvailabilities, setErrorMessageSaveStudentAvailabilities] = useState(null);
    const [errorMessageSaveStudentSkills, setErrorMessageSaveStudentSkills] = useState(null);
    const [fade, setFade] = useState(true)
    const T = props.T
    //
    // *** SAVE STUDENT LOCATIONS ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        fetch(apiUrl(getDB()) + 'SaveStudentLocations' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentLocations=' + JSON.stringify(getLocations()))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentLocations('SaveStudentLocations: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentLocations('SaveStudentLocations: ' + error)
                } else {
                    setErrorMessageSaveStudentLocations('SaveStudentLocations: ' + data.status)
                }
             }
             );
    }, []);
    //
    // *** SAVE STUDENT AVAILABILITIES ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        fetch(apiUrl(getDB()) + 'SaveStudentAvailabilities' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentAvailabilities=' + JSON.stringify(getStudentAvailabilities()))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentAvailabilities('SaveStudentAvailabilities: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentAvailabilities('SaveStudentAvailabilities: ' + error)
                } else {
                    setErrorMessageSaveStudentAvailabilities('SaveStudentAvailabilities: ' + data.status)
                }
             }
             );
    }, []);
    //
    // *** SAVE STUDENT SKILLS ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        const studentSkills = {}
        const skillCategories = Object.entries(getSkills())
        skillCategories.map((skillCategory) => {
            const skills = Object.entries(skillCategory[1])
            skills.map((skill) => {
                studentSkills[skill[0]] = {}
                studentSkills[skill[0]].SkillId = skill[0]
                studentSkills[skill[0]].StudentId = getCredentials().studentId
                studentSkills[skill[0]].SkillLevel = skill[1].SkillLevel
                studentSkills[skill[0]].rowid =  skill[1].rowid
            })
        })
        fetch(apiUrl(getDB()) + 'SaveStudentSkills' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentSkills=' + JSON.stringify(studentSkills))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + error)
                } else {
                    setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + data.status)
                }
             }
             );
    }, []);

    let message = ''
    let messageError1 = ''
    let messageError2 = ''
    let messageError3 = ''
    if (!errorMessageSaveStudentLocations 
        || !errorMessageSaveStudentAvailabilities
        || !errorMessageSaveStudentSkills) {
                message = T.Saving
    } else if(errorMessageSaveStudentLocations.endsWith('Success') &&
        errorMessageSaveStudentAvailabilities.endsWith('Success') &&
        errorMessageSaveStudentSkills.endsWith('Success')) {
            message = T.Success
        if (props.currentTab === "saveAndExit"){
            logout()
        } else {
            setTimeout(() => {
                setFade(false)
                props.setCurrentTab(getCurrentTab())
            }, 1000 )
            saveWasModified(false)
            props.setFileMenuColor(getWasModifiedColor())
        }
    } else {
        message = T.Error
        messageError1 = '\n' + errorMessageSaveStudentLocations
        messageError2 = '\n' + errorMessageSaveStudentAvailabilities
        messageError3 = '\n' + errorMessageSaveStudentSkills
    }
    return (
      <Center>
        <Fade when={fade}>
            <div className = {styles.saving}>
                <div className="card text-center m-1">
                    <div className="card-body">
                    <p>{message}</p>
                    <p>{messageError1}</p>
                    <p>{messageError2}</p>
                    <p>{messageError3}</p>
                    </div>
                </div>
            </div>
        </Fade>
      </Center>
    )
}

export default SaveAllToDR