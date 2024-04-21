import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './models/employee';
import { EmpService } from './services/emp.service';
import Swal from 'sweetalert2'
import { DBOperation } from './helpers/config';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'HR Management';
  allEmployees: Employee[] = [];
  setForm: any
  buttonText: string = 'Save';
  operation: DBOperation = DBOperation.create;

  constructor(
    private empService: EmpService,

  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  departmentList: dep[] = [
    new dep('accounts', 'Accounts'),
    new dep('managers', 'Managers'),
    new dep('administrator', 'Administrator')
  ];

  employeeForm = new FormGroup({
    department: new FormControl('', Validators.required),
    empName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    mobile: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    salary: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    status: new FormControl(false, Validators.required)
  })


  get f() {
    return this.employeeForm.controls;
  }

  reset() {
    this.buttonText = 'Save';
    this.employeeForm.reset();
    this.operation = DBOperation.create;
  }
  reset1() {

  }

  // crud Operation 
  submitData() {
    if (this.employeeForm.invalid) {
      return;
    }
    switch (this.operation) {
      case DBOperation.create:
        this.empService.postEmployee(this.employeeForm.value).subscribe({
          next: () => {
            this.getAllEmployees();
            this.reset();
            Swal.fire("Record is Added!");
          },
          error: () => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Record is not Added!",
            });
          }
        })
        break;

      case DBOperation.update:
        this.empService.updateEmployee(this.employeeForm.value, this.editId).subscribe({
          next: () => {
            this.getAllEmployees();
            this.reset();
            this.editId = '';
            Swal.fire("Record is Updated!");
          },
          error: (e) => {
            console.log(e);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Record is not Updated! ",
            });
          }
        })
        break;
    }

  }

  getAllEmployees() {
    return this.empService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.allEmployees = data;
        console.log(this.allEmployees);
      }
    });
  }


  editId: string = '';
  edit(id: string) {
    this.buttonText = 'Update';
    this.operation = DBOperation.update;
    this.editId = id;
    this.empService.getEmp(id).subscribe({
      next: (data) => {
        this.employeeForm.patchValue(data)
      }
    })
  }

  delete(id: string) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmp(id).subscribe({
          next: () => {
            this.getAllEmployees();
          }
        })
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
}

export class dep {
  id?: string;
  name?: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}


