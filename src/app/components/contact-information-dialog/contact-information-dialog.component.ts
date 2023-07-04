import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IContactInformation } from 'src/app/_Interfaces/ContactInformation';
import { ContactInformationService } from 'src/app/_Services/ContactInformation.service';

@Component({
  selector: 'app-contact-information-dialog',
  templateUrl: './contact-information-dialog.component.html',
  styleUrls: ['./contact-information-dialog.component.scss']
})
export class ContactInformationDialogComponent implements OnInit {
  contactFrom!: FormGroup;
  isEditAction: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactInformationService,
    private dialogRef: MatDialogRef<ContactInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IContactInformation
  ) {}

  ngOnInit() {
    this.prepareForm()
    this.getAlreadyExistingContact()
  }

  private getAlreadyExistingContact() : void {
    if (!this.editData) return
    this.isEditAction = true
    const timestampSeconds = Object.values(this.editData.date_of_birth!)[0]

    this.contactFrom = this.formBuilder.group({
      title: this.editData.title,
      name: this.editData.name,
      surname: this.editData.surname,
      date_of_birth: new Date(timestampSeconds * 1000),
      phone: this.editData.phone,
      email: this.editData.email,
      photo_url: this.editData.photo_url,
      company: this.editData.company
    })
  }

  private prepareForm() : void {
    this.contactFrom = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      date_of_birth: [undefined, Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo_url: ['', []],
      company: ['', Validators.required]
    })
  }

  public manageContact() : void
  {
    if (!this.contactFrom.valid) return
    let contact = this.contactFrom.value as IContactInformation
    if (!this.editData) {
      this.createContact(contact)
    } else {
      this.updateContact(contact)
    }
  }

  private createContact(contact:IContactInformation) : void {

    this.contactsService.createContact(contact).subscribe({
      next: (res) => {
        alert('Contact added successfully')
        this.contactFrom.reset()
        this.dialogRef.close()
      },
      error: (error) => {
        alert('Error occured while adding contact')
      },
    });
  }

  private updateContact(contact:IContactInformation) : void{

    this.contactsService.updateContact(this.editData._id!, contact)
    .subscribe({
      next: (res) => {
        alert('Contact updated successfully')
        this.contactFrom.reset()
        this.dialogRef.close()
      },
      error: (error) => {
        alert('Error occured while updating contact')
      },
    })
  }

}
