import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import StepperBase from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Tooltip from '@material-ui/core/Tooltip'

import outside   from '../../assets/img/stepper/outside.png'
import myDil     from '../../assets/img/stepper/myDil.png'
import cafeteria from '../../assets/img/stepper/cafeteria.png'
import classroom from '../../assets/img/stepper/classroom.png'

const styles = theme => ({
  root: {
    textAlign: 'center',
    '&>div': {
      background: 'transparent'
    }
  },
  stepsHeader: {
    marginBottom: '-10px',
    color: 'grey'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  notVisited: {
    background: 'rgba(0, 0, 0, 0.8)',
    height: '50px', 
    width: '50px', 
    padding: '5px',
    borderRadius: '30px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  visited: {
    background: '#2196f3',
    height: '50px', 
    width: '50px', 
    padding: '5px',
    borderRadius: '30px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tooltip: {
    fontSize: '15px',
  }
})

const steps = [
  {
    id: 'outside',
    tooltip: 'Aller à l\'extérieur',
    icon: outside
  }, {
    id: 'myDil',
    tooltip: 'Aller dans le laboratoire',
    icon: myDil
  }, {
    id: 'cafeteria',
    tooltip: 'Aller dans la cafétéria',
    icon: cafeteria
  }, {
    id: 'classroom',
    tooltip: 'Aller dans une salle de classe',
    icon: classroom
  }
]

const StepConnector = () => (
  <div style={{width: '100%'}}></div>
)

const StepIcon = (icon, tooltip, isVisited, classes) => (
  <Tooltip title={tooltip} placement={'top'} classes={{tooltip: classes.tooltip}}>
    <div className={isVisited ? classes.visited : classes.notVisited}>
      <img src={icon} />
    </div>
  </Tooltip>
)

class Stepper extends React.Component {
  render() {
    const { classes, handleSceneChange, activeSteps } = this.props  
    return (
      <div className={classes.root}>
        <StepperBase connector={<StepConnector />} >
          {steps.map((step, index) => (
              <Step key={step.id} >
                <StepLabel
                  onClick={() => handleSceneChange(step.id)}
                  StepIconComponent={() => StepIcon(step.icon, step.tooltip, activeSteps.includes(step.id), classes)}
                />
              </Step>
            )
          )}
        </StepperBase>
      </div>
    )
  }
}

export default withStyles(styles)(Stepper)