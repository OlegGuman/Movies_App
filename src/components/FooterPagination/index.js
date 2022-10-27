import { Component } from 'react'
import { Pagination } from 'antd'
import './footerPagination.css'

export default class FooterPagination extends Component {
  render() {
    const { handlePage, page, totalResult } = this.props
    return (
      <footer>
        <Pagination
          current={page}
          onChange={(current) => handlePage(current)}
          defaultCurrent={1}
          size="small"
          total={totalResult}
          pageSize={20}
          showSizeChanger={false}
        />
      </footer>
    )
  }
}
