class Board {
    constructor (game) {
        this.game = game;
        this.table = {};
        let y = 8;
        while (y >= 1) {
            let x = 1;
            while (x <= 8){
                if (this['table'][x] == undefined)
                    this['table'][x] = {};

                this['table'][x][y] = null;
                x++;
            }
            y--;
        }
        this.can_move_coord= {
            'black' : {},
            'white' : {}
        };
        this.protected_coord= {
            'black' : {},
            'white' : {}
        };
        this.king_coord= {
            'black' : {
                'x':0,
                'y':0,
            },
            'white' : {
                'x':0,
                'y':0,
            }
        };
    }
    calculateCanMoveCoord(){
        delete this.can_move_coord['black'];
        delete this.can_move_coord['white'];
        this.can_move_coord['black'] = {};
        this.can_move_coord['white'] = {};

        delete this.protected_coord['black'];
        delete this.protected_coord['white'];
        this.protected_coord['black'] = {};
        this.protected_coord['white'] = {};

        for (let x = 1; x <= 8; x++){
            for (let y = 1; y <= 8; y++){
                let ceil = this.game.board.table[x][y];
                if (ceil == null)
                    continue;

                if (ceil instanceof Korol){
                    this.king_coord[ceil.side]['x'] = parseInt(x);
                    this.king_coord[ceil.side]['y'] = parseInt(y);

                    continue;
                }

                ceil.calculateCanMoveCoord();
                this.fillCanMoveCoord(ceil);
            }
        }
        this.calculateCanMoveKorol();
    }
    calculateCanMoveKorol() {
        let enemy_king = this.getKing(this.game.getEnemySide());
        let our_king = this.getKing(this.game.side);

        enemy_king.calculateCanMoveCoord();
        this.fillCanMoveCoord(enemy_king);

        our_king.calculateCanMoveCoord();
        this.fillCanMoveCoord(our_king);
    }
    fillCanMoveCoord(ceil){
        for (let x_2 in ceil.can_move_coord){
            for (let y_2 in ceil.can_move_coord[x_2]){
                if (this.can_move_coord[ceil.side][x_2] == undefined)
                    this.can_move_coord[ceil.side][x_2] = {};
                if (this.can_move_coord[ceil.side][x_2][y_2] == undefined)
                    this.can_move_coord[ceil.side][x_2][y_2] = [];

                let ar = this.can_move_coord[ceil.side][x_2][y_2];
                ar.push(ceil);
            }
        }
    }
    setFigure(figure){
        this['table'][figure.x][figure.y] = figure;
    }
    moveFigure(figure, move_x, move_y){
        this['table'][figure.x][figure.y] = null;
        this['table'][move_x][move_y] = figure;
    }
    clearCeil(x, y){
        this['table'][x][y] = null;
    }
    getKing(side){
        return this['table'][this.king_coord[side]['x']][this.king_coord[side]['y']];
    }
    get click_ceil(){
        return this['table'][this.game.action.x][this.game.action.y];
    }
    get selected_figure(){
        let x = this.game.action.selected_figure_x;
        let y = this.game.action.selected_figure_y;

        if (this['table'][x] == undefined || this['table'][x][y] == undefined){
            return null;
        }

        return this['table'][x][y];
    }
}
