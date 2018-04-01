class FigureGenerator {
    constructor(game) {
        this.game = game;

        this.generateFigureKR('white');
        this.generateFigureKR('black');

        this.generateFigureSL('white');
        this.generateFigureSL('black');
        this.generateFigureK('white');
        this.generateFigureK('black');
        this.generateFigureOF('white');
        this.generateFigureOF('black');


        this.generateFigureFR('white');
        this.generateFigureFR('black');

        this.generateFigureP('white');
        this.generateFigureP('black');
    }

    generateFigureP(side){
        let z = 7;
        if (side == 'white')
            z = 2;

        for (let i = 1; i <= 8; i ++){
            let fig = new Peshka(this.game, side, i, z);
            this.game.dom.setFigure(fig);
            this.game.board.setFigure(fig);
        }
    }
    generateFigureKR(side){
        let z = 8;
        if (side == 'white')
            z = 1;

        let x = 5;

        let fig = new Korol(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);
    }
    generateFigureFR(side){
        let z = 8;
        if (side == 'white')
            z = 1;

        let x = 4;

        let fig = new Ferz(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);
    }
    generateFigureOF(side){
        let z = 8;
        if (side == 'white')
            z = 1;

        let x = 3;

        let fig = new Ofizer(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);

        x = 6;

        fig = new Ofizer(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);
    }
    generateFigureK(side){
        let z = 8;
        if (side == 'white')
            z = 1;

        let x = 2;

        let fig = new Kon(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);

        x = 7;

        fig = new Kon(this.game, side, x, z);
        this.game.dom.setFigure(fig);
        this.game.board.setFigure(fig);
    }
    generateFigureSL(side){
        let z = 8;
        if (side == 'white')
            z = 1;

        let x = 1;
        let fig = new Slon(this.game, side, x, z);
        this.game.board.setFigure(fig);
        this.game.dom.setFigure(fig);

        x = 8;
        fig = new Slon(this.game, side, x, z);
        this.game.board.setFigure(fig);
        this.game.dom.setFigure(fig);
    }
    generateFromPeshka(x, y, side, type){
        let fig = null
        if (type == '1')
            fig = new Ferz(this.game, side, x, y);
        else if (type == '2')
            fig = new Slon(this.game, side, x, y);
        else if (type == '3')
            fig = new Ofizer(this.game, side, x, y);
        else
            fig = new Kon(this.game, side, x, y);

        this.game.board.setFigure(fig);
        this.game.dom.setFigure(fig);
    }

}
