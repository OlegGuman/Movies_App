import { Button } from 'antd'
import { Component } from 'react'

import './headerButtons.css'

export default class HeaderButtons extends Component {
  render() {
    return (
      <div className="button-group">
        <Button className="header-btn active-btn" type="text">
          Search
        </Button>
        <Button className="header-btn" type="text">
          Rated
        </Button>
      </div>
    )
  }
}
