import { Component } from 'react'
import { Alert, Spin } from 'antd'

import 'antd/dist/antd.min.css'
import ErrorLine from '../ErrorLine'
import CardList from '../CardList'
import MoviesService from '../../services/services_api'
import './app.css'
import HeaderSearch from '../HeaderSearch'

export default class App extends Component {
  moviesService = new MoviesService()

  state = {
    moviesArray: [],
    loading: true,
    error: false,
    line: false,
    page: 1,
  }

  handlePage = (num) => {
    this.getFilms(num)
    this.setState({
      page: num,
    })
  }

  componentDidMount() {
    this.getFilms()
  }

  onLoaded = (dataMovies) => {
    this.setState({
      moviesArray: dataMovies,
      loading: false,
      line: true,
    })
  }

  getFilms(page) {
    this.moviesService.getMovies(page).then(this.onLoaded).catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { moviesArray, loading, error, line } = this.state
    const { results, total_pages } = moviesArray
    console.log(results)
    const hasData = !(loading || error)
    const spin = loading ? <Spin size="large" tip="Loading..."></Spin> : null
    const cardList = hasData ? (
      <CardList arr={results} totalPage={total_pages} page={this.state.page} handlePage={this.handlePage} />
    ) : null
    const errorLine = line ? <ErrorLine /> : null
    const errorMessage = error ? (
      <Alert message="Error" type="error" showIcon description="Что-то пошло не так!" />
    ) : null
    return (
      <section className="app-wrapper">
        <HeaderSearch />
        {errorMessage}
        {spin}
        {cardList}
        {errorLine}
      </section>
    )
  }
}
