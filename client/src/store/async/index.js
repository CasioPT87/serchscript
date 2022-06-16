
const { addArticles } = require('../actions')

const fetchArticles = async (dispatch, getState) => {
    console.log('fetchArticles!!!')
    let articles
    articles = getState().articles
    if (!articles) {
        const response = fetch('http://localhost:8880/data/articles')
        const resposeData = await response.json()
        console.log('resposeData', resposeData)
        dispatch(addArticles(resposeData))
    }
}

module.exports = {
    fetchArticles
}