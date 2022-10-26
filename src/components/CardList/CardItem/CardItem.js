import { Component } from 'react'
import { format } from 'date-fns'
import { Image, Typography, Rate } from 'antd'

import { GenresConsumer } from '../../GenresContext'

const { Title, Paragraph } = Typography
import fallbackImg from './no-image.webp'
import './cardItem.css'
import GenresItem from './GenresItem'

export default class CardItem extends Component {
  curtailText(text, maxLength) {
    let finalText = ''
    const textArr = text.split(' ')
    if (textArr.length < 2) {
      finalText = textArr.join(' ')
      finalText += 'Нет описания к фильму!'
    } else {
      textArr.length = maxLength
      finalText = textArr.join(' ')
      finalText += '...'
    }

    return finalText
  }

  render() {
    const { rateMovies } = this.props
    const { id, title, poster_path, release_date, overview, vote_average, genre_ids } = this.props.itemProps
    const genresInfo = (
      <GenresConsumer>
        {(genresData) => {
          if (genresData) {
            let genre = genresData.genres
            return genre.map((item) => {
              if (genre_ids.includes(item.id)) {
                return (
                  <div className="genre-wr" key={Math.random() * 1000}>
                    <GenresItem nameProps={item.name} />
                  </div>
                )
              }
            })
          }
        }}
      </GenresConsumer>
    )

    let classParam = 'retting-svg'
    vote_average <= 3 ? (classParam += ' retting-small') : null
    vote_average > 3 && vote_average < 5 ? (classParam += ' retting-average') : null
    vote_average >= 5 && vote_average < 7 ? (classParam += ' retting-normal') : null
    vote_average >= 7 ? (classParam += ' retting-good') : null

    return (
      <div className="card">
        <Image
          className="card__img"
          alt={`Постер фильма ${title}`}
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          fallback={fallbackImg}
        />
        <div className="card-top">
          <Title title={title} className="card-title" level={5}>
            {title}
          </Title>
          <div className="movie-retting">
            <svg className={classParam} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="16" strokeWidth="2" />
            </svg>
            <span className="retting-num">{vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-release">
          {release_date ? format(new Date(release_date), 'MMMM d, y') : 'дата релиза неизвестна'}
        </div>
        <div className="genres">{genresInfo}</div>
        <div className="movie-description">
          <Paragraph title={overview} className="description-text">
            {this.curtailText(overview, 14)}
          </Paragraph>
        </div>
        <Rate
          className="stars-collection"
          onChange={(ratingCounter) => {
            rateMovies(id, ratingCounter)
          }}
          count={10}
          allowHalf
          defaultValue={0}
        />
      </div>
    )
  }
}
