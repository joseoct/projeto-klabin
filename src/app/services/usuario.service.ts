import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { Observable, ObjectUnsubscribedError } from 'rxjs'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario = {};

  constructor(public firebase: TodoService, 
              public router: Router,
              public toastCtrl: ToastController) {
    this.getUser().subscribe()
  }

  getUser(): Observable<any> {
    return Observable.create(observer => {
      this.firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.usuario = { id: user.uid, email: user.email, isOnline: true }
        } else {
          this.usuario = { id: null, email: null, isOnline: false}
        }
        observer.next(this.usuario)
      })
    })
  }

  async login(email, senha){
    console.log("Logando...")
    try {
      await this.firebase.auth().signInWithEmailAndPassword(email, senha)
    } catch (error) {
      console.log(error.code)
      let message = '';
      switch(error.code)
      {
        case 'auth/invalid-email':
        message = 'Usuário ou senha inválidos'
        break;

        case 'auth/user-not-found':
        message = 'Usuário ou senha inválidos'
        break;

        case 'auth/argument-error':
        message = 'Usuário ou senha inválidos'
        break;

        case 'auth/wrong-password':
        message = 'Usuário ou senha inválidos'
        break;
    }
    this.showToast(message)
  }

}

showToast(msg) {
  this.toastCtrl.create({
    message: msg,
    duration: 2000
  }).then(toast => toast.present());
}


  async registrar(email, senha){
    try {
      await this.firebase.auth().createUserWithEmailAndPassword(email, senha)
      this.showToast('Registro feito com sucesso. Login automático')
    } catch (error) {
      console.log(error.code)
      let message = '';
      switch(error.code)
      {
        case 'auth/weak-password':
        message = 'Senha fraca'
        break;

        case 'auth/email-already-in-use':
        message = 'O e-mail já está sendo usado'
        break;

        case 'auth/invalid-email':
        message = 'E-mail inválido'
        break;

        case 'auth/wrong-password':
        message = 'Usuário ou senha inválidos'
        break;
    }
    this.showToast(message)
  }
}

  logout(){
    this.firebase.auth().signOut()
    this.router.navigateByUrl('login')
  }
}
