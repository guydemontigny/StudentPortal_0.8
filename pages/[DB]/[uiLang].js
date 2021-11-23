import {getStaticInfo} from '../../libs/getStaticInfo'
import CentersList from '../../components/CentersList'
import Availability from '../../components/Availability'
import Skills from '../../components/Skills'
import {getCredentials, saveCredentials, saveDB, saveLocale, saveStudent, saveSkills, getCurrentTab, saveCurrentTab, 
    saveLocations, saveWasModified, saveStudentAvailabilities, getWasModifiedColor, getLocations} from '../../libs/sessionStorage'
import Login from '../../components/Login'
import {apiUrl} from '../../appConfigs/config'
import useSWR from "swr";
import LanguageNavDropDown from '../../components/LanguageNavDropDown'
import SaveAllToDR from '../../components/SaveAllToDR'
import { logout } from '../../libs/DRCodeManagement'
import React, { useState, useEffect } from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { showPortalSpinner } from '../../libs/system'
import PortalSpinner from '../../components/PortalSpinner'
//import { SSRProvider } from '@restart/ui/ssr'


export default function App(props) {
    const [currentTab, setCurrentTab] = useState(getCurrentTab())
    const [expanded, setExpanded] = useState(false)
    const [fileMenuColor, setFileMenuColor] = useState(getWasModifiedColor())
    const [showTabs, setShowTabs] = useState(getLocations.length > 0)

    useEffect(() => {
        showPortalSpinner(false)
        setFileMenuColor(getWasModifiedColor())
    })
    
    saveDB(props.DB)
    saveLocale(props.locale)
    //
    // CHECK CREDENTIALS
    //
    const credentials = getCredentials()
    if (credentials.email || credentials.cellPhone){
        const useStaleSWR = (dataKey) => {
            const revalidationOptions = {
              revalidateOnMount: true , //!cache.has(dataKey), //here we refer to the SWR cache
              revalidateOnFocus: false,
              revalidateOnReconnect: true,
            };
          
            return useSWR(
                dataKey, 
                (url) => fetch(url).then(res => res.json()))
          }

        const dhammaRegAPILogin = apiUrl()  + 'StudentLogin'
        const { data, error } = useStaleSWR(dhammaRegAPILogin + '?credentials=' + JSON.stringify(credentials))

        if (error) return (<div>An error has occurred: {error}</div>)
        if (!data) {
//            return null
        } else {
            saveCredentials(data.credentials) // Save returned credentials
            if (credentials.error) {
                // Note that credentials contains the previous data before the read
                // If, before the read, the credentials were fine (credentials.error === ''), this
                //     is a refresh. In that case, do not update data with what comes from the server.
                if (data.student) {saveWasModified(false); saveStudent(data.student)}
                if (data.studentAvailability) {saveStudentAvailabilities(data.studentAvailability)}
                if (data.locations) {saveLocations(data.locations)}
                if (data.skills) {saveSkills(data.skills)}
            }   
        }
    }

    if (getCredentials().error){
        return( 
            <Login props = {props}/>)
        }
    const T = props.T
    return(
        <div>
        <div className="row">
            <div className="col-md-12">
                <Navbar bg="dark" variant="dark" sticky="top" expanded = {expanded} expand='sm' >
                    <Navbar.Brand href="">   
                        <img src="/img/Wheel2-blue-gold.gif"
                            width="60" height="60"
                            className="d-inline-block align-top"
                            alt="Vipassana"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {setExpanded(!expanded)}}>
                        <span className="navbar-toggle-label">{T.Menu}{' '}</span>
                        <span className="navbar-toggle-icon" />
                        <img src="/img/Hamburger_icon.png"
                            width="30" height="30"
                            className="d-inline-block align-top"
                            alt=""/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"  >
                        <NavDropdown title={<span className={fileMenuColor}>{T.File}</span>}>
                            <NavDropdown.Item  href="" key='save'
                                onClick = { () => {
                                    setExpanded(false)
                                    setCurrentTab("save")
                                }}>
                                {T.Save}
                                </NavDropdown.Item>
                            <NavDropdown.Item  href="" key='save-exit'
                                onClick = { () => {
                                    setExpanded(false)
                                    setCurrentTab("saveAndExit")
                                    }}>
                                {T.SaveAndExit}
                                </NavDropdown.Item>
                            <NavDropdown.Item href="" key='exit'
                                onClick = { () => {
                                    logout()
                                    }}>
                                {T.Logout}
                                </NavDropdown.Item>
                        </NavDropdown>)
                        <Nav.Link href="" active={getCurrentTab() === 'service2centers'} 
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("service2centers")
                                saveCurrentTab("service2centers")
                                }}>
                            {T.Service2centers
                            }</Nav.Link>
                        {(showTabs || (getLocations().length >0)) && 
                          <Nav.Link href="" active={getCurrentTab() === 'skills'}
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("skills")
                                saveCurrentTab("skills")
                                }}>
                            {T.Skills}
                            </Nav.Link>}
                        {(showTabs || (getLocations().length >0)) && 
                            <Nav.Link href="" active={getCurrentTab() === 'availability'} 
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("availability")
                                saveCurrentTab("availability")
                                }}>
                            {T.Availability}
                            </Nav.Link>}
                        <LanguageNavDropDown props = {props}/>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {(getCurrentTab() === 'service2centers') && <CentersList props = {{...props, setFileMenuColor, showTabs, setShowTabs}}/>}
                {(getCurrentTab() === 'skills') && <Skills props = {{...props, setFileMenuColor}} />}
                {(getCurrentTab() === 'availability') && <Availability props = {{...props, setFileMenuColor}}/>}
                {(currentTab === 'save' || currentTab === 'saveAndExit') && <SaveAllToDR props = {{...props, setFileMenuColor, currentTab, setCurrentTab}}/>}
            </div>
        </div>
        <PortalSpinner /> 
      </div>
    )}

export async function getServerSideProps(props) {
    return(getStaticInfo(props.query.DB, props.query.uiLang, props.resolvedUrl))
  } 