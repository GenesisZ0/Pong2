class Tableau1 extends Phaser.Scene {


    preload() {
        // carré
        this.load.image('carre', 'Asset/carre.png')
        // cercle
        this.load.image('cercle', 'Asset/cercle.png')
    }

    create() {
        this.winj1=0
        this.winj2=0
        this.hauteur = 500
        this.largeur = 1000

        // Barre du haut
        this.haut = this.physics.add.image(0, 0,'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur,20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true)
        // Barre du bas
        this.bas = this.physics.add.image(0, this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true)
        // Balle
        this.balle = this.physics.add.image(this.largeur/2, this.hauteur/2,'cercle').setOrigin(0,0);
        this.balle.setDisplaySize(20,20)
        this.balle.body.setBounce(1.1,1.1)
        //this.balle.setVelocityX(Phaser.Math.Between(200,-200))
        this.balle.setVelocityX(200||-200)
        //this.balle.setVelocityY(Phaser.Math.Between(200,-200))
        // this.balle.setVelocityY(200||-200)
        this.balle.body.setMaxVelocity(500,500)

        // Raquette droite
        this.droite = this.physics.add.image(0, this.hauteur/2-50,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20,100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.droite.body.setMaxVelocityY(200,-200)

        // Raquette gauche
        this.gauche = this.physics.add.image(this.largeur-20, this.hauteur/2-50,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setMaxVelocityY(200,-200)


        let me = this

        this.physics.add.collider(this.balle,this.bas)
        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.droite,function() {
            console.log("touche droit")
            me.rebond(me.droite)
        });
        this.physics.add.collider(this.balle,this.gauche)

        this.initKeyboard();
    }

    rebond(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)

    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // J1 = A pour allez vers le haut et Q pour allez vers le bas
                // J2 = P pour allez vers le haut et M pour allez vers le bas
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.gauche.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.gauche.setVelocityY(0)
                    break;

            }
        });
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    if(me.droite.y < me.haut.y+20){
                        me.droite.setVelocityY(0)
                    }
                    else{
                        me.droite.setVelocityY(-500)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if(me.droite.y > me.bas.y-100){
                        me.droite.setVelocityY(0)
                    }else {
                        me.droite.setVelocityY(500)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    if(me.gauche.y < me.haut.y+20){
                        me.gauche.setVelocityY(0)
                    }
                    else{
                        me.gauche.setVelocityY(-500)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    if(me.gauche.y > me.bas.y-100){
                        me.gauche.setVelocityY(0)
                    }else {
                        me.gauche.setVelocityY(500)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.winj1 = 0
                    me.winj2 = 0
                    me.balle.setVelocityY(200)
                    me.balle.setVelocityX(200)
                    break;

            }
        });

    }

    update() {
        if(this.balle.x > this.largeur){
            this.balle.x = this.largeur/2
            this.balle.y = this.hauteur/2
            this.winj1 = this.winj1 + 1
            console.log(this.winj1)
        }

        if(this.winj1 > 9){
            this.balle.x = this.largeur/2
            this.balle.y = this.hauteur/2
            this.balle.setVelocityY(0)
            console.log("je suis trop con")
        }

        if(this.balle.x < 0){
            this.balle.x = this.largeur/2
            this.balle.y = this.hauteur/2
            this.winj2 += 1
            console.log(this.winj2)
        }

        if(this.winj2 > 9){
            this.balle.x = this.largeur/2
            this.balle.y = this.hauteur/2
            this.balle.setVelocityY(0)
            console.log("je suis trop con")
        }

        if(this.balle.y < 0){
            this.balle.y = 0
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }



    }
}