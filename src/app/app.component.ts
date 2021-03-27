import { Component } from '@angular/core';

interface Pole {
  statusPole: string;
  stav: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Battleship';
  start = false;
  postitionDefault: Pole | null | undefined;
  countLod = 0;
  countHitLode = 0;
  game: Pole[] = [
    {statusPole: 'voda', stav: false}, {statusPole: 'lod', stav: false}, {statusPole: 'voda', stav: false},
    {statusPole: 'lod', stav: false}, {statusPole: 'lod', stav: false}, {statusPole: 'voda', stav: false},
    {statusPole: 'voda', stav: false}, {statusPole: 'voda', stav: false}, {statusPole: 'lod', stav: false},
  ];

  constructor() {
    for (let i = 0; i < this.game.length; i++) {
      if (this.game[i].statusPole === 'lod') {
        this.countLod++;
        console.log(this.countLod);
      }
    }
  }

  shuffle(game: Pole[]) {
    let currentIndex = game.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = game[currentIndex];
      game[currentIndex] = game[randomIndex];
      game[randomIndex] = temporaryValue;
    }
    return game;
  }

  turn(click: Pole): void {
    if (click.stav === true) {
      return;
    }
    if (this.postitionDefault === null) {
      click.stav = true;
      this.postitionDefault = click;
    } else {
      if (this.postitionDefault !== click) {
        click.stav = true;
        this.postitionDefault = null;
      }
    }

    if (click.statusPole === 'lod') {
      this.countHitLode++;
      console.log(this.countHitLode);
    }

    if (this.countHitLode === this.countLod) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.game.length; i++) {
        this.postitionDefault = null;
        this.game[i].stav = false;
      }
      this.countHitLode = 0;
      this.start = false;
    }
  }

  submit(): void {
    this.start = true;
    this.shuffle(this.game);
  }

}
