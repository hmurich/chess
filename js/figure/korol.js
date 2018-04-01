class Korol extends Figure {
    constructor(side, x, y){
        super(side, x, y);
        this.type = 'KR';
    }
    calculateCanMove(game){
        this.game = game;
        this.can_move_cel = {};

        this.checkMoveToTop(1);
        this.checkMoveBottom(1);
        this.checkMoveLeft(1);
        this.checkMoveRight(1);
        this.checkMoveToTopLeft(1);
        this.checkMoveToTopRight(1);
        this.checkMoveToBottomLeft(1);
        this.checkMoveToBottomRight(1);

        return this.can_move_cel;
    }
}
