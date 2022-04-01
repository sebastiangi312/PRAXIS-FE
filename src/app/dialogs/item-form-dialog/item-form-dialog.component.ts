import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/interfaces/item';

@Component({
  selector: 'item-form-dialog',
  templateUrl: 'item-form-dialog.component.html',
  styleUrls: ['item-form-dialog.component.css'],
})
export class ItemFormDialogComponent implements OnInit {
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ItemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { item: Item }
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required]],
    sellIn: ['', [Validators.required]],
    quality: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isUpdating = !!this.data;

    if (this.isUpdating) {
      const { name, sellIn, quality, type } = this.data.item;
      this.form.setValue({ name, sellIn, quality, type });
    }
  }

  onConfirm(): void {
    this.dialogRef.close({ ...this.data.item, ...this.form.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
