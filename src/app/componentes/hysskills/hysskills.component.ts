import { Component,  OnInit } from '@angular/core';
import { Hysskills } from 'src/app/model/component-models';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HysSkillsService } from 'src/app/service/hysskills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hysskills',
  templateUrl: './hysskills.component.html',
  styleUrls: ['./hysskills.component.css']
})
export class HySSkillsComponent implements OnInit {
  isLogged:boolean = false;
  HysskillsArray: Hysskills[]

  NewSkill : Hysskills = new Hysskills();

  //Abre el modal
  open(contenido:any) {
    this.modalService.open(contenido, {centered: true, animation: false, backdrop: 'static'}) 
  }

  //Cierra el modal, quita los cambios, resetea el formulario y sus validators
  cerrar(){
    this.modalService.dismissAll();
  }
  cerrarCrear(){
    this.formElement.reset();
    this.modalService.dismissAll();
  }
  cerrarEditar(){
    this.obtenerSkills();
    this.modalService.dismissAll();
  }
 
  //Permite obtener las skills
  private obtenerSkills(){
    this.HysSkillsService.obtenerListaSkills().subscribe(data =>{
      this.HysskillsArray = data;
    })
  } 

  //Comprueba que sea validos sus inputs al hacer submit y llama a la función CRUD correspondiente
  onCrear(){
    if(this.formElement.valid){
      this.crear();
    }else{
      this.formElement.markAllAsTouched(); 
    } 
  }
  onEditar(id:number,skill:Hysskills){
    if(this.formElement.valid){
      this.editar(id,skill); 
    }else{
      this.formElement.markAllAsTouched(); 
    }
  }

  //Funciones CRUD
  crear(){
    this.HysSkillsService.añadirSkill(this.NewSkill).subscribe(data =>{
      this.HysskillsArray = data;
      this.cerrarCrear();
    });
  }
  borrar(id: number){
    this.HysSkillsService.eliminarSkill(id).subscribe(data =>{
      this.HysskillsArray = data;
      this.cerrar();
    });
  }
  editar(id:number, skill:Hysskills){
    this.HysSkillsService.editarSkill(id, skill).subscribe(data =>{
      this.HysskillsArray = data;
      this.cerrarEditar();
    });
  }

  //Funciones para los formularios
  formElement = new FormGroup({
    nombreF: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    valorF: new FormControl('', [Validators.required]),
  });
  get NombreF(){
    return this.formElement.get("nombreF");
  }
  get ValorF(){
    return this.formElement.get("valorF");
  }

  constructor(public modalService:NgbModal,private tokenService: TokenService, private HysSkillsService:HysSkillsService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    this.obtenerSkills();
  };
}