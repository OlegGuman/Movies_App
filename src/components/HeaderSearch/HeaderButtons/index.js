import { Tabs } from 'antd'
import { Component } from 'react'

import './headerButtons.css'

const items = [
  { label: 'Search', key: 'page-1' },
  { label: 'Rated', key: 'page-2' },
]

export default class HeaderButtons extends Component {
  render() {
    const { onClickTab } = this.props
    return (
      <div className="button-group">
        <Tabs onChange={(e) => onClickTab(e)} defaultActiveKey="1" items={items} />
      </div>
    )
  }
}
