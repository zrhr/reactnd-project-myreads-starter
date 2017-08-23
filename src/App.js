import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
  booksCollection:[]

  }
  componentDidMount() {
      BooksAPI.getAll().then((booksCollection) => {
        this.setState({booksCollection })
      })
      console.log(this.state.booksCollection      )
    }

  render() {
let showingBook

    return (
      <div className="app">
<div>{this.state.booksCollection.name}</div>
<Route exact path="/" component={BookShelf}/>
<Route exact path="/search" component={SearchPage}/>


      </div>
    )
  }
}

export default BooksApp
