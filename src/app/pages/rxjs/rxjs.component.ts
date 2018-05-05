import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {

    this.subcription =  this.regresaObservable()
      .subscribe(
        numero => console.log( 'Subs ', numero),
        error => console.error('Error en el obs dos veces ' , error),
        () => console.log('El Observador termino!')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {

    this.subcription.unsubscribe();

  }

  regresaObservable(): Observable<any> {

    return new Observable(observer => {

      let contador  = 0;

      let intevalo = setInterval( () => {

        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intevalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intevalo);
        //   observer.error('Auxilio');
        // }

      }, 500 );

    })
    .retry(2)
    .map((resp: any) => {
        return resp.valor;
    })
    .filter( (valor , index) => {
      if ((valor % 2) === 1) {
        return true;
      } else {
        return false;
      }
    });

  }

}
