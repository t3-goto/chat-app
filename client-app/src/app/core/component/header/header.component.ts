import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

// Session
import { SessionService } from './../../service/session.service';
import { Session } from './../../../model/session';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public token: string;

  constructor(
    public location: Location,
    private element: ElementRef,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.token = session.token;
      }
      // window.alert(this.token);
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  isHome() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee === '/home') {
      return true;
    } else {
      return false;
    }
  }

  // onClick Sign Out
  logout() {
    this.sessionService.resetSession();
    this.router.navigate(['/account/login']);
  }
}
