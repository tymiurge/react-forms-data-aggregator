import React, {Component} from 'react'
import {render} from 'react-dom'

import 'semantic-ui-css/semantic.min.css'
import { Container, Segment, Grid, Message } from 'semantic-ui-react'
import PersonForm from './PersonForm'


class Demo extends Component {

  state = {
    content: ''
  }

  onSubmit = data => {
    const content = Object.keys(data).reduce(
      (acc, key) => acc + ' ' + key + ' = ' + data[key] + ',',
      ''
    )
    const message = `
    data submitted: 
    {
      ${content}
    }
    `
    this.setState({...this.state, content: message})
  }
  render() {
    return (
      <Container>
        <Segment>
          <Grid columns={2} celled>
          <Grid.Row>
            <Grid.Column>
              <PersonForm 
                onSubmit={this.onSubmit}
                reporter={
                  ({errors}) => (
                    errors.map(err => (<Message key={err} error size='mini'>{err}</Message>))
                  )
                }
              />
            </Grid.Column>
            <Grid.Column>
              { this.state.content }
            </Grid.Column>
          
        </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
