import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { faCheckCircle, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { NotesService } from '../services/notes.service';

declare const MediumEditor: any;

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements AfterViewInit {
  faCheck = faCheckCircle;
  faSpinner = faSnowflake;
  showSavedAt = false;
  notes = '';
  lastSaved = new Date();
  user = '';
  loading = true;

  editor: any;
  @ViewChild('editable', { static: true }) editable!: ElementRef;


  constructor(
    private firestoreService: NotesService,
    private authService: AuthService
    ) {
    const { email } = this.authService.getLoggedInUser();
    this.user = email;
    this.firestoreService.findUserNotes(email)
      .subscribe((res) => {
        const data = res.data() || {};
        if (data.lastSaved) {
          this.notes = data.notes;
          this.lastSaved = JSON.parse(data.lastSaved);
        } else {
          this.firestoreService.createOrUpdateNotes({
            email,
            notes: this.notes,
            lastSaved: JSON.stringify(this.lastSaved)
          });
        }
        this.showSavedAt = true;
        this.loading = false;
        this.editor.setContent(this.notes);
      });
  }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {
      paste: {
        cleanPastedHtml: true,
        cleanAttrs: ['style', 'class', 'name'],
        cleanTags: ['meta', 'script']
      },
      toolbar: {
        sticky: true
      },
      placeholder: {
        text: 'Start taking notes ...',
        hideOnClick: false
      }
    })
    .subscribe('editableInput', (event: any, editable: any) => {

      const newNotes = this.editor.getContent();
      if (!(this.notes === newNotes)) {
        this.notes = newNotes;
        this.lastSaved = new Date();

        this.firestoreService.createOrUpdateNotes({
          email: this.user,
          notes: this.notes,
          lastSaved: JSON.stringify(this.lastSaved)
        });
       }
    });
  }
}
