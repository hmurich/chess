class Kon extends Figure {
    constructor(side, x, y){
        super(side, x, y);
        this.type = 'K';
    }
    calculateCanMove(game){
        this.game = game;
        this.can_move_cel = {};

        let y = parseInt(this.y);
        let x = parseInt(this.x);
        let let_x = 0;
        let let_y = 0;

        // bottom left
        let_x = x - 2;
        let_y = y - 1;
        this.specailMoveCheck(let_x, let_y);
        let_x = x - 1;
        let_y = y - 2;
        this.specailMoveCheck(let_x, let_y);

        // top left
        let_x = x - 2;
        let_y = y + 1;
        this.specailMoveCheck(let_x, let_y);
        let_x = x - 1;
        let_y = y + 2;
        this.specailMoveCheck(let_x, let_y);

        // top right
        let_x = x + 2;
        let_y = y + 1;
        this.specailMoveCheck(let_x, let_y);
        let_x = x + 1;
        let_y = y + 2;
        this.specailMoveCheck(let_x, let_y);

        // bottom right
        let_x = x + 2;
        let_y = y - 1;
        this.specailMoveCheck(let_x, let_y);
        let_x = x + 1;
        let_y = y - 2;
        this.specailMoveCheck(let_x, let_y);
    }
    specailMoveCheck(x, y){
        if (y > 0 && y < 9 && x > 0 && x < 9){
            this.move_x = x;
            this.move_y = y;
            this.initMoveCeil();
            if (this.game.board['table'][x][y] != null){
                if (!this.checkMoveCeil())
                    return false;

                this.setCanMoveCeil(x, y);
                return false;
            }
            else
                this.setCanMoveCeil(x, y);
        }
    }
}
