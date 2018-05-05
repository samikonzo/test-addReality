import React from 'react'
import ProjectViewer from './projectViewer'
import structs from './structures'


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      structs,
      selected: '0'
    }
    this.handleChange = this.handleChange.bind( this )
  }

  handleChange( ev ) {
    this.setState( { selected: ev.currentTarget.value } )
  }

  render() {
    const { structs, selected } = this.state
    return (
      <div>
        <header>
          <label>Структуры проекта</label>
          <select onChange={this.handleChange}>
            { structs.map( ( struct, ind ) => (
              <option key={struct} value={ind}>{ind + ' -- ' + struct}</option>
            ) ) }
          </select>
        </header>
        <div className="projectViewerWrp">
          <ProjectViewer structure={structs[ parseInt( selected, 10 ) ]} />
        </div>
      </div>
    )
  }

}
