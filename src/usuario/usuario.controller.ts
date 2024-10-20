import { BadRequestException, Body, ConflictException, Controller, Get, Param, Post } from "@nestjs/common";
import { Usuario } from "../@core/usuario/domain/usuario";  // Ajuste o caminho conforme necessário
import { CreateUsuarioUseCase } from "../@core/usuario/use-case/create-usuario.usecase";  // Ajuste o caminho conforme necessário
import { ListUsuariosUseCase } from "../@core/usuario/use-case/list-usuarios.usecase";  // Ajuste o caminho conforme necessário
import { FindUsuarioByIdUseCase } from "../@core/usuario/use-case/find-usuario-by-id";  // Ajuste o caminho conforme necessário
import { FindUsuarioByEmailUseCase } from "../@core/usuario/use-case/find-usuario-by-email";  // Ajuste o caminho conforme necessário
import { UsuarioCreateDTO } from "../@core/usuario/domain/dto/usuario.dto";  // Ajuste o caminho conforme necessário

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly listUsuariosUseCase: ListUsuariosUseCase,
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly findUsuarioByIdUseCase: FindUsuarioByIdUseCase,
    private readonly findUsuarioByEmailUseCase: FindUsuarioByEmailUseCase,
  ) {}

  @Get()
  async listAll(): Promise<Usuario[]> {
    return this.listUsuariosUseCase.execute();
  }

  @Post()
  async create(@Body() usuarioData: any): Promise<Usuario> {
    const usuarioDTO = new UsuarioCreateDTO(usuarioData);
    const errors = await usuarioDTO.validate(); 
    
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const usuario = new Usuario({
      email: usuarioDTO.email,             // Ajuste para email
      senha: usuarioDTO.senha,             // Ajuste para senha
      nome: usuarioDTO.nome,               // Ajuste para nome
      tipo_usuario: usuarioDTO.tipo_usuario,     // Ajuste para matrícula
    });

    try {
      await this.createUsuarioUseCase.execute(usuario.props);
      return usuario; 
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Usuario> {
    try {
      const usuario = await this.findUsuarioByIdUseCase.execute({ id });
      return usuario;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Usuario> {
    try {
      const usuario = await this.findUsuarioByEmailUseCase.execute({ email });
      return usuario;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
