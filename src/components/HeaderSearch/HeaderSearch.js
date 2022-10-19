import { Input } from 'antd'
import { Component } from 'react'

import HeaderButtons from './HeaderButtons'

import './headerSearch.css'

export default class HeaderSearch extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: 'Type to search...',
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
        <Input value={this.state.inputValue} onChange={(e) => this.handleInput(e)} className="input-search" />
      </header>
    )
  }
}
