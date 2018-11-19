# objective 
A React HOC to easily aggregate data from a form. 

# installation

# usage example
wizard.js:
```js
<PersonForm 
  onSubmit={this.onSubmit}
  reporter={
    ({errors}) => (
      errors.map(err => (<Message key={err} error size='mini'>{err}</Message>))
    )
  }
/>
```
PersonForm.js: 
```js
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

```
# props documentation

## formHoc
| prop | type | default value | description |
| --- | --- | --- | --- |
| onSubmit | function | - | function that will be called on Submitter click |
| reporter | function as rect component | - | react component that will render validation erros; errors will be passed to it with the *errors* prop |

## Field
| prop | type | default value | description |
| --- | --- | --- | --- |
| name | string | - | is required; that's the name of field that is binded to data field that, in its turn, will be reported with the onSubmit event |
| onChange | object | { listenTo: 'onChange',valueExtractor: (...args) => { return args[0].target.value }} | defines how to listen to the control changes, wrapped with Field |
| validators | array | - | array of validation rules; each rule is shape of object with func property (functin like *value => value !== '*) and with error property - textual representation of validation error |
| onBlurValidation | boolean | false | indicates whether validation is going to be done onBlur event |
| validationTrigger | string | - | required only if validators are defined; that's a name of wrapped component prop responsible for displaying **validation failed** state of the component |
| reversedTrigger | boolen | false | indicats if the validationTrigger should be provided with reversed *valid* value; i.e. semantic controls indicate invalid state with error={true} property; the Field will hold valid={false} in its state; so with reversedTrigger the valid={false} will be transformed to error={!valid}={true} |
| dataTransformer | function | - | as a rule, wrapped controls hold their valus in string format; if there is a need to transform string into something else - dataTransformer prop should be used; i.e. dataTransformer={value => parseInt()} will pass int into the data repored with formHoc onSubmit event |


# development and demo

```
git clone ...
cd ...
npm install 
npm start
```


## to publish
if nwb isn't installed: 
```
npm install -g nwb
```
and then: 
```
nwb build-react-component
npm login
...
...
...
npm publish
```
