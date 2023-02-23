import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworkListComponent } from './social-network-list.component';

describe('SocialNetworkListComponent', () => {
  let component: SocialNetworkListComponent;
  let fixture: ComponentFixture<SocialNetworkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialNetworkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialNetworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
