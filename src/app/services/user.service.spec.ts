import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { HttpResponse } from "@angular/common/http";

describe('UserService', () => {

    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

   it('should retrieve users from the api', () => {
       const dummyUsers: User[] = [
            {
                "id": 1,
                "userName": "Belmont",
                "amountStart": 4000,
                "transactionHistories": [
                    {
                        "id": 1,
                        "createdTransaction": new Date(),
                        "amountOfTransaction": 4000,
                        "transactionDescription": "Food and Drink",
                        "transactionType": "Debit",
                    }
                ]
            },
            {
                "id": 2,
                "userName": "Yikes",
                "amountStart": 2000,
                "transactionHistories": [
                    {
                        "id": 2,
                        "createdTransaction": new Date(),
                        "amountOfTransaction": 2000,
                        "transactionDescription": "stuff",
                        "transactionType": "even more stuff",
                    }
                ]
            },
            {
                "id": 3,
                "userName": "Alf",
                "amountStart": 300,
                "transactionHistories": [
                    {
                        "id": 3,
                        "createdTransaction": new Date(),
                        "amountOfTransaction": 300,
                        "transactionDescription": "Something here",
                        "transactionType": "Something also here",
                    }
                ]
            }
        ]

        service.getUsers().subscribe(
            (res) => {
                expect(res.length).toBe(3);
                expect(res).toEqual(dummyUsers);
            }
        );

        const request = httpMock.expectOne(`${service.baseApi}user`);

        expect(request.request.method).toBe('GET');

        request.flush(dummyUsers);
   });

   it('should be able to post a user', () => {

        const dummyPost: User = {
            id: 5,
            userName: 'Oofer',
            amountStart: 150,
            transactionHistories: [
                {
                  createdTransaction: new Date(),
                  amountOfTransaction: 150,
                  transactionDescription: "Debit",
                  transactionType: "Initial Savings"
                }
              ]
        }; 

        service.addNewUser(dummyPost).subscribe(
            (res) => {
                expect(res).toEqual(dummyPost), fail;
            }
        );

        //should have made the post request at the api endpoint
        const request = httpMock.expectOne(`${service.baseApi}user/add`);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toBe(dummyPost);

        //return the user after post
        const wantedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: dummyPost });

        request.event(wantedResponse);
   });

//    TODO: Add tests for the other api endpoints PUT,DELETE,GET"Username"
})