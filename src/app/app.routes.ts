import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NoteListComponent, canActivate: [authGuard] },
  { path: 'notes/new', component: NoteEditorComponent, canActivate: [authGuard] },
  { path: 'notes/:id', component: NoteDetailComponent, canActivate: [authGuard] },
  { path: 'notes/:id/edit', component: NoteEditorComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/notes' }
];
