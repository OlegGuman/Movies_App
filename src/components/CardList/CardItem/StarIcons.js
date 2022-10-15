import { Component } from 'react'
import { StarFilled } from '@ant-design/icons'

import './cardItem.css'

export default class StarIcons extends Component {
  render() {
    return (
      <div className="stars-collection">
        <StarFilled className="star-item active-retting" />
        <StarFilled className="star-item active-retting" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
        <StarFilled className="star-item" />
      </div>
    )
  }
}
