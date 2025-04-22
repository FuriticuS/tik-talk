import {Component, effect, inject} from '@angular/core';
import {ProfilePageComponent} from "../profile-page/profile-page.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfilePageComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  fb = inject(FormBuilder);
  profileService = inject(ProfileService)

  public form= this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value:'', disable: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(()=>{
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        // @ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      })
    })
  }

  public onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return

    // @ts-ignore
    firstValueFrom(this.profileService.pathProfile({
      ...this.form.value,
      // @ts-ignore
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  //добавление возможности писать Навыки (стэк)
  splitStack(stack: string | null | string[] | undefined): string[]{
    if(!stack) return []
    if(Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined): string {
    if(!stack) return ''
    if(Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
