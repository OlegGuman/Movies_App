import { Tabs } from 'antd'
import { Component } from 'react'

import './headerButtons.css'

const items = [
  { label: 'Search', key: 'item-1' },
  { label: 'Rated', key: 'item-2' },
]

export default class HeaderButtons extends Component {
  render() {
    return (
      <div className="button-group">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    )
  }
}

// const items = [
//   { label: 'Tab 1', key: 'item-1', children: 'Content 1' }, // remember to pass the key prop
//   { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
// ];
