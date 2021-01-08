import React from 'react'
import { connect } from 'react-redux'
import { saveStateToArchive } from '../Models/CommonFunctions/archive'
import { Programm } from '../Models/CommonFunctions/types'


function Archive(props: {state: Programm}) {
  saveStateToArchive(props.state)
  return (<></>)
}  

const mapStateToProps = (state: Programm) => ({ 
  state 
})


export default connect(mapStateToProps)(Archive)