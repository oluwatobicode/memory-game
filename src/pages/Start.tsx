import Settings from "../components/Settings";

/* 
memory-game logic
goal: to see how many matches a user can make in a given time

- for 4x4 grid (16 cards total):
- create 8 unique numbers, each appearing exactly twice
- array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
- then shuffle this array and render to the 4x4 grid
- for 6x6 grid (36 cards total):
- create 18 unique numbers, each appearing exactly twice  
- array: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18]
- then shuffle this array and render to the 6x6 grid
- the shuffled array is what gets rendered to the UI
- each card position gets one number from this shuffled array
- if the user selects a card and it is the same it stays open and a point is added to the moves made
- if the user selects a card and it is not the same it will be closed after 1 second and a point is added to the moves made
- if the user selects all the cards the game is over and the user can see the score with the time spent to match all the cards
- if the user tries to select an already matched card, it will not count as a move

also i forgot when the page renders it is not flipped by default , it is blank so when the user clicks on a card it stays if the user then click another card and it does not match they both return to the default state

- if the user click the same card twice it will not count as a move

what I will be working with:
- randomized array that returns two numbers
- shuffling the array to show on the UI
- there is no timer in the multi-player mode sha
- an array that recives two numbers :
   - if the numbers are the same it will stay open for being correct and returns a point for a move made
   - if the numbers are not the same it will close after 1 second and returns a point for a move made
- a timer to track the time spent to match all the cards
- the timer starts when the user selects the first card
- if the user selects all the cards the game is over and the user can see the score with the time spent to match all the cards
- the timer has a limit of 5 mins
- if the user matches all the cards under 5 mins he wins with a message ""you matched everything {number_of_moves_made} under 5 minutes"
- if the user does not match all the cards under 5 mins he looses with a message "you did not match everything {number_of_moves_made} under {the_number_of_matches} when the timer stopped"
*/

/* 
memory-game logic
goal: to see how many matches a user can make in a given time
if the users selects more than 2 players 
if a player1 selects two card and it is the same it stays open and a point is added to the moves made for himself
if a player1 is selects two card and it is not the same it will be closed after 1 second and a point is not added to the moves made for himself
then player 2 plays also the same way
so at the end of the game the player with highest matches wins

for the multiplaer i am thinking that when a pair is matched it is counted, if a pair is not matched it is not counted and it moves to the next player

- if the user click the same card twice it will not count as a move
*/

const Start = () => {
  return (
    <main className="flex flex-row items-center justify-center bg-[#152938] min-h-screen">
      <div className="w-fit flex flex-col items-center justify-center">
        <h1 className="text-[#FCFCFC] text-[40px] md:text-[40px]">memory</h1>
        <Settings />
      </div>
    </main>
  );
};
export default Start;
