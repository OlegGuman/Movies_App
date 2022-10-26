import { Component } from 'react'
import { Alert, Spin } from 'antd'

import 'antd/dist/antd.min.css'
import CardList from '../CardList'
import MoviesService from '../../services/services_api'
import './app.css'
import HeaderSearch from '../HeaderSearch'
import { GenresProvider } from '../GenresContext'
const moviesService = new MoviesService()

export default class App extends Component {
  state = {
    moviesArray: [],
    statusPage: 'search',
    loading: true,
    error: false,
    page: 1,
    queryParam: 'return',
    sessionId: '',
  }

  clickTab = (key) => {
    if (key === 'page-1') {
      this.getFilms(this.state.page, this.state.queryParam)
      this.setState({
        statusPage: 'search',
      })
    }
    if (key === 'page-2') {
      moviesService.getRated(this.state.sessionId).then(this.onLoaded)
      this.setState({
        statusPage: 'rated',
      })
    }
  }

  rateMovies = (movieId, rating) => {
    moviesService.rateMovie(movieId, rating, this.state.sessionId)
    localStorage.setItem(movieId, rating)
  }

  searchMovie = (searchValue, page = this.state.page) => {
    if (searchValue === '') {
      searchValue = 'return'
    }
    this.getFilms(page, searchValue)
    this.setState({
      page: 1,
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
    moviesService.getGuestSession().then((data) => {
      this.setState({
        sessionId: data.guest_session_id,
      })
      localStorage.clear()
    })
    moviesService.getGenres().then((data) => {
      this.setState({
        genresData: data,
      })
    })
  }

  onLoaded = (dataMovies) => {
    this.setState({
      moviesArray: dataMovies,
      loading: false,
    })
  }

  getFilms(page, query) {
    moviesService.getMovies(page, query).then(this.onLoaded).catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { moviesArray, loading, genresData, error } = this.state
    const { results, total_results } = moviesArray
    const hasData = !(loading || error)
    const spin = loading ? <Spin size="large" tip="Loading..."></Spin> : null
    const cardList = hasData ? (
      <CardList
        className="card-list"
        arr={results}
        totalResult={total_results}
        page={this.state.page}
        rateMovies={this.rateMovies}
        handlePage={this.handlePage}
      />
    ) : null
    const noContent = !(total_results || loading) ? (
      <Alert message="Error" type="error" showIcon description="По вашему запросу не чего не найдено!" />
    ) : null
    const errorMessage = error ? (
      <Alert message="Error" type="error" showIcon description="Что-то пошло не так!" />
    ) : null
    return (
      <GenresProvider value={genresData}>
        <section className="app-wrapper">
          <HeaderSearch
            handleStatus={this.state.statusPage}
            onClickTab={this.clickTab}
            searchMovie={this.searchMovie}
          />
          {errorMessage}
          {noContent}
          {spin}
          {cardList}
        </section>
      </GenresProvider>
    )
  }
}
