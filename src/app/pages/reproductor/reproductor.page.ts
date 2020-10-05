import { Component, OnInit } from '@angular/core';
import { ImagenFondo } from '../../models/imagenFondo';
import { ViewChild, ElementRef } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { PeticionesapiService } from '../../services/peticionesapi.service';
import { map } from 'rxjs/operators';
import { EscenaFrames } from 'src/app/models/escenaFrames';
import { Frame } from 'src/app/models/frame';
import { Input, EventEmitter, Output } from "@angular/core";
import { Libro } from 'src/app/models/libro';
import { threadId } from 'worker_threads';
import { Concurso } from 'src/app/models/concurso';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SocketsService}from '../../services/sockets.service';
import { AnyTxtRecord } from 'dns';


@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.page.html',
  styleUrls: ['./reproductor.page.scss'],
})



export class ReproductorPage implements OnInit {

  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;
  @ViewChild(IonSlides) slides: IonSlides;

  get_duration_interval: any;
  listaFondos: ImagenFondo[] = [];
  idalumno;
  idLibro;
  listaEscenas: EscenaFrames[] = [];
  listaFrames: Frame[] = [];
  listaFotos = [];
  listavotantesconcurso: any = [];
  fotoimagen: string;
  rate: any;
  rate1: any;
  rate2: any;
  rate3: any;
  libro: Libro;
  puntuacion: any;
  listapuntuacion: any = [];
  listavotantes: any = [];
  duracion;
  tiempo;
  concurso: Concurso;
  criterio1: any ;
  criterio1guar: any ;
  criterio2guar: any;
  criterio3guar: any ;
  criterio2: any ;
  criterio3: any ;
  votante = false;
  votantec = false;
  tengoconcurso = false;
  c1: any = '';
  c2: any = '';
  c3: any = '';
  criteriototal;
  tipoaudio;
  modo: any = 0;
  notificacionvotar = 'a';
  url = 'http://localhost:3000/api/imagenes/';
 
 listacompleja =  [];

  
  constructor(private socketservice: SocketsService ,private peticionesAPI: PeticionesapiService, private dataservice: DataService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.socketservice.conectar();
    this.modo = this.activatedRoute.snapshot.paramMap.get('id');
    this.rate = 0;
    this.rate1 = 0;
    this.rate2 = 0;
    this.rate3 = 0;

    this.idalumno = localStorage.getItem("idAlumno");

    if (this.modo == 2) {
      this.idLibro = localStorage.getItem("idLibroVer");  this.socketservice.votarnoti(this.notificacionvotar);
    }
    else {
      this.idLibro = localStorage.getItem("idLibro");

    }

    this.dameEscenas();
    this.damelibro();

    //////////borrar esto/////////////
    ////////////////////////////////
    //////////////////////////////////
    // this.socketservice.votarnoti(this.notificacionvotar);
    // this.socketservice.recibirprueba()
    // .subscribe((res: any) => {

    //   console.log(res);
    // });

  }

  slideOpts = {
    speed: 10,
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 200,
    loop: "false"

  };

  onRate(rate) {
    console.log(rate)
    this.rate = rate;


    ////////if
    this.puntuarlibro();
  }


  onRatec1(rate1) {
    console.log(rate1)
    this.rate1 = rate1;

  }

  onRatec2(rate2) {
    console.log(rate2)
    this.rate2 = rate2;

  }

  onRatec3(rate3) {
    console.log(rate3)
    this.rate3 = rate3;

  }

  damelibro() {
    var idlibro = localStorage.getItem("idLibro");


    this.peticionesAPI.dameunlibro(idlibro)
      .subscribe(res => {
        console.log(res);
        this.libro = res;

        this.listapuntuacion = res.puntuacion;
        this.listavotantes = res.listavotantes;
        this.listavotantesconcurso = res.listavotantesconcurso;
        this.criterio1guar = res.criterio1;
        this.criterio2guar = res.criterio2;
        this.criterio3guar = res.criterio3;
        this.criteriototal = res.criteriototal;
        this.tengoconcurso = res.inscrito;

        this.libroconcursante();
      });


  }

