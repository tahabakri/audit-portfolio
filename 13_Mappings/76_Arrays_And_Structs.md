# 76 — Arrays and Structs

## What I Did
- Built Library.sol with a Book struct and a Book[] array
- addBook() pushes new books, get() retrieves by index,
  update() only allows the original registrant to change it

## What I Learned
- Value types (uint, bool, address) store data directly
- Reference types (arrays, strings, structs, mappings) store
  a POINTER to where the data lives
- Book[] = a numbered list of Book structs, added via .push()
- memory keyword required for reference type parameters
  (tells Solidity the data is temporary, not permanent storage)
- .length gives array size, .push() adds, .pop() removes last item

## Security Thoughts
- registrant field on each struct enables per-item access control
- require(msg.sender == books[_bookId].registrant) protects updates
- Iterating arrays in a loop can be EXPENSIVE and is generally
  discouraged for smart contracts with unbounded growth

## What Confused Me
- Struct vs Array relationship
- Struct = defines the SHAPE of one record (like a single index card:
  title, author, bookId all grouped together)
- Array = a numbered LIST holding MANY of these records
  (like a whole filing cabinet of index cards)
- You define the struct ONCE, then use an array to store
  as many of that struct as needed

  ## Locked In Definition
- Struct = a blueprint holding specific fields of data together
  (like one business card: name, phone, email)
- Array = a list holding MANY of those structs, in order
  (like a rolodex full of business cards)