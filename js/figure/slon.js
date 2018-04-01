class Slon extends Figure {
    constructor(side, x, y){
        super(side, x, y);
        this.type = 'SL';
    }

    calculateCanMove(game){
        this.game = game;
        this.can_move_cel = {};

        this.checkMoveToTop(8);
        this.checkMoveBottom(8);
        this.checkMoveLeft(8);
        this.checkMoveRight(8);

        return this.can_move_cel;
    }
}
