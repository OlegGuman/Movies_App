import { Component } from 'react'
import { Col, Row } from 'antd'

import CardItem from './CardItem'
import 'antd/dist/antd.min.css'
import './cardList.css'

export default class CardList extends Component {
  render() {
    const { arr } = this.props
    const items = arr.map((item) => {
      const { id } = item
      return (
        <Col span={12} key={id} className="item">
          <CardItem itemProps={item} />
        </Col>
      )
    })
    return <Row gutter={[36, 36]}>{items}</Row>
  }
}
