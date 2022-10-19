import { Component } from 'react'
import { format } from 'date-fns'
import { Button, Image, Typography, Rate } from 'antd'
const { Title, Paragraph } = Typography

import fallbackImg from './no-image.webp'
import './cardItem.css'

export default class CardItem extends Component {
  curtailText(text) {
    const textArr = text.split(' ')
    textArr.length = 21
    let finalText = textArr.join(' ')
    finalText += ' ...'
    return finalText
  }

  render() {
    const { itemProps } = this.props
    const { title, poster_path, release_date, overview, vote_average } = itemProps
    return (
      <div className="card">
        <Image
          width={183}
          height={281}
          alt={`Постер фильма ${title}`}
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          fallback={fallbackImg}
        />
        <div className="content-wrapper">
          <div className="card-top">
            <Title className="card-title" level={4}>
              {title}
            </Title>
            <span className="movie-retting">{vote_average}</span>
          </div>
          <div className="movie-release">
            {release_date ? format(new Date(release_date), 'MMMM d, y') : 'дата релиза неизвестна'}
          </div>
          <div className="card-buttons">
            <Button className="card-btn">Action</Button>
            <Button className="card-btn">Drama</Button>
          </div>
          <div className="movie-description">
            <Paragraph className="description-text">{this.curtailText(overview)}</Paragraph>
          </div>
          <Rate className="stars-collection" count={10} allowHalf defaultValue={2.5} />
        </div>
      </div>
    )
  }
}
