import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';
import { NewsreaderService } from 'src/app/services/newsreader.service';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.css']
})
export class ListEntriesComponent implements OnInit {

  public entriesList: Entry[] = [];
  public selectedEntry? : Entry;

  constructor(
    private newsreaderService: NewsreaderService,
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.newsreaderService.currentFeed$.subscribe(feed => {
      this.entryService.getEntries(feed.id!).subscribe(entries => {
        this.entriesList = entries['hydra:member'];
      })
    })
  }

  public selectEntry(entry: Entry) {
    entry.readed = true;
    this.selectedEntry = entry;
    this.newsreaderService.currentEntry.next(entry);
    this.entryService.read(entry).subscribe();
  }
}
