import {Component} from '@angular/core';
import {Value} from "../tileValue";


interface TileValue {
  getValue(): Value;
}

class Pole implements TileValue{
  value = false;
  detected = false;

  constructor(ship: boolean) {
    this.value = ship;
  }

  getValue(): Value {
    if (!this.detected){
      return Value.HIDDEN;
    } else if (this.value){
      return Value.SHIP;
    } else {
      return Value.WATER;
    }
  }
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
  lode = 6;

  ship = Value.SHIP;
  water = Value.WATER;

  FieldShip: Pole[][] = [
    [new Pole(true), new Pole(false),
      new Pole(true), new Pole(true)],

    [new Pole(false), new Pole(false),
      new Pole(true), new Pole(false)],

    [new Pole(false), new Pole(true),
      new Pole(false), new Pole(false)],

    [new Pole(false), new Pole(true),
      new Pole(false), new Pole(false)],
  ];
  constructor() {
    for (let i = 0; i < this.FieldShip.length; i++) {
      for (let y = 0; y < this.FieldShip.length; y++) {
        if (this.FieldShip[i][y].getValue() === Value.SHIP) {
          this.countLod++;
        }
      }
    }
  }

  shuffle(game: Pole[][]) {
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
    if (click.getValue() === Value.HIDDEN) {
      (click as Pole).detected = true;
    }

    if (click.getValue() === Value.SHIP) {
      this.countHitLode++;
      console.log(this.countHitLode);
    }

    if (this.countHitLode === this.lode) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.FieldShip.length; i++) {
        for (let y = 0; y < this.FieldShip.length; y++) {
          this.postitionDefault = null;
          this.FieldShip[i][y].detected = false;
          this.countHitLode = 0;
          this.start = false;
        }
      }
    }
  }

  submit(): void {
    this.start = true;
    this.shuffle(this.FieldShip);
  }

}
