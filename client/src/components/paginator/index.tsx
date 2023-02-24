import React from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store/state/index'

type Props = {
  fetchPage: (page: number) => void
  limit: number
}

const Paginator = ({ fetchPage, limit }: Props) => {
  const { page, totalDocs, totalPages } = useSelector((state: StoreType) => {
    return state.articles.list
  })

  const firtItemIndex = (page - 1) * limit + 1
  const lastItemIndex = Math.min(page * limit, totalDocs)

  const itemsText = `Showing articles from ${firtItemIndex} to ${lastItemIndex} of ${totalDocs}`

  return (
    <div className="paginator">
      <div className="paginator__buttons">
        {Array.from(Array(totalPages).keys()).map(pageNumber => {
          const isCurrentPage = page === pageNumber + 1
          let classNames = 'paginator__button'
          if (isCurrentPage)
            classNames = classNames.concat(' paginator__button--isCurrent')
          return (
            <button
              key={pageNumber}
              className={classNames.toString()}
              onClick={() => fetchPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          )
        })}
      </div>

      <p className="paginator__text">{itemsText}</p>
    </div>
  )
}

module.exports = Paginator
