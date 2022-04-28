import { Component, OnInit } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { Faq } from 'src/app/models/faq';
import { FaqService } from 'src/app/service/faq.service';

@Component({
  selector: 'app-list-faqs',
  templateUrl: './list-faqs.component.html',
  styleUrls: ['./list-faqs.component.css']
})
export class ListFaqsComponent implements OnInit {

  listFaqs: Faq[] = [];

  constructor(private _faqService: FaqService,
        private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this._faqService.getFaqs().subscribe(data => {
      console.log(data);
      this.listFaqs = data;
    }, error => {
      console.log(error);
    })
  }

  deleteFaq(pregunta: string) {
    const confirmDelete = confirm("Faq "+pregunta+" will be deleted, do you want to continue?");
      if(confirmDelete===true){
      this._faqService.deleteFaq(pregunta).subscribe(data => {
        this.toastr.error('Faq successfully deleted!', 'Faq deleted');
        this.getFaqs();
      }, error => {
        console.log(error);
      })
    }
  }

}
