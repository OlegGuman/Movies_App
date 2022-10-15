import { Component } from 'react'
import { Alert, Spin } from 'antd'

import 'antd/dist/antd.min.css'
import ErrorLine from '../ErrorLine'
import CardList from '../CardList'
import MoviesService from '../../services/services_api'
import 'react-toastify/dist/ReactToastify.css'
import './app.css'
import HeaderSearch from '../HeaderSearch'

export default class App extends Component {
  moviesService = new MoviesService()

  state = {
    loading: true,
    error: false,
    line: false,
  }

  componentDidMount() {
    this.getFilms()
  }

  onLoaded = (array) => {
    this.setState({
      moviesArray: array,
      loading: false,
      line: true,
    })
  }

  getFilms() {
    this.moviesService.getMovies().then(this.onLoaded).catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { moviesArray, loading, error, line } = this.state
    const hasData = !(loading || error)
    const spin = loading ? <Spin size="large" tip="Loading..."></Spin> : null
    const cardList = hasData ? <CardList arr={moviesArray} /> : null
    const errorLine = line ? <ErrorLine /> : null
    const errorMessage = error ? (
      <Alert message="Error" type="error" showIcon description="This is an error message about copywriting." />
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
