import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
departmentsarray:any[]=[{deptName:"General Medicine",
icon:"fa-solid fa-stethoscope",
desc:"we have a wide scope of high-quality medical care services"
},
{deptName:"Occupational Therapy",
icon:"fa-solid fa-people-robbery",
desc:"evaluate and treat people who have injuries, illnesses, or disabilities"
},
{deptName:"Radiology",
icon:"fa-solid fa-x-ray",
desc:"offers state-of-the-art diagnostic imaging technology and expertise to medical staff and the community"
},
{deptName:"Laboratory",
icon:"fa-solid fa-flask-vial",
desc:"Our labs use the latest technology to assess hematology, microbiology, immunology, chemistry and histopathology"
},
{deptName:"Speech Therapy",
icon:"fa-solid fa-comments",
desc:"selection of the best speech therapists who succeeded in treating many cases of speech delays and problems that occurred as a result of mental or cognitive disorders"
},
{deptName:"Infectious Diseases",
icon:"fa-solid fa-virus-covid",
desc:""
},
{deptName:"Physical Therapy",
icon:"fa-solid fa-wheelchair-move",
desc:""
},
{deptName:"Psychiatry",
icon:"fas fa-brain",
desc:""
},
{deptName:"Oncology",
icon:"fa-solid fa-disease",
desc:""
},
{deptName:"Rheumatology",
icon:"fa-solid fa-bone",
desc:""
},
{deptName:"Hematology",
icon:"",
desc:""
},
{deptName:"Endocrinology",
icon:"",
desc:""
},
{deptName:"Pediatrics",
icon:"",
desc:""
},
{deptName:"Obstetrics and Gynecology",
icon:"",
desc:""
},
{deptName:"Dermatology",
icon:"",
desc:""
},
{deptName:"Cardiology",
icon:"",
desc:""
},
{deptName:"Neurology",
icon:"",
desc:""
},
{deptName:"Ophthalmology",
icon:"",
desc:""
},
{deptName:"Pulmonary Medicine",
icon:"",
desc:""
},
{deptName:"Gastroenterology",
icon:"",
desc:""
}]
counter:number = 0;

  constructor() { 
   
  }

  ngOnInit(): void {

  }

}
