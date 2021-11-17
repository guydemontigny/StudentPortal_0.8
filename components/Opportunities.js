import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { getLocation} from '../libs/sessionStorage'
import {useState} from 'react'
import CentersList from './CentersList'

const Opportunities = ({props}) => {
    const [center, setCenter] = useState(getLocation())
    return(
          <CentersList props={{...props, center, setCenter}} />
    )
}

export default Opportunities