import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { API_MAP } from './constants/application.constants';
import { ApiMap } from './types';

@Controller('/data-driven/:apiId')
export class AppController {
  constructor(@Inject(API_MAP) private readonly apiMap: ApiMap) {}
  @Get('*')
  async get(
    @Req() req: Request,
    @Res() res: Response,
    @Param('apiId') apiId: string,
  ) {
    return this.defaultHandle(req, res, apiId);
  }

  @Post('*')
  async post(
    @Req() req: Request,
    @Res() res: Response,
    @Param('apiId') apiId: string,
  ) {
    return this.defaultHandle(req, res, apiId);
  }

  @Put('*')
  async put(
    @Req() req: Request,
    @Res() res: Response,
    @Param('apiId') apiId: string,
  ) {
    return this.defaultHandle(req, res, apiId);
  }

  @Delete('*')
  async del(
    @Req() req: Request,
    @Res() res: Response,
    @Param('apiId') apiId: string,
  ) {
    return this.defaultHandle(req, res, apiId);
  }

  private async defaultHandle(req: Request, res: Response, apiId: string) {
    const api = this.apiMap.get(apiId);
    if (!api) throw new NotFoundException('Não encontrado o produto');

    const { body, originalUrl } = req;

    /**
     * Compliance da Shuri
     * 1. Produto vai ter que seguir o contrato da Shuri
     * 2. End to End "BaseURL"
     * 3. Contrato = Valor pro Negócio. "Aluno Metrics", "Base Aluno", "Live"
     */

    /** Daqui para baixo */
    const originalUrlMap = {
      '/students': ['students', 'list'] as const,
      '/live/presence-list': ['live', 'class', 'presenceList'] as const,
    };

    const [, , , ...parsedOriginalUrl] = originalUrl.split('/');

    const [contract, ...operation] =
      originalUrlMap['/' + parsedOriginalUrl.join('/')] ?? [];
    if (!contract || !operation)
      throw new NotFoundException('Não encontrado o contrato');

    const contractInstance = api.operations[contract];
    if (!contractInstance)
      throw new BadRequestException('API não possui esse contrato');

    let stack;
    let i = 0;
    while (true) {
      const operationName = operation.shift();
      if (!operationName) break;

      const operationInstance =
        i == 0 ? contractInstance[operationName] : stack[operationName];
      if (!operationInstance)
        throw new BadRequestException('Contrato não possui essa operação');

      if (typeof operationInstance.bind === 'function')
        stack = operationInstance.bind(i == 0 ? contractInstance : stack);
      else stack = operationInstance;
      i++;
    }

    if (!stack) throw new BadRequestException('Operação não encontrada');

    const result = await stack();
    return res.status(200).send(result);
  }
}
