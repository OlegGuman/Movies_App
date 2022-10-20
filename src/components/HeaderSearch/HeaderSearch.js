import { Input } from 'antd'
import { Component } from 'react'
import debounce from 'lodash/debounce'

import HeaderButtons from './HeaderButtons'

import './headerSearch.css'

export default class HeaderSearch extends Component {
  state = {
    text: '',
  }

  sendTextChange = (text) => {
    this.props.searchMovie(text)
  }

  componentDidMount() {
    this.sendTextChange = debounce(this.sendTextChange, 1000)
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value })
    this.sendTextChange(e.target.value.trim())
  }

  render() {
    return (
      <header className="header-search">
        <HeaderButtons />
        <Input
          placeholder="Type to search..."
          value={this.state.text}
          onChange={this.handleTextChange}
          className="input-search"
        />
      </header>
    )
  }
}
