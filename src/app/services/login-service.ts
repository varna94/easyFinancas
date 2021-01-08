import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { HttpUtilService } from './http-util-service';
import { User } from "../models/users";
import { auth } from './firebase/app';
// import { User } from "../models/users";
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class LoginService { }
