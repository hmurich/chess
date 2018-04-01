class Ferz extends Figure {
    get type() {
        return 'FR';
    }
    calculateCanMoveCoord(){
        this.can_move_coord = {};

        this.checkMoveToTop(8);
        this.checkMoveBottom(8);
        this.checkMoveLeft(8);
        this.checkMoveRight(8);
        this.checkMoveToTopLeft(8);
        this.checkMoveToTopRight(8);
        this.checkMoveToBottomLeft(8);
        this.checkMoveToBottomRight(8);
    }
}
