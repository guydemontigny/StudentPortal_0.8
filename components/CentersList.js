import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Select from 'react-select'
import Center from 'react-center'
import { getLocation, saveLocation, getStudent, resetLocation} from '../libs/sessionStorage' 
import styles from '../styles/login.module.css'
import { ButtonGroup } from 'react-bootstrap'
import React, { useState } from 'react';


const CentersList = ({props})=> {
  const initialSelectedCenters = [
    {locationName: 'Vipassana center one', dhammaName: 'Dhamma Suttama', locationId: 'QVC'},
    {locationName: 'Vipassana center two', dhammaName: 'Dhamma Dhara', locationId: 'VMC'},
  ]
  const [selectedCenters, setSelectedCenters] = useState(initialSelectedCenters)
  let selectedCentersItem = selectedCenters.map((selectedCenter) => {
    return (
      <p>&nbsp;<ButtonGroup>
        <button className={styles.deletebutton} onClick={() => {
        var newSelectedCenters = []
        for (var j=0; j<selectedCenters.length; j++) {
          if (selectedCenters[j].locationId !== selectedCenter.locationId){
            newSelectedCenters.push(selectedCenters[j])
          }
        }
        setSelectedCenters(newSelectedCenters)}}
      >X</button>
      &nbsp;&nbsp;<div>{selectedCenter.locationName}<br/>{selectedCenter.dhammaName}</div>
      </ButtonGroup></p>
    )
  })
    //
    // *** SETUP THE CENTERS DROP-DOWN
    //
    const T = props.T
    const centerList = []
    props.centers.map((center) => {
      var isSelected = false
      for(var j=0; j<selectedCenters.length; j++) {
        if (selectedCenters[j].locationId === center[0]) {isSelected = true}
      }
      if (!isSelected){
        centerList.push({value: center[0], 
                         label: center[1]["LocationName"] + ', ' + center[1]["DhammaName"], 
                         dhammaname: center[1]["DhammaName"],
                         centername: center[1]["LocationName"]})
      }})
    const centerListItemFormat = ({ value, label, dhammaname, centername, index }) => (
      <div style={{ textAlign: "left" }}>
        <div>{centername}</div>
        <div style={{ color: "#aaa" }}>
          {dhammaname}
        </div>
      </div>
    )
    const centerListControlStyle = {
      control: base => ({
        ...base,
        height: 60
      })
    } 
    //
    // When a new center is selected
    //
    function handleCenterChange(e) {
        const key = e.value // The center id
        let locationFound = false
        props.centers.map((center) => {
            if(center[0] === key) {
              // This is the center that was selected --> add it to the list of selected centers
                const location = {
                    locationId: key,
                    locationName: center[1]["LocationName"],
                    dhammaName: center[1]["DhammaName"],
                }
                setSelectedCenters(selectedCenters.concat(location))
                saveLocation(location)
                props.setCenter(getLocation())
                locationFound = true
            }
        }) 
        if (!locationFound) {
            resetLocation()
            props.setCenter(getLocation())
        }
    }
    // The welcome block is shown only if a valid center is selected  
    const welcome = () => {
        if (props.center.locationId) {
            return(
                <div>
                <br/>{T.Availability}{' '}{T.Of}{' '}{getStudent().firstName}{' '}{getStudent().lastName}
                <br/>
                </div>
            )
        } else {
            return null
        }
    }
    const plsSelectCenter = () => {
        if (!props.center.locationId) {
            return(
                <div>
                    <label htmlFor="centerList" className="form-label">{T.Center}</label>
                </div>
            )
        } else {
            return null
        }
      }

    return (
      <Center>
      <form className={styles.center}>
      {welcome()}
        <br/>
        <br/>
        {plsSelectCenter()}
        <Select options={centerList}
                onChange = {(e)=>handleCenterChange(e)} 
                formatOptionLabel = {centerListItemFormat}
                maxMenuHeight = {400}
                placeholder = {T.Center}
                styles={centerListControlStyle}
                value = ''
        />
      <ButtonGroup vertical className={styles.body}>
        &nbsp;
        {selectedCentersItem}
      </ButtonGroup>
      </form>
      </Center>


    )
}

export default CentersList