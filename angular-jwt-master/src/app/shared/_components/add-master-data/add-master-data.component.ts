import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-master-data',
  templateUrl: './add-master-data.component.html',
  styleUrls: ['./add-master-data.component.css']
})
export class AddMasterDataComponent implements OnInit {

  @Input() code: any = '';
  @Input() name: any = '';
  @Input() title: any = 'Add';
  @Input() button: any = 'Add';
  constructor(private dialogRef: MatDialogRef<AddMasterDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoBtnClick() {
    this.dialogRef.close({ 'flag': false });
  }

  onYesBtnClick() {
    this.dialogRef.close({ 'flag': true, 'obj': { 'name': this.name, 'code': this.code } });
  }
}
