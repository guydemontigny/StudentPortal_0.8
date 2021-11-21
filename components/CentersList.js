import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Select from 'react-select'
import Center from 'react-center'
import {getLocations, saveLocations, getStudent} from '../libs/sessionStorage' 
import styles from '../styles/login.module.css'
import { ButtonGroup } from 'react-bootstrap'
import React, { useState } from 'react';


const CentersList = ({props})=> {
  const [selectedCenters, setSelectedCenters] = useState(getLocations())
  //
  // Format the selected center
  //
  let selectedCentersItem = selectedCenters.map((selectedCenter) => {
    return (
      <p>&nbsp;<ButtonGroup>
        <button className={styles.deletebutton} 
          onClick={() => {
            var newSelectedCenters = []
            for (var j=0; j<selectedCenters.length; j++) {
              if (selectedCenters[j].locationId !== selectedCenter.locationId){
                newSelectedCenters.push(selectedCenters[j])
              }
            }
            setSelectedCenters(newSelectedCenters)
            saveLocations(newSelectedCenters)}
          }
        >X</button>
        &nbsp;&nbsp;
        <div>
          {selectedCenter.locationId}
          {' - '}
          {selectedCenter.locationName}
          <br/>
          {selectedCenter.dhammaName}
        </div>
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
      <div>{value}{' - '}{centername}</div>
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
    props.centers.map((center) => {
      if(center[0] === key) {
        // This is the center that was selected --> add it to the list of selected centers
          const location = {
              locationId: key,
              locationName: center[1]["LocationName"],
              dhammaName: center[1]["DhammaName"],
          }
          const newSelectedCenters = selectedCenters.concat(location)
          setSelectedCenters(newSelectedCenters)
          saveLocations(newSelectedCenters)
      }
    }) 
  }

  const welcome = () => {
          return(
              <div>
              <br/>{T.Welcome}{' '}{getStudent().firstName}{' '}{getStudent().lastName}
              <br/>
              </div>
          )
  }

  return (
    <Center>
    <form className={styles.center}>
      {welcome()}
      <br/>
      <br/>
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