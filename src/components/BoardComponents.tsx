import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponents from './CellComponents';

interface BoardProps {
    board: Board;
    currentPlayer: Player | null;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;

}

const BoardComponents: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) { // ходим по клетки по клику
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        }else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells () {
        board.highlightCells(selectedCell);
        updateBoard();

    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    useEffect(() => {
        highlightCells(); // нужно для обновления и вызова обновленной доски с указанием куда можно ходить
    }, [selectedCell])

    return (
        <div>
            <div style={{paddingBottom: '20px' }}><h2>Текущий игрок {currentPlayer?.color}</h2></div>
            <div className='board'>
                {board.cells.map((row, i) => 
                    <React.Fragment key={i}>
                        {row.map(cell => 
                                <CellComponents
                                    click={click}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} 
                                    key={cell.id} 
                                    cell={cell}
                                />
                            )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponents;