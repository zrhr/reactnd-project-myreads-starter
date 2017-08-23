import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookShelf extends React.Component {
constructor(props){
  super(props);


  this.state = {
  booksCollection:[]


  }
  this.updateShelf = this.updateShelf.bind(this);
}
  componentDidMount() {
      BooksAPI.getAll().then((booksCollection) => {
        this.setState({booksCollection })
      })

    }
    updateShelf = (book , shelf) => {



                console.log(`shelf: ${shelf} id: ${book}`);
                console.log(`${this.state.booksCollection}`);
                BooksAPI.update(book, shelf).then(  BooksAPI.getAll().then((booksCollection) => {
                    this.setState({booksCollection })
                  }))

        }

render(){

  return(

      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>


        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.booksCollection.map((book) => book.shelf==="wantToRead" ? (<li>
                    <div key={book.id} className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                        <select value="none"
                        onChange={ (event) => { this.updateShelf(book, event.target.value)}
                         }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">
                            Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>): (console.log("nope")))}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.booksCollection.map((book) =>  book.shelf==="currentlyReading" ? (<li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value="none"
                          onChange={ (event) => { this.updateShelf(book, event.target.value)}
                           }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.shelf}</div>
                    </div>
                  </li>): (console.log("nope")))}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.booksCollection.map((book) =>  book.shelf==="read" ? (<li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value="none"
                          onChange={ (event) => { this.updateShelf(book, event.target.value)}
                           }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>): (console.log("nope")))}</ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )}

}
export default BookShelf
