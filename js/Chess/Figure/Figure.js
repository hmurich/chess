class Figure {
    constructor(game, side, x, y){
        this.game = game;
        this.side = side;
        this.x = x;
        this.y = y;

        this.count_move = 0;
    }
    addMoveCoord(x, y, can_eat = true){
        if (y < 1 || y > 8 || x < 1 || x > 8)
            return false;

        if (this.game.board['table'][x][y] != null && this.game.board['table'][x][y].side == this.side){
            if (can_eat)
                this.addProtectedCoord(x, y);
            return false;
        }

        if (this.game.board['table'][x][y] != null && !can_eat)
            return false;

        if (this instanceof Korol){
            let enemy_side = this.game.getEnemySide();

            if (this.game.board.can_move_coord[enemy_side][x] != undefined && this.game.board.can_move_coord[enemy_side][x][y] != undefined){
                let enemy_figures = this.game.board.can_move_coord[enemy_side][x][y];
                let can = true;
                enemy_figures.forEach(function(figure) {
                    if (!(figure instanceof Peshka))
                        can = false;
                });
                if (!can)
                    return false;
            }

            if (this.game.board.protected_coord[enemy_side][x] != undefined && this.game.board.protected_coord[enemy_side][x][y] != undefined)
                return false;
        }

        if (this.can_move_coord[x]== undefined)
            this.can_move_coord[x] = {};

        this.can_move_coord[x][y] = 1;

        if (this.game.board['table'][x][y] != null)
            return false;

        return true;
    }
    addProtectedCoord(x, y){
        if (this.game.board.protected_coord[this.side][x]== undefined)
            this.game.board.protected_coord[this.side][x] = {};

        this.game.board.protected_coord[this.side][x][y] = 1;
    }
    checkMoveToTop(max_step, can_eat = true){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y++;
            if (!this.addMoveCoord(x, y, can_eat))
                break;
        }
    }
    checkMoveBottom(max_step, can_eat = true){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            if (!this.addMoveCoord(x, y, can_eat))
                break;
        }
    }
    checkMoveLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            x--;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }
    checkMoveRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            x++;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }
    checkMoveToTopLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x);
        for (let i = 1; i <= max_step; i++){
            y++;
            x--;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }
    checkMoveToTopRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y++;
            x++;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }
    checkMoveToBottomLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            x--;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }
    checkMoveToBottomRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            x++;
            if (!this.addMoveCoord(x, y))
                break;
        }
    }

}
