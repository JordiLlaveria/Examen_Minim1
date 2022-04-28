import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty, isEmpty } from 'rxjs';

import { Faq } from 'src/app/models/faq';
import { FaqService } from 'src/app/service/faq.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.css']
})
export class CreateFaqComponent implements OnInit {
  faqForm: FormGroup;
  title = "Create Faq";
  pregunta: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _userService: UserService,
              private _faqService: FaqService,
              private aRouter: ActivatedRoute) { 
    this.faqForm = this.fb.group({
      titulopregunta: ['', Validators.required],
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
      persona: ['', Validators.required],
      fechapregunta: ['', Validators.required],
    });
    
    this.pregunta = this.aRouter.snapshot.paramMap.get('pregunta');
    console.log(this.pregunta);
  }

  ngOnInit(): void {
  }

  addFaq() {
    const persona: string = this.faqForm.get('persona')?.value;
    this._userService.getUser(persona).subscribe(data =>{
      const persona = data;
      const titulopregunta:string = this.faqForm.get('titulopregunta')?.value;
      const pregunta:string = this.faqForm.get('pregunta')?.value;
      const respuesta:string = this.faqForm.get('respuesta')?.value;
      const fechapregunta:Date = this.faqForm.get('fechapregunta')?.value;
          
      const faq: Faq = {
        titulopregunta: titulopregunta,
        pregunta: pregunta,
        respuesta: respuesta,
        persona: persona,
        fechapregunta: fechapregunta,  
      }

    // Add user
    this._faqService.addFaq(faq).subscribe(data => {
    this.toastr.success('Faq successfully created!', 'Faq created');
    this.router.navigate(['/list-faqs']);
    }, error => {
      console.log(error);
      this.faqForm.reset();
    })
  })
  }
}
   
