import React from 'react'

import { FormContextConsumer } from './formHoc'

class Submitter extends React.Component {
  render () {
    return (
      <FormContextConsumer>
        {
          ({onSubmit}) => (
            React.cloneElement(this.props.children, {onClick: onSubmit})
          )
        }
      </FormContextConsumer>
    )
  }
}

export default Submitter
