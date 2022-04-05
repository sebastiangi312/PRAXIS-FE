import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ItemService } from 'src/api/item.service';
import { Item } from 'src/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormDialogComponent } from '../dialogs/item-form-dialog/item-form-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  isLoading = false;
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private itemsService: ItemService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getItems(): void {
    this.isLoading = true;
    this.itemsService
      .getItems()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.isLoading = false;
      });
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
      .subscribe((item: Item) => {
        if (!item) return;
        this.itemsService
          .addItem(item)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => this.getItems(),
          });
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
        this.itemsService
          .deleteItem(item.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => this.getItems(),
          });
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
      .subscribe((updatedItem: Item) => {
        if (!updatedItem) return;
        updatedItem.id = item.id;
        this.itemsService
          .updateItem(updatedItem)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => this.getItems(),
          });
      });
  }

  onViewItem(item: Item): void {
    this.router.navigate([item.id], { relativeTo: this.route });
  }
}
