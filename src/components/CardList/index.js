import { Component } from 'react'
import { Col, Row } from 'antd'

import FooterPagination from '../FooterPagination'

import CardItem from './CardItem'
import 'antd/dist/antd.min.css'
import './cardList.css'

export default class CardList extends Component {
  state = {
    colSpan: 12,
    rowGutter: [32, 32],
  }

  componentDidMount() {
    if (document.documentElement.clientWidth < 992) {
      this.setState({
        colSpan: 24,
        rowGutter: [20, 20],
      })
    } else {
      this.setState({
        colSpan: 12,
        rowGutter: [32, 32],
      })
    }

    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth < 992) {
        this.setState({
          colSpan: 24,
          rowGutter: [20, 20],
        })
      } else {
        this.setState({
          colSpan: 12,
          rowGutter: [32, 32],
        })
      }
    })
  }

  render() {
    const { arr, page, handlePage, totalResult, rateMovies } = this.props
    const { colSpan, rowGutter } = this.state
    const items = arr.map((item) => {
      const { id } = item
      return (
        <Col span={colSpan} key={id} className="item">
          <CardItem rateMovies={rateMovies} itemProps={item} />
        </Col>
      )
    })
    return (
      <>
        <Row gutter={rowGutter}>{items}</Row>
        <FooterPagination className="pagination" page={page} handlePage={handlePage} totalResult={totalResult} />
      </>
    )
  }
}
