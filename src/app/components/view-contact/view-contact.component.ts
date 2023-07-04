import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { IContactInformation } from 'src/app/_Interfaces/ContactInformation';
import { ContactInformationService } from 'src/app/_Services/ContactInformation.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {
  public contactId: string | null = null
  public loading: boolean = false
  public contact: IContactInformation = {} as IContactInformation
  public errorMessage: string | null = null;
  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactInformationService) {}

  ngOnInit() {
    this.loading = true
    this.activatedRoute.paramMap.subscribe({
      next: (param: ParamMap) => {
        this.contactId = param.get('contactId')
      },
    });
    this.contactService.fetchContact(this.contactId!).subscribe({
      next: (data: IContactInformation) =>
      {
        this.contact = data
        this.loading = false
      },
      error: (err: any)=>{
        this.errorMessage = err
        this.loading = false
      }
    })
  }
}
