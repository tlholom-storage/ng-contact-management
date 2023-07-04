import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContactInformation } from 'src/app/_Interfaces/ContactInformation';
import { ContactInformationService } from 'src/app/_Services/ContactInformation.service';
import { ContactInformationDialogComponent } from '../contact-information-dialog/contact-information-dialog.component';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false
  public contacts: IContactInformation[] = []
  public errorMessage: string | null = null

  constructor(
    private contactService: ContactInformationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refreshCards()
  }

  public openDialog(): void {
    this.dialog.open(ContactInformationDialogComponent, {
      width: '30%',
      disableClose: true,
    })
  }

  public onEditClick(contactId: string): void{
    let contact = {} as IContactInformation
    this.contactService.fetchContact(contactId!).subscribe({
      next: (data: IContactInformation) =>
      {
        contact = data
        console.log('In Next', data)
      },
      error: (err: any)=>{
        this.errorMessage = 'Unable to fetch contact'
      },
      complete: ()=>
      {
          if(!this.errorMessage)
          {
            this.dialog.open(ContactInformationDialogComponent, {
              width: '30%',
              disableClose: true,
              data: contact
            })
          }
      }
    })
  }

  public onDeleteClick(contactId: string): void{
    this.contactService.deleteContact(contactId).subscribe({
      next: (success: boolean) =>
      {
        this.loading = false
      },
      error: (err: any)=>{
        this.errorMessage = 'Unable to delete contact'
        this.loading = false
      },
      complete: ()=>
      {
        if(!this.errorMessage)
          this.refreshCards()
      }
    })
  }

  public refreshCards(): void{
    this.loading = true
    this.contactService.fetchContacts().subscribe({
      next: (data: IContactInformation[]) => {
        this.contacts = data
        this.loading = false
      },
      error: (error) => {
        this.errorMessage = 'No Data Retrived'
        this.loading = false
      },
    })
  }
}
