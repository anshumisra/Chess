const chess=new Chess();
const socket=io();
const boardElement=document.querySelector(".chessboard");
let draggedPiece=null;
let sourceSquare=null;
let playerRole=null;

const renderBoard=()=>{
    const board=chess.board();
    boardElement.innerHTML="";

    board.forEach((row,rowIndex)=>{
        
        row.forEach((square,squareindex)=>{
            const squareElement=document.createElement("div");
            squareElement.classList.add("square",
            (rowIndex+squareindex)%2===0 ?"light":"dark");
            squareElement.dataset.row=rowIndex;
            squareElement.dataset.col=squareindex;

            if(square){
                const pieceElement=document.createElement("div");
                pieceElement.classList.add("piece",square.color==="w"?"white":"black");
            
            pieceElement.innerText=getPieceUnicode(square);
            pieceElement.draggable=playerRole===square.color;

            pieceElement.addEventListener("dragstart",(e)=>{
                if(pieceElement.draggable){
                    draggedPiece=pieceElement;
                    sourceSquare={row:rowIndex,col:squareindex};
                    e.dataTransfer.setData("text/plain","");
                }
            });

            pieceElement.addEventListener("dragend",(e)=>{
                draggedPiece=null;
                sourceSquare=null;
            });

            squareElement.appendChild(pieceElement);
        }
        squareElement.addEventListener("dragover",(e)=>{
            e.preventDefault();
        });

        squareElement.addEventListener("drop",(e)=>{
            e.preventDefault();
            if(draggedPiece){
                const targetSource={
                    row:parseInt(squareElement.dataset.row),
                    col:parseInt(squareElement.dataset.col),
                };
            
                handleMove(sourceSquare,targetSource);
            }
        })
        boardElement.appendChild(squareElement);
        });
    });
    if(playerRole==="b"){
        boardElement.classList.add("flipped");
    }
    else{
        boardElement.classList.remove("flipped");
    }
};

const handleMove=(source,target)=>{
    const move={
        from: `${String.fromCharCode(97+source.col)}${8-source.row}`,
        to:`${String.fromCharCode(97+target.col)}${8-target.row}`,
        promotion:"q",
    }
    socket.emit("move",move);
};

const getPieceUnicode=(piece)=>{
    const unicodePieces = {
        p: "♙", // White Pawn (as seen in the image)
        r: "♜",
        n: "♞",
        b: "♝",
        q: "♛",
        k: "♚",
        P: "♟", // Black Pawn (as seen in the image)
        R: "♖",
        N: "♘",
        B: "♗",
        Q: "♕",
        K: "♔",
      };
      
      return unicodePieces[piece.type] || "";
};

const checkGameOver = () => {
    if (chess.in_checkmate()) {
        alert("Checkmate! Game over.");
    } else if (chess.in_draw()) {
        alert("Draw! Game over.");
    } else if (chess.in_stalemate()) {
        alert("Stalemate! Game over.");
    } else if (chess.in_threefold_repetition()) {
        alert("Threefold repetition! Game over.");
    } else if (chess.insufficient_material()) {
        alert("Insufficient material! Game over.");
    }
};
socket.on("playerRole",(role)=>{
    playerRole=role;
    renderBoard();
});
socket.on("spectatorRole",()=>{
    playerRole=null;
    renderBoard();
});
socket.on("boardState",(fen)=>{
    chess.load(fen);
    renderBoard();
});
socket.on("move",(move)=>{
    chess.move(move);
    renderBoard();
    checkGameOver();
});

renderBoard();