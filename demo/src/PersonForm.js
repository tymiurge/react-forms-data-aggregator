import React from 'react'
import { formHoc, Field, Submitter } from '../../src'
import { Form, Button } from 'semantic-ui-react'
import semanticConfig from './semanticConfig'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

const ageValidationRules = [
  {
    func: value => {
      const failed = value === undefined || value === ''
      return !failed
    },
    error: 'age should not be empty.'
  }, 
  {
    func: str => {
      if (!(/^\d+$/.test(str))) {
          return false
      }
      if (/^0/.test(str)) {
          return false
      }
      return true
    },
    error: 'age must be a number'
  },
  {
    func: value => {
      const intValue = parseInt(value)
      if (intValue < 18 || intValue > 121) { return false }
      return true
    },
    error: 'age must be between 18 and 121'
  }
]

const PersonForm = props => (
  <Form>

    <Form.Group widths='equal'>

      <Field {...semanticConfig('input', 'firstName')}>
        <Form.Input fluid label='First name' placeholder='First name' />
      </Field>
      <Field {...semanticConfig('input', 'lastName')}>
        <Form.Input fluid label='Last name' placeholder='Last name' />
      </Field>
      <Field {...semanticConfig('select', 'gender')}>
        <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
      </Field>
    </Form.Group>
    <Form.Group widths='equal'>
      <Field {...semanticConfig('input', 'age', ageValidationRules)} dataTransformer={value => parseInt(value)}>
        <Form.Input fluid label='Age' placeholder='Age' />
      </Field>
    </Form.Group>

    <Submitter>
      <Button>Submit</Button>
    </Submitter>

  </Form>
)

export default formHoc(PersonForm)
