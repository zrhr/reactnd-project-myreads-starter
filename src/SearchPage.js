import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {debounce} from 'lodash'
import {Lodash} from 'lodash'
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      booksSelection:[],
      query:'',
      empty:0
    }
  this.updateShelf = this.updateShelf.bind(this);
  }
  updateShelf = (book , shelf) => {
              console.log(`shelf: ${shelf} id: ${book}`);
              console.log(`${this.state.booksCollection}`);
              BooksAPI.update(book, shelf)
  }

  search(query) {
   console.log('debounced');
   if(query === '') {
     this.setState({booksSelection: [], empty: 1});
   } else {
     BooksAPI.search(query, 20).then(books => {
       if(books.error) {
         this.setState({booksSelection: [], empty: 1});
       } else {
         this.setState({
  booksSelection: books,
  empty:0
});
       }
     });
   }
 }

 // TODO: figure out debounce
handleChangeDebounced = debounce(this.search, 200);

updateQuery=(query) => {
  this.setState( {query:query})
}
/*onBlur=(event)=> {
    this.setState({query: event.target.value})

  }


    searchDataBase(query) {  if(query) {
   BooksAPI.getAll().then((data) => {
         BooksAPI.search(query).then((data) => {
                this.setState({
         booksSelection: data
     });
    }).catch((data) => {
    this.setState({query: "magic"})

    })
   })
  }
 }
*/
render(){
const {query}=this.state

  return(
<div className="search-books">
  <div className="search-books-bar">
    <Link to="/" className="close-search" >Close</Link>
    <div className="search-books-input-wrapper">
    <input
      type="text"
      placeholder="Search by title or author"
      value={query}
      onChange={(event) => {
        this.updateQuery(event.target.value);
        this.handleChangeDebounced(event.target.value);
      }}
    />
  {/*}      <input type="text" onBlur={this.onBlur.bind(this)}/>
    You typed: <code>{this.searchDataBase(this.state.query)}</code>
           <button onclick={this.searchDataBase("react")}>Search </button>
  <input type="text" placeholder="Search by title or author"
      value={query}
      onChange={(event) =>this.updateQuery(event.target.value)}
      />
*/}
    </div>
  </div>
  <div className="search-books-results">
    <ol className="books-grid">

      { this.state.empty!=1 ? (this.state.booksSelection.map((book) =>  <li>
        <div key={book.id} className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select   onChange={ (event) => { this.updateShelf(book, event.target.value)}
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
      </li> )): <li>Try another search</li> }
    </ol>
  </div>
</div>
)
}
}
export default SearchPage
