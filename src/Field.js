import React from 'react'
import { FormContextConsumer } from './formHoc'
import PropTypes from 'prop-types'

class FieldWrapper extends React.Component {

  componentDidMount() {
    this.props.onFieldMount(this.props.name, this.props.validators || [])
  }

  state = {
    value: undefined,
  }

  onChange = (...args) => {
    const value = this.props.onChange.valueExtractor(...args)
    this.setState({...this.state, value})
    this.props.onFieldChange(this.props.name, this.props.dataTransformer(value))
  }

  onBlur = () => {
    if (!this.props.validators) { return }
    const failedValidator = this.props.validators.find(rule => !rule.func(this.state.value)) 
    const failed = failedValidator !== undefined
    this.props.onFieldValidation(this.props.name, !failed)
  }

  _validationFieldToValueMap = () => {
    if (this.props.reversedTrigger) {
      return !this.props.valid
    }
    return this.props.valid
  }

  render() {
    let config = {[this.props.onChange.listenTo]: this.onChange}
    if (this.props.validationTrigger) {
      config = {...config, [this.props.validationTrigger]: this._validationFieldToValueMap()}
    }
    if (this.props.onBlurValidation) {
      config = {...config, onBlur: this.onBlur}
    }
    return (
      React.cloneElement(this.props.field, config)
    )
  }
}

class Field extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.shape({
      listenTo: PropTypes.string.isRequired,
      valueExtractor: PropTypes.func.isRequired
    }).isRequired,
    validators: PropTypes.arrayOf(PropTypes.shape({
      func: PropTypes.func,
      error: PropTypes.string
    })),
    onBlurValidation: PropTypes.bool,
    validationTrigger: (props, propName, componentName) => {
      if (props.validators !== undefined && props[propName] === undefined) {
        return new Error(`${componentName}: if validators property is defined then ${propName} must be defined, too.`)      
      }
      const propType = typeof props[propName]
      if (props.validationTrigger !== undefined && propType !== 'string') {
        return new Error(`${componentName}: ${propName} property should be of the string type, intead got ${propType}`)
      }
    },
    reversedTrigger: PropTypes.bool,
    dataTransformer: PropTypes.func
  }

  static defaultProps = {
    validators: [],
    onBlurValidation: false,
    reversedTrigger: false,
    dataTransformer: value => value
  }

  getFieldState = parentState => {
    if (parentState[this.props.name] === undefined) {
      return true
    }
    return parentState[this.props.name]
  }
  
  render() {
    
    return (
      <FormContextConsumer>
        {
          ({onFieldMount, onFieldChange, getValidationState, onFieldValidation}) => {
            return (<FieldWrapper
              {...this.props}
              field={this.props.children}
              onFieldMount={onFieldMount}
              onFieldChange={onFieldChange}
              onFieldValidation={onFieldValidation}
              valid={this.getFieldState(getValidationState())}
            />)
          }
        }
      </FormContextConsumer>
    )
  }
}

export default Field