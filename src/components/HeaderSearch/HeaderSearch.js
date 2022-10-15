import { Input } from 'antd'
import { Component } from 'react'

import HeaderButtons from './HeaderButtons'

import './headerSearch.css'

export default class HeaderSearch extends Component {
  constructor() {
    super()
    this.state = {
      input: 'Type to search...',
    }
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  render() {
    return (
      <header className="header-search">
        <HeaderButtons />
        <Input value={this.state.input} onChange={(e) => this.handleInput(e)} className="input-search" />
      </header>
    )
  }
}
