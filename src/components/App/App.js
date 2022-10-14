import { Component } from 'react'

import './app.css'
import CardList from '../CardList'
import MoviesService from '../../services/services_api'

export default class App extends Component {
  moviesService = new MoviesService()

  state = {
    moviesArray: [],
  }
  constructor() {
    super()
    this.getFilms()
  }

  getFilms() {
    this.moviesService.getMovies().then((res) => {
      this.setState({
        moviesArray: res,
      })
    })
  }

  render() {
    const { moviesArray } = this.state
    return (
      <section className="app-wrapper">
        <CardList arr={moviesArray} />
      </section>
    )
  }
}
