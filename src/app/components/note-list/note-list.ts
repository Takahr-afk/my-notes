import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  loading = true;

  constructor(private noteService: NoteService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.notes = await this.noteService.getNotes();
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      this.loading = false;
    }
  }

  async deleteNote(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this note?')) {
      await this.noteService.deleteNote(id);
      this.notes = this.notes.filter(note => note.id !== id);
    }
  }
}
