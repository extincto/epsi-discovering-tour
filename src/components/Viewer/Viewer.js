import React, { Component } from 'react'
import { Pannellum } from 'pannellum-react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Swal from 'sweetalert2'

import getScene from './scenes'
import getHotspots from './hotspots'

import '../../assets/css/animate.css'
import '../../assets/css/customAnimations.css'
import '../../assets/css/customPanellum.css'
import './../../App.css'

const openModal = (params) => {
  Swal(Object.assign({}, params, {
    target: '.pnlm-render-container',
    animation: false,
    customClass: 'animated fadeIn'
  }))
}

const styles = theme => ({
  progress: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: 'calc(40% - 20px)'
  }
})

class Viewer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      sceneKey: 'outside',
      firstScene: true
    }
    
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(hotspotId) {
    const hotspot = getHotspots(this.state.sceneKey).find(hotspot => hotspot.id === hotspotId)
    if(hotspot.nextScene) {
      this.props.handleSceneChange(hotspot.nextScene)
      this.setState({sceneKey: hotspot.nextScene, firstScene: false})
      return
    }
    
    if(hotspot.modal) {
      openModal(hotspot.modal)
      return
    }
  }

  render() {
    const { firstScene } = this.state
    const { sceneKey, classes } = this.props
    const scene = getScene(sceneKey)
    return (
      <div style={{background: 'black', height: '500px'}}>
        <CircularProgress className={classes.progress} />
        <Pannellum
          id={firstScene ? '0' : sceneKey}
          width="100%"
          height="100%"
          image={scene.path}
          pitch={-10.429402860937797}
          yaw={-1.0780267425584553}
          hfov={140}
          title={scene.title}
          autoLoad
          showFullscreenCtrl
          orientationOnByDefault
        >
          {getHotspots(sceneKey).map(hotspot => (
              <Pannellum.Hotspot
                type="custom"
                pitch={hotspot.pitch}
                yaw={hotspot.yaw}
                name={hotspot.name}
                cssClass={hotspot.type}
                handleClick={(evt, name) => this.handleClick(name)}
                handleClickArg={hotspot.id}
                key={`${sceneKey}-${hotspot.id}`}
              />
          ))}
        </Pannellum>
      </div>
    )
  }
}

export default withStyles(styles)(Viewer)