import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  img:string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('cambio el input de imagen', this.img)
  }
  @Output() loaded = new EventEmitter<string>();

  imageDefault = "./assets/img/default-image.jpg";

  constructor() {
    // LO QUE EJECUTAMOS EN EL CONTRUSCTOR SOLO SE EJECUTA UNA VEZ
    // AL CREAR EL COMPONENTE - NO EJECUTAR METODOS ASYNC
  }

  ngOnChanges(){
    //SE EJECUTA ANTES Y DURANTE DE RANDERIZAR
    //DETECTA CAMBIOS EN LOS INPUTS //SE EJECUTA CADA VEZ QUE SE ACTUALIZA EL INPUT
  }

  ngOnInit(): void {
    //TAMBIEN SE EJECUTA ANTES DEL RENDER
    //METODOS ASYNC - PROMESAS - LLAMADAS API - SE EJECUTA UNA VEZ ANTES DEL RENDER
  }

  ngAfterViewInit(): void {
    //SE EJECUTA DESPUES DEL RENDER
    //MANEJAMOS LOS COMPONENTES HIJOS EN CASO DE TENER - DIRECTIVAS
  }

  ngOnDestroy(): void {
    //SE EJECUTA AL ELIMINAR EL COMPONENTE - AL DEJAR DE VERLO EN LA INTERFAZ
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    this.loaded.emit(this.img);
  }


}
