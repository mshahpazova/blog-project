import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { PostsComponent } from './posts';
import { PostFormComponent, UserPostsComponent, PostDetailsComponent } from './posts';
import { DataResolver } from './app.resolver';
import { SignUpFormComponent } from './users';
import { SignInFormComponent } from './users';
import { UsersComponent, UserEditComponent, UserComponent } from './users';

export const ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'new-post', component: PostFormComponent },
  { path: 'signup', component: SignUpFormComponent },
  { path: 'signin', component: SignInFormComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent},
  { path: 'users/:userId/posts', component: UserPostsComponent},
  { path: 'user-edit', component: UserEditComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**', component: NoContentComponent },
];
