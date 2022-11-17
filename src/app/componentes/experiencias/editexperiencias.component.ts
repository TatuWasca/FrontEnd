import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Experiencias } from 'src/app/model/component-models';
import { ExperienciaService } from 'src/app/service/experiencias.service';

@Component({
  selector: 'app-editexperiencias',
  templateUrl: './editexperiencias.component.html',
  styleUrls: ['./editexperiencias.component.css']
})
export class EditexperienciasComponent implements OnInit {
  experiencias:Experiencias;

  onEditar(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.experienciaService.editarExp(id, this.experiencias).subscribe(data =>{
      this.router.navigate(['']);
    }, err =>{
      alert("Ha ocurrido un error")
      this.router.navigate(['']);
    })
  }

  cancelar(){
    this.formElement.reset();
    this.router.navigate(['']);
  }
  
  //Funciones para los formularios
  formElement = new FormGroup({
    nombreF: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descripcionF: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    lugarF: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    fechaF: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });
  get NombreF(){
    return this.formElement.get("nombreF");
  }
  get DescripcionF(){
    return this.formElement.get("descripcionF");
  }
  get LugarF(){
  return this.formElement.get("lugarF");
  }
  get FechaF(){
    return this.formElement.get("fechaF");
  }

  constructor(private experienciaService:ExperienciaService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id']
    this.experienciaService.obtenerDetalles(id).subscribe(data=>{
      this.experiencias= data;
    },err=>{
      alert("Ha ocurrido un error");
      this.router.navigate(['']);
    })
  }

}
