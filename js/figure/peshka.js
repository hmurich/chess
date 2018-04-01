class Peshka extends Figure {
    constructor(side, x, y){
        super(side, x, y);
        this.type = 'P';
    }
    calculateCanMove(game){
        this.game = game;
        this.can_move_cel = {};

        if (this.side == 'white'){// to top
            if (this.count_move == 0)
                this.checkMoveToTop(2, false);
            else
                this.checkMoveToTop(1, false);
        }
        else{
            if (this.count_move == 0)
                this.checkMoveBottom(2, false);
            else
                this.checkMoveBottom(1, false);
        }

        this.checkEatP();

        return this.can_move_cel;
    }
    checkEatP(x = 0, y = 0){
        if (this.side == 'white'){
            y = parseInt(this.y);
            x = parseInt(this.x);
            y++;
            x--;
            this.specaiMoveCheck(x, y);

            y = parseInt(this.y);
            x = parseInt(this.x);
            y++;
            x++;
            this.specaiMoveCheck(x, y);
        }
        else {
            y = parseInt(this.y);
            x = parseInt(this.x);
            y--;
            x--;
            this.specaiMoveCheck(x, y);

            y = parseInt(this.y);
            x = parseInt(this.x);
            y--;
            x++;
            this.specaiMoveCheck(x, y);
        }
    }

    specaiMoveCheck(x, y){
        if (y > 0 && y < 9 && x > 0 && x < 9){
            this.move_x = x;
            this.move_y = y;
            this.initMoveCeil();
            if (this.game.board['table'][x][y] != null){
                if (this.checkMoveCeil())
                    this.setCanMoveCeil(x, y);
            }
        }
    }



}
