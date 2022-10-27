import { Component } from 'react'

import './genresItem.css'

export default class GenresItem extends Component {
  render() {
    const { nameProps } = this.props
    return <span className="genre-item">{nameProps}</span>
  }
}
