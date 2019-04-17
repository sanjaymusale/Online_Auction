# Online Auction

# Overview
Online Auction is a Live Bidding platform built on ReactJS, ExpressJs and Node, where users can bid for any Products. This provides user to add his product along with the images , Once the Product get Approval from Admin , user can provide Date and Time for the Bidding Event to occur, User can bid live on other Products available for Bidding, The code in this repository covers front end and back end of this project.

# Dependencies and installation
*  ### Front End ###
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. axios `npm install --save axios`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. react `npm create-react-app`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. react-router-dom `npm install --save react-router-dom`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. socket.io-client `npm i socket.io-client`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5. redux `npm i redux`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6. react-redux `npm i react-redux`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7. moment `npm i moment`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8. material-ui/core `npm i @material-ui/core`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9. material-ui/icons `npm i @material-ui/icons`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10. material-table `npm i material-table`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11. material-ui-pickers `npm i material-ui-pickers`<br/>

*  ### Back End ###
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. cors `npm i cors`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. express `npm i express`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. mongoose `npm  mongoose`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. nodemon `npm i nodemon`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5. socket-io `npm i socket-io`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6. multer `npm i multer`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7. bcryptjs `npm i bcryptjs`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8. jsonwebtoken `npm i jsonwebtoken`<br/>

# Usage
## `create, edit and delete Product` ##

* Products
  * See the list of Products, to see more about each Product click on details.
* Add Product
  * Add a new Product to be listed for auctioning, with the Description and Images of the Product
* Edit Product
  * Change the Product Description,Name and Category
* Delete Product
  * Can Delete the Product
  
## `add date and time slot for auctioning` ##
* Add Date and Time
  * Each product is made available a time slot during which the product will be available for Bidding
  
## `current bidding` ##
* Live Bidding for the Product
  * Each product is made available for Bidding during its alloted date and Time.
* Enter the Bidding room
  * By clicking the `Enter Bidding room` Button user gets access to the Bidding page
* Place Bid
  * Enter the price at which u want to bid the Product, Other Users also Bid at the same moment
* Declare The Winner
  * After the provided time frame gets over the bidding stops and the winner of the Bid is Declared
  
# Author

 * Sanjay Musale



