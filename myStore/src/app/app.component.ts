import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  // https://picsum.photos/200
  // imgParent = 'https://www.w3schools.com/howto/img_avatar.png';


  constructor(private authService: AuthService, private tokenService: TokenService) {

  }
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }


  onLoaded(img: string){
    console.log(img);
  }


}
