import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BaseService } from './base.service';
import { Comment } from '../data/comment';
@Injectable()
export class DoctorService extends BaseService {

    constructor(http: Http) {
        super('', http);
    }
    public leaveComment(comment:Comment,session_id:string){
        let body = JSON.stringify(comment);
        let path: string = 'comment/?session_id='+session_id;
        return this.post(body, path)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);    
    }
    public searchPatients(usecol:string,userid:number,session_id:string, name:string){
       let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        params.set('name',name);
        let path: string = usecol +'/' + userid +'/search_patients';
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public getRecord(session_id: string, recordId: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        let path: string =  'record/'  + recordId;
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public getData(usecol:string,userid:number,session_id: string, method: string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        let path: string = usecol +'/' + userid + '/' + method;
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public getTestInfo(testId:number,session_id: string){
       let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        let path: string = 'test/'+testId;
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    public getInfo(usecol:string,userid:number,session_id: string){
       let params: URLSearchParams = new URLSearchParams();
        params.set('session_id', session_id);
        let path: string = usecol +'/' + userid;
        return this.get(path,params)
            .map(response => {
                let json = response.json();
                return json;
            }).catch(this.handleError);        
    }
    private handleError(error: any) {
        let errMsg: string = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
