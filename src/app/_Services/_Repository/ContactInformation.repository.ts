import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContactInformation } from '../../_Interfaces/ContactInformation';
import { IResponseObject } from '../../_Interfaces/ResponseObject';

@Injectable({
  providedIn: 'root'
})
export class ContactInformationRepository {

  private contactsEndpoint: string = environment.BaseURL + 'contact'

  constructor(private httpClient: HttpClient) {}

  private createHeaders(): HttpHeaders
  {
      const headers = new HttpHeaders()
      headers.set('content-type','application/json')
      return headers
  }

  public getContacts() : Observable<IContactInformation[]> {
    return new Observable<IContactInformation[]>(observer =>{

      this.httpClient
        .get<IResponseObject>(this.contactsEndpoint, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result) => {
            const returnedData = result.body as IResponseObject
            observer.next(returnedData.response.data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(this.handleError(error))
          },
          complete: () => console.info('Get Completed.'),
        })
    })
  }

  public getContact(id: string) :  Observable<IContactInformation>
  {
    return new Observable<IContactInformation>(observer =>{
      const endpoint = `${this.contactsEndpoint}/${id}`

      this.httpClient.get<IResponseObject>(endpoint, {
        headers: this.createHeaders(),
        observe: 'response'
      }).subscribe({ next:  (result)=>{
        let returnedData = result.body as IResponseObject
        let data = returnedData!.response!.data[0] as IContactInformation
        observer.next(data)
        observer.complete()
      },
      error: (error) => {
        console.log(error)
        observer.error(this.handleError(error))
      },
      complete: () => console.info('Get Completed.'),
    })

  })
}

  public postContact(item: IContactInformation) :  Observable<boolean>
  {
    return new Observable<boolean>(observer =>{

      this.httpClient
        .post<IResponseObject>(this.contactsEndpoint, item, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(this.handleError(error))
          },
          complete: () => console.info('Post Completed.'),
        })
    })
  }

  public putContact(id: string, data: Partial<IContactInformation>) :  Observable<boolean> {
    return new Observable<boolean>(observer =>{
      const endpoint = `${this.contactsEndpoint}/${id}`
      this.httpClient
        .put<IResponseObject>(endpoint, data, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(this.handleError(error))
          },
          complete: () => console.info('Put Completed.'),
        })
    })
  }

  public deleteContact(id: string) :  Observable<boolean> {
    return new Observable<boolean>(observer =>{
      const endpoint = `${this.contactsEndpoint}/${id}`
      this.httpClient
        .delete<IResponseObject>(endpoint, {
          headers: this.createHeaders(),
          observe: 'response',
        })
        .subscribe({
          next: (result: any) => {
            let returnedData = result.body as IResponseObject
            let data = returnedData!.success
            observer.next(data)
            observer.complete()
          },
          error: (error) => {
            console.log(error)
            observer.error(this.handleError(error))
          },
          complete: () => console.info('Delete Completed.'),
        })
    })
  }


  public handleError(error: HttpErrorResponse) : Error
  {
    let errorMessage: string = ''
    if(error.error instanceof ErrorEvent)
    { //client error
      errorMessage = `Error: ${error.error.message}`
    }
    else{
      //server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`
    }
    return new Error(errorMessage)
  }
}
