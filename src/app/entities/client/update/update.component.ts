import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, IClient } from '../client.model';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class ClientUpdateComponent implements OnInit {
  reader : any;
  picBytes : any;
  selectedFile!: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
 
  message: string | undefined;
  imageName: any;
  client: Client = new Client();
  id!: number;
  editForm = this.fb.group({
    id: [],
    userName: [],
    password: [],
    nom: [],
    prenom: [],
    age: [],
    email: [],
    cin: [],
    active: [],
    picByte : [],
  });
  httpClient: any;

  constructor(public dialog: MatDialog,private clientService : ClientService ,private router : Router, protected fb: UntypedFormBuilder , protected activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.activatedRoute.snapshot.params["id"];
    this.clientService.get(this.id).subscribe( data => {
      this.client = data ;
    }, error => console.log(error))
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("haa hiiyaaa lfile  "+ this.selectedFile.name);
    console.log("haa hiiyaaa sizee "+ this.selectedFile?.size);
    this.handleFileSelect(event);

  }
  private base64textString:String="";
  
 
  handleFileSelect(evt : any){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt : any) {
   var binaryString = readerEvt.target.result;
          this.client.picByte= btoa(binaryString);
          console.log("lakhraaaaaaaaa :"+this.client.picByte);
  }
  
  protected updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      nom: client.nom,
      userName: client.userName,
      password : client.password,
      prenom : client.prenom,
      age : client.age,
      email : client.email,
      cin : client.cin,
      active : client.active,
      picByte :client.picByte,
      
      
    });
  }

  save():void{
   //this.client.picByte=this.selectedFile;
   this.client.nom="reda";
    console.log("nom clienttt"+this.client.nom);
    console.log("lakhraaaaaaaaa 22  :"+this.client.picByte);
    //console.log("hadi hiya l x : "+this.client.picByte.size);

    if(this.editForm.get(['id'])!.value === undefined ) { 
     // console.log(this.selectedFile);
    
      this.clientService.add(this.client).subscribe(data =>{
        console.log(data);
        this.openDialog('500ms', '500ms');

      },
      error => console.log(error)
      );
    }
   else{
    this.clientService.update(this.id,this.client).subscribe(data =>{
      console.log(data);
      this.openDialog('500ms', '500ms');

    },
    error => console.log(error)
    )
   }

   
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SuccessAlertDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['dashboard/clients']);
    });
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'succes-alert-dialog.html',
})
export class SuccessAlertDialog {
  constructor(public dialogRef: MatDialogRef<SuccessAlertDialog>) {

  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }
}