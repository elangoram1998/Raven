import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WenSocketService {

  socket: Socket = io(environment.ENT_POINT);

  constructor() { }
}
