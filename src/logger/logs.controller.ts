import { Controller, Get, Post, Query, Body, Patch, Param, Delete, UseFilters, Inject, LoggerService } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { levels as LOG_LEVELS } from '@natankamusher/custom-logger-nest'

@ApiTags('logs')	
@Controller('logs')
export class LogsController {
    constructor(@Inject( WINSTON_MODULE_PROVIDER ) private readonly logger: Logger) {}

    @Patch('/levels/:level')
    @ApiQuery({ name: 'level', enum: LOG_LEVELS, description: "Log levels to transport" })
    @ApiOperation({tags: ["update log levels"], description: "Update log levels"})
    configureLogs(@Query('level') level: string) {
        this.logger.transports.forEach(transport => transport.level = level)
        this.logger.level = level;
    }
    
}