  puntuarlibro() {

    if (this.listavotantes.length > 0) {
      this.listavotantes.forEach(element => {

        if (element == this.idalumno) {
          this.votante = true
        }

      })
    }

    if (this.votante == false) {

      this.listapuntuacion.push(this.rate);
      this.listapuntuacion = this.libro.puntuacion;
      this.listavotantes.push(this.idalumno);

      this.peticionesAPI.modificalibro(this.libro)
        .subscribe((res) => {
          console.log(res)


        }, (err) => { console.log(err); }
        );
    }

    else if (this.votante == true) {

      console.log("Ya has votado este libro niggi");


    }

  }


  libroconcursante() {

    // if (this.tengoconcurso == true) {


    //   this.concurso = this.dataservice.getdataconcurso(500);
    //   this.c1 = this.concurso.concursoPrimerCriterio;
    //   this.c2 = this.concurso.concursoSegundoCriterio;
    //   this.c3 = this.concurso.concursoTercerCriterio;


    // }




  }



  guardar() {



    if (this.listavotantesconcurso.length > 0) {
      this.listavotantesconcurso.forEach(element => {

        if (element == this.idalumno) {
          this.votantec = true;
        }

      })
    }

    if (this.votantec == false) {

      this.listavotantesconcurso.push(this.idalumno);


      this.libro.criterio1 = this.criterio1guar + this.rate1;
      this.libro.criterio2 = this.criterio2guar + this.rate2;
      this.libro.criterio3 = this.criterio3guar + this.rate3;

 
     this.libro.criteriototal = this.libro.criterio1 + this.libro.criterio2 + this.libro.criterio3 ;
      this.peticionesAPI.modificalibro(this.libro)
        .subscribe((res) => {
          console.log(res)
          this.socketservice.votarnoti(this.notificacionvotar);

        }, (err) => { console.log(err); }
        );
    }



  }

///////////////////////7reproducir cuento///////////////////////////////////

  dameEscenas() {

    this.peticionesAPI.dameEscenasLibro(this.idLibro)
      .subscribe(res => {

     



        console.log(res);

        res.forEach(element => {
          this.listaEscenas.push(element);
          this.tiempo = element.duracionFrame;
          this.tipoaudio = element.tipoAudio;
        });
        this.dameFrames();
      });


  }


  dameFrames() {

    this.listaEscenas.forEach(element => {
      var id = element.id;

      this.peticionesAPI.getFramesByEscenaId(id)
        .subscribe(res => {
          var lista = [];
          console.log(res);

          res.forEach(element => {
            lista.push(element);
          });
          this.obtenerFrames2(lista);
        });


    });

  }

  obtenerFrames2(lista) {

    /////////////////cambiar var contenedor///////////////////////////
    var contenedor = this.libro.titulo;
    lista.forEach(element => {

      var objetolista = {
        frame: '',
        escena : String,
        audio : ''
    
     }

     
      
   


      this.peticionesAPI.getImagen(element.portadaFrame, contenedor)
        .subscribe((res) => {
          const blob = new Blob([res.blob()], { type: 'image/png' });

          const reader = new FileReader();
          reader.onloadend = (event) => {
            if(reader.error){
              console.log(reader.error)
            } else {
              this.fotoimagen = reader.result.toString();
              this.listaFotos.push(this.fotoimagen);
              objetolista.frame = this.fotoimagen;
              objetolista.audio = element.audioUrl;
              objetolista.escena = element.escenaid;
              
              if(objetolista.audio != '' )
              {
                var audio =  this.url + this.libro.titulo + "/download/" + objetolista.audio;
                objetolista.audio = audio;
              }
      this.listacompleja.push(objetolista);


              }
          };

          if (blob) {
            reader.readAsDataURL(blob);
          }
        });
    });

  }






  startAutoplay() {

    var time = 0;
    time = 1000 * this.tiempo;
    this.get_duration_interval = setInterval(() => {
      this.slides.slideNext()
    }, time);


  }
  slideChanged() {

  }
  stopAutoplay() {
    if (this.get_duration_interval) {
      clearInterval(this.get_duration_interval);

    }
  }

  slidePrev() {
    this.slides.slidePrev();

  }
  slideNext() {
    this.slides.slideNext();




  }
}
