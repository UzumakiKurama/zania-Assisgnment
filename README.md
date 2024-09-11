# Introduction and My thought Process

Live App Link :-  <a href="https://zania-assisgnment.vercel.app/">Zania-Assigment</a>

I have applied for the React JS Frontend Developer role. 
The task itself looked a little easy at first. On my first look I figured the main features which were
+ Displaying Overlay and removing it when user enters Escape key
+ Drag and Drop
+ Storing the data on browser storage for data permeance across reloads. 

## How I approached it ?
To implement the first feature it didn't take me much time, I was stuck at one point here which was the overlay didn't close when Escape Key is pressed.
After some time I figured out that the div element was not in foucs so no keydown event is being fired, I had to manually set focus on the div element using useEffect hook

For drag and drop I had some experience with libraries like react-brautiful-dnd so I used that to implment this feature, but this library is good if we have vertical list items,
so I had to switch to react-dnd, which was fairly easy to implement, just had to follow the docs and a couple examples. 

For storing data I choose sessionStorage since I need to persist data across reloads, if I had to persist data across tabs then I would have chosen localStorage.
This was also fairly easy to implement. I wrote the logic for updating and fetching data from sessionStorage in the msw mocked api's. 
So basically we are mocking database actions.

Other small things like showing a loading spinner when image loads, for that I used a custom hook handles the logic for this. </br>
Mocking of HTTP requests was something that I did for first time.

## How to run this on your local machine ? 
1. First you have to clone this repo on your local using `git clone repo-link`
2. Install all the dependencies using `npm install`
3. Open `http://localhost:5173` to see the application.

