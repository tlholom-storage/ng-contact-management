import { Injectable } from '@angular/core';
import { IContactInformation } from '../_Interfaces/ContactInformation';
import { ContactInformationRepository } from './_Repository/ContactInformation.repository';

@Injectable({
  providedIn: 'root'
})
export class ContactInformationService {

  constructor(private contactRepository: ContactInformationRepository) {}

  public fetchContacts() {
    return this.contactRepository.getContacts()
  }

  public fetchContact(id: string) {
    return this.contactRepository.getContact(id)
  }

  public createContact(item: IContactInformation)
  {
    return this.contactRepository.postContact(item)
  }

  public deleteContact(id: string)
  {
      return this.contactRepository.deleteContact(id)
  }

  public updateContact(id: string,  data: Partial<IContactInformation>)
  {
      return this.contactRepository.putContact(id,data)
  }

}
