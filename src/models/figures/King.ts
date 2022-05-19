import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    isEmptyVerticalKing(target: Cell): boolean {
        if (this.cell.x !== target.x) {
            return false
        }
        const min = Math.min(this.cell.y, target.y);
        const max = Math.max(this.cell.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.cell.board.getCell(this.cell.x, (y - 1)).isEmpty() || !this.cell.board.getCell(this.cell.x, (y + 1)).isEmpty()) {
                return false;
            }
        }
        return true;

    }

    isEmptyHorizontalKing(target: Cell): boolean {
        if (this.cell.y !== target.y) {
            return false
        }
        const min = Math.min(this.cell.x, target.x);
        const max = Math.max(this.cell.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.cell.board.getCell(x + 1, this.cell.y).isEmpty() || !this.cell.board.getCell(x - 1, this.cell.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        if (dx === 1 && dy === 1) {
            return true;
        };

        if(this.isEmptyVerticalKing(target)) {
            return true;
        }
        if(this.isEmptyHorizontalKing(target)) {
            return true;
        }

        return false
    }
}