//
// The credentials object
//
export function getCredentials() {
    if (typeof window !== 'undefined') {
        const credentialsString = sessionStorage.getItem('credentials');
        if (credentialsString) {
            const userCredentials = JSON.parse(credentialsString);
            return userCredentials
            }
    }
    return initialCredentials()
  };
  export function saveCredentials(credentials){
    sessionStorage.setItem('credentials', JSON.stringify(credentials));
  };
  export function initialCredentials() {
    return {
      email: '',
      cellPhone: '',
      studentId: '',
      code: '',
      error: 'ERR000'
    }
  }
  export function resetCredentials(credentials) {
    const initCredentials = Object.entries(initialCredentials())
    initCredentials.map((credential) => {
      credentials[credential[0]] = credential[1]
    })
    return credentials
  }
//
// Current tab
//
export function saveCurrentTab(currentTab){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('currentTab', currentTab)
  }
}
export function getCurrentTab(){
  if (typeof window !== 'undefined') {
    const currentTab = sessionStorage.getItem('currentTab')
    if (!currentTab) {
      return 'skills'
    } else {
      return currentTab
    }
  } else {
    return 'skills'
  }
}
//
// Was modified
//
export function saveWasModified(modified){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('wasModified', modified)
  }
}
export function getWasModified(){
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('wasModified')
  }
}
export function getWasModifiedColor(){
  if (typeof window !== 'undefined') {
    return (getWasModified()==='true' ? "text-danger" : "text-muted")
  }
}
//
// Database
//
export function saveDB(DB){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('DB', DB)
  }
}
export function getDB(){
  if (typeof window !== 'undefined') {
    return(sessionStorage.getItem('DB'))
  } else {
    return ''
  }
}
//
// Current locale
//
export function saveLocale(locale){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('locale', locale)
  }
}
export function getLocale(){
  if (typeof window !== 'undefined') {
    return(sessionStorage.getItem('locale'))
  } else {
    return ''
  }
}
//
// The student table
//
export function getStudent() {
  if (typeof window !== 'undefined') {
      const studentString = sessionStorage.getItem('student');
      if (studentString) {
          const student = JSON.parse(studentString);
          return student
          }
  }
  return initialStudent()
}
export function saveStudent(student){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('student', JSON.stringify(student))
  }
}
export function initialStudent() {
  return {
    studentId: ''
  }
}
//
// The student availabilities table (clone of SQL table StudentOutreach)
//
export function getStudentAvailabilities() {
  if (typeof window !== 'undefined') {
      const studentAvailabilityString = sessionStorage.getItem('studentAvailabilities')
      if (studentAvailabilityString) {
          const studentAvailabilities = JSON.parse(studentAvailabilityString)
          return studentAvailabilities
          }
  }
  return []
}
export function saveStudentAvailabilities(studentAvailabilities){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('studentAvailabilities', JSON.stringify(studentAvailabilities))
  }
}
//
// The student skills object
//
export function getSkills() {
  if (typeof window !== 'undefined') {
      const skillsString = sessionStorage.getItem('skills');
      if (skillsString) {
          const skills = JSON.parse(skillsString);
          return skills
          }
  }
  return null
}
export function saveSkills(skills){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('skills', JSON.stringify(skills))
  }
}
export function setSkillValue(categoryId, skillId, value) {
  const skills = getSkills()
  skills[categoryId][skillId].SkillLevel = value
  saveSkills(skills)
}
//
// The location object
//
export function getLocations() {
  if (typeof window !== 'undefined') {
      const locationString = sessionStorage.getItem('locations');
      if (locationString) {
          const locations = JSON.parse(locationString);
          return locations
          }
  }
  return []
}
export function saveLocations(locations){
    sessionStorage.setItem('locations', JSON.stringify(locations))
}
export function resetLocations() {
  sessionStorage.removeItem('locations')
}

