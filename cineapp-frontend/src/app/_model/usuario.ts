import { Cliente } from './cliente';
import {Rol} from './rol';
export class Usuario {
    idUsuario: number;
    cliente: Cliente;
    username: string;
    password: string;
    enabled: boolean;
    roles: Rol[];
}
