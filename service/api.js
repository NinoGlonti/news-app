const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
//const User = require("../models/User");
const getTopHeadlines = () => {
  return newsapi.v2.sources()
    .then(response => {
      return response;
    })
    .catch(err => {
      return console.log(err)
    })
}
const getArticles = (cat, src, lang) => {
  console.log(cat)
  return newsapi.v2.everything({
    q: cat,
    language: lang,
    // sources: src,
    sortBy: 'relevancy',
    page: 1
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log("Error", err)
    })
}
module.exports = {
  getTopHeadlines,
  getArticles
}