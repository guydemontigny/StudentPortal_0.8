import {saveStudentAvailabilities, getStudentAvailabilities, saveWasModified, 
  getWasModifiedColor} from '../libs/sessionStorage'
import {Form} from 'react-bootstrap'
import styles from '../styles/login.module.css'
import {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Availability = ({props}) => {
    const T = props.T
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dateDisabled, setDateDisabled] = useState(true)
    const [notAvailable, setNotAvailable] = useState(false)
    const [availableFromHome, setAvailableFromHome] = useState(false)
    const [availableBetweenCourses, setAvailableBetweenCourses] = useState(false)
    const [availableForChildCourses, setAvailableForChildCourses] = useState(false)
    const [availableForCourses, setAvailableForCourses] = useState(false)
    const [availableLongTerm, setAvailableLongTerm] = useState(false)
    const [availableWorkPeriod, setAvailableWorkPeriod] = useState(false)
    const [availabilityComment, setAvailabilityComment] = useState('')

    useEffect( () => {
      const studentAvailability = getStudentAvailabilities()
      setAvailableBetweenCourses(studentAvailability.SvcCenterPrep)
      setAvailableForChildCourses(studentAvailability.ForChildrens)
      setAvailableForCourses(studentAvailability.CourseSvcFull)
      setAvailableLongTerm(studentAvailability.SvcLongTerm)
      setAvailableWorkPeriod(studentAvailability.SvcPeriods)
      setAvailabilityComment(studentAvailability.StudentRemarks)
      setNotAvailable(studentAvailability.NotAvailable)
      setAvailableFromHome(studentAvailability.SvcHome)
      setStartDate(studentAvailability.AvailableLongTermFrom)
      setEndDate(studentAvailability.AvailableLongTermTo)
    }) 
    function longTermChange(e) {
      setDateDisabled(!e.target.checked)
      setStartDate(null)
      setEndDate(null)
      saveStudentAvailabilityField("SvcLongTerm", e.target.checked? 1 : 0)
      setAvailableLongTerm(!e.target.checked)
      saveStudentAvailabilityField("AvailableLongTermFrom",null)
      saveStudentAvailabilityField("AvailableLongTermTo",null)
      saveWasModified(true)
      props.setFileMenuColor(getWasModifiedColor())
      }
    function notAvailableChange(e) {
      setNotAvailable(!e.target.checked)
      saveStudentAvailabilityField("NotAvailable", e.target.checked? 1 : 0)    }
    function saveStudentAvailabilityField(fieldName, value) {
      const availabilities = getStudentAvailabilities()
      availabilities[fieldName] = value
      saveStudentAvailabilities(availabilities)
      saveWasModified(true)
      props.setFileMenuColor(getWasModifiedColor())
    }

    // The availability section is shown only if a valid center is selected

    return(
        <div>
          {<>
            <Form.Group  className={styles.body} controlId="not-available" >
              <Form.Check type="checkbox" label={T.NotAvailable} 
                checked = {notAvailable == 1}
                onChange = {(e)=>notAvailableChange(e)} />
            </Form.Group>
            <br/>
              <Form.Group  className={styles.body} controlId="work-home">
                <Form.Check type="checkbox" label={T.WorkFromHome} 
                  checked = {availableFromHome == 1}
                  disabled = {notAvailable == 1}
                  onChange = {(e)=>{saveStudentAvailabilityField("SvcHome", e.target.checked? 1 : 0)
                                    setAvailableFromHome(!e.target.checked)}}/>
                <br/>
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-on-site">
                <Form.Label size="lg">{T.WorkOnSite}</Form.Label>
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-courses">
                <Form.Check className={styles.indented} type="checkbox" label={T.Courses}
                  checked = {availableForCourses} 
                  disabled = {notAvailable == 1}
                  onChange = {(e)=>{saveStudentAvailabilityField("CourseSvcFull", e.target.checked? 1 : 0)
                                    setAvailableForCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-child-courses">
                <Form.Check className={styles.indented} type="checkbox" label={T.ChildCourses}
                  checked = {availableForChildCourses == 1}
                  disabled = {notAvailable == 1}
                  onChange = {(e)=>{saveStudentAvailabilityField("ForChildrens", e.target.checked? 1 : 0)
                                    setAvailableForChildCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-betwwen">
                <Form.Check className={styles.indented} type="checkbox" label={T.BetweenCourses}
                  checked = {availableBetweenCourses == 1}
                  disabled = {notAvailable == 1}
                  onChange = {(e)=>{saveStudentAvailabilityField("SvcCenterPrep", e.target.checked? 1 : 0)
                                    setAvailableBetweenCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-period">
                <Form.Check className={styles.indented} type="checkbox" label={T.WorkingPeriod}
                  checked = {availableWorkPeriod == 1}
                  disabled = {notAvailable == 1}
                  onChange = {(e)=>{saveStudentAvailabilityField("SvcPeriods", e.target.checked? 1 : 0)
                                    setAvailableWorkPeriod(!e.target.checked)}} />
                </Form.Group>
              <Form inline>
                <Form.Group  className={styles.body} controlId="work-long-term">
                  <Form.Check className={styles.indented} type="checkbox" label={T.LongTerm}
                    checked = {availableLongTerm == 1}
                    onChange = {(e)=>longTermChange(e)} 
                    disabled = {notAvailable == 1} />
                </Form.Group>
                <Form.Group  className={styles.body} controlId="work-long-term">
                  <DatePicker
                    dateFormat = 'yyyy-MM-dd'
                    selected={startDate ? new Date(startDate) : null}
                    disabled = {dateDisabled}
                    onChange={date => {setStartDate(date); saveStudentAvailabilityField("AvailableLongTermFrom", date)}}
                    isClearable
                    placeholderText = {T.EnterStartDate}
                    minDate = {new Date()}
                  />
                  &ensp;{T.To}&ensp;
                  <DatePicker
                    dateFormat = 'yyyy-MM-dd'
                    selected={endDate? new Date(endDate): null}
                    disabled = {dateDisabled}
                    onChange={date => {setEndDate(date); saveStudentAvailabilityField("AvailableLongTermTo", date)}}
                    isClearable
                    placeholderText = {T.EnterEndDate}
                    minDate = {startDate}
                  />
                </Form.Group>
              </Form> 
              <br/>
              <Form.Group className={styles.body} id="availabilityComment">
                  <Form.Label >{T.Comment}</Form.Label>
                  <Form.Control as="textarea" rows={5}
                      id = "availability-comment-id"
                      onChange = {(e)=>{setAvailabilityComment(e.target.value); saveStudentAvailabilityField("StudentRemarks", e.target.value)}}
                      value = {availabilityComment}/>
              </Form.Group>
            </>}
        </div>
    )
}

export default Availability