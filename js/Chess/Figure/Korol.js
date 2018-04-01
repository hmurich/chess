class Korol extends Figure {
    get type() {
        return 'KR';
    }
    calculateCanMoveCoord(){
        this.can_move_coord = {};

        this.checkMoveToTop(1);
        this.checkMoveBottom(1);
        this.checkMoveLeft(1);
        this.checkMoveRight(1);
        this.checkMoveToTopLeft(1);
        this.checkMoveToTopRight(1);
        this.checkMoveToBottomLeft(1);
        this.checkMoveToBottomRight(1);
    }
}
