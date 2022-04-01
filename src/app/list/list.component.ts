import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ItemService } from 'src/api/item.service';
import { Item } from 'src/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormDialogComponent } from '../dialogs/item-form-dialog/item-form-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  unsubscribe$: Subject<void> = new Subject();

  constructor(private itemsService: ItemService, private dialog: MatDialog) {}

  getItems(): void {
    this.itemsService
      .getItems()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: Item[]) => (this.items = items));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getItems();
  }

  onAddItem(): void {
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => {
        if (!item) return;
        const newItem = { ...item, id: 7 };
        this.itemsService.addItem(newItem);
        this.getItems();
      });
  }

  onDeleteItem(item: Item): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      data: { name: item.name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((shouldDelete) => {
        if (!shouldDelete) return;
        this.getItems();
      });
  }

  onUpdateItem(item: Item): void {
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      disableClose: true,
      data: { item },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => {
        if (!item) return;
        this.itemsService.updateItem(item);
        console.log(item);
        this.getItems();
      });
  }
}
