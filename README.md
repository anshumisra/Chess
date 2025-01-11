# Chess Game

![ss](/image.png)

This is a web-based chess game built using JavaScript, HTML, and CSS. It uses the `chess.js` library for game logic and `socket.io` for real-time communication between players.

## Features

- Play chess against another player in real-time.
- Visual representation of the chessboard and pieces.
- Handles various game-ending conditions such as checkmate, draw, stalemate, threefold repetition, and insufficient material.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/chess-game.git
    cd chess-game
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Drag and drop pieces to make a move.
- The game will automatically check for game-ending conditions and display a popup if the game is over.

## File Structure

- [public](http://_vscodecontentref_/0)
  - `index.html`: The main HTML file.
  - `styles.css`: The CSS file for styling the chessboard and pieces.
  - `js/`
    - [chessgame.js](http://_vscodecontentref_/1): The main JavaScript file containing the game logic.
- `server.js`: The Node.js server file.

## Dependencies

- [chess.js](http://_vscodecontentref_/2): A JavaScript library for chess game logic.
- [socket.io](http://_vscodecontentref_/3): A library for real-time web applications.

## License

This project is licensed under the MIT License. See the LICENSE file for details.