import React from 'react'
import PropTypes from 'prop-types'

const FormContext = React.createContext()

const formHoc = Origin => {

  class HOC extends React.Component {

    static propTypes = {
      onSubmit: PropTypes.func,
      reporter: PropTypes.func
    }

    static defaultProps = {
      onSubmit: () => {}
    }

    state = {
      data: {},
      validationRules: {},
      validationState: {},
      errors: []
    }

    getValidationState = () => this.state.validationState

    onFieldValidation = (field, valid) => {
      this.setState(
        prevState => {
          const validationState = {...prevState.validationState, [field]: valid}
          return {...prevState, validationState}
        }
      )
    }

    onFieldChange = (field, value) => {
      const data = {...this.state.data, [field]: value}
      const validationState = {...this.state.validationState, [field]: true}
      this.setState({...this.state, data, validationState})
    }

    onFieldMount = (name, validators) => {
      this.setState(
        (prevState) => {
          const data = {...prevState.data, [name]: undefined}
          const validationRules = {...prevState.validationRules, [name]: validators} 
          const validationState = {...prevState.validationState, [name]: true}   
          return {...prevState, data, validationRules, validationState}
        }
      )      
    }

    onSubmit = () => {
      console.log('ok!!! submitting')
      const validationResult = Object.keys(this.state.data).reduce(
        (acc, key) => {
          const value = this.state.data[key]
          const validators = this.state.validationRules[key]
          const failedValidator = validators.find(validator => !validator.func(value))
          if (failedValidator !== undefined) {
            const errors = [...acc.errors, `${key} field: ${failedValidator.error}`]
            const failedFields = [...acc.failedFields, key]
            return {errors, failedFields}
          }
          return acc
        },
        {errors: [], failedFields: []}
      )
      if (validationResult.errors.length === 0) {
        this.props.onSubmit(this.state.data)
      }
      const validationState = Object.keys(this.state.validationState).reduce(
        (acc, key) => ({...acc, [key]: !validationResult.failedFields.includes(key)}),
        {}
      )
      this.setState({...this.state, errors: validationResult.errors, validationState})
    }
    
    render() {
      return (
        <FormContext.Provider
          value={{
            onFieldMount: this.onFieldMount,
            onFieldChange: this.onFieldChange,
            onSubmit: this.onSubmit,
            getValidationState: this.getValidationState,
            onFieldValidation: this.onFieldValidation
          }}
        >
          { 
            React.cloneElement(
              <Origin />
            )
          }
          {
            this.props.reporter &&
            <this.props.reporter errors={this.state.errors} />
          }
        </FormContext.Provider>
      )  
    }
  }

  return HOC
}

export default formHoc

export const FormContextConsumer = FormContext.Consumer
