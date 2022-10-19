import { Component } from 'react'
import { Pagination } from 'antd'
import './footerPagination.css'

export default class FooterPagination extends Component {
  render() {
    const { handlePage, page, totalPage } = this.props
    return (
      <footer>
        <Pagination
          size="small"
          total={totalPage}
          current={page}
          onChange={(current) => handlePage(current)}
          defaultCurrent={1}
          pageSize={20}
        />
      </footer>
    )
  }
}
