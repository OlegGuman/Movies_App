import { Component } from 'react'
import { Alert, Spin } from 'antd'

import 'antd/dist/antd.min.css'
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
    page: 1,
    queryParam: 1,
  }

  searchMovie = (searchValue, page = this.state.page) => {
    if (searchValue === '') {
      searchValue = 1
    }
    this.getFilms(page, searchValue)
    this.setState({
      loading: true,
      queryParam: searchValue,
    })
  }

  handlePage = (num, query = this.state.queryParam) => {
    this.getFilms(num, query)
    this.setState({
      loading: true,
      page: num,
    })
  }

  componentDidMount() {
    this.getFilms(this.state.page, this.state.queryParam)
  }

  onLoaded = (dataMovies) => {
    this.setState({
      moviesArray: dataMovies,
      loading: false,
    })
  }

  getFilms(page, query) {
    this.moviesService.getMovies(page, query).then(this.onLoaded).catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { moviesArray, loading, error } = this.state
    const { results, total_pages } = moviesArray
    const hasData = !(loading || error)
    const spin = loading ? <Spin size="large" tip="Loading..."></Spin> : null
    const cardList = hasData ? (
      <CardList
        className="card-list"
        arr={results}
        totalPage={total_pages}
        page={this.state.page}
        handlePage={this.handlePage}
      />
    ) : null
    const noContent = !(total_pages || loading) ? (
      <Alert message="Error" type="error" showIcon description="По вашему запросу не чего не найдено!" />
    ) : null
    const errorMessage = error ? (
      <Alert message="Error" type="error" showIcon description="Что-то пошло не так!" />
    ) : null
    return (
      <section className="app-wrapper">
        <HeaderSearch searchMovie={this.searchMovie} />
        {errorMessage}
        {noContent}
        {spin}
        {cardList}
      </section>
    )
  }
}
