import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  activeMenu = false;
  contador = 0;
  profile: User | null = null;
  categories: Category[];
  // token : any;

  constructor(private storeService: StoreService, private router: Router, private authService: AuthService,
    private categoryService: CategoryService) {}

    ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.contador = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe( data => {
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  navigateTo(param: any) {
    this.router.navigateByUrl(param);
  }

  getAllCategories(){
    this.categoryService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }


  login(){
    // this.authService.loginAndGet('leo30@mail.com','3103')
    // .subscribe(user => {
    //   this.profile = user;
    //   console.log(user)
    // });
    this.authService.loginAndGet('john@mail.com','changeme')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  logout(){
    this.authService.logout();
    this.profile = null;
  }

}
