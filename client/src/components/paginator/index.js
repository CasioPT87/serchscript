const React = require('react')
const { useSelector } = require('react-redux')

const Paginator = ({ fetchPage, limit }) => {
  const { page, totalDocs, totalPages } = useSelector(state => {
    return state.articles.list
  })

  const firtItemIndex = (page - 1) * limit + 1
  const lastItemIndex = page * limit

  const itemsText = `Showing articles from ${firtItemIndex} to ${lastItemIndex} of ${totalDocs}`

  return (
    <div>
      {[...Array(totalPages).keys()].map(pageNumber => {
        const isCurrentPage = page === pageNumber
        const classNames = []
        if (isCurrentPage) classNames.push('isCurrent')
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
      <p>{itemsText}</p>
    </div>
  )
}

module.exports = Paginator
