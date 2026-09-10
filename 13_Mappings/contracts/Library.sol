// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Library {

    // custom data type grouping related book info together
    struct Book {
        string title;
        string author;
        uint bookId;
        address registrant; // who added this book - only they can update it
    }

    // a LIST of Book structs - like a numbered list, add with .push()
    Book[] public books;

    // adds a new book to the list
    // memory = temporary data location for strings passed into a function
    function addBook(string memory _title, string memory _author) public {
        books.push(Book(_title, _author, books.length, msg.sender));
    }

    // retrieves a book's title and author by its position in the array
    function get(uint _bookId) public view returns (string memory _title, string memory _author) {
        return (books[_bookId].title, books[_bookId].author);
    }

    // updates a book - ONLY the original registrant can do this
    function update(uint _bookId, string memory _newTitle, string memory _newAuthor) public {
        require(msg.sender == books[_bookId].registrant, "You must have been the one to add the book to change the record!");
        books[_bookId].title = _newTitle;
        books[_bookId].author = _newAuthor;
    }
}