import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { HttpModule, Response } from '@angular/http';
import { SearchNotePipe } from './search-note.pipe'
describe('Pipe: SearchNotePipe', () => {
  let pipe = new SearchNotePipe();
  //specs
  it('transforms "abc" to "Abc"', () => {
      let note= [{content:"abc",for_records:[],for_test:[]}];
    expect(pipe.transform(note,null)).toBe(note);
  });
  

 
})