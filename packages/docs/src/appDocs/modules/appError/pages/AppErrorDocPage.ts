import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {IDocPage} from '@docPage/interfaces'


type BlockNames = [
    'AppError',
    'AppErrorHelper',
    'AppErrorKey',
    'ErrorValue'
]

export class AppErrorDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init(): void {
        this.setNavTitle('errors')
            .appendBlock(
                new CodeBlock('AppError', 'appError/AppError.tse')
                    .setNavTitle('AppError')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('AppError Клас для викиду помилки.')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Наслідується від базового Error. Приймає першим параметром повідомлення помилки(string) та не обовязковий обєкт statusCode, errorCode які будуть відправлені на клієнт в разі обробки в контролері та errorKey з якого можна отримати errorCode та statusCode(в разі якщо вони не були передані). Додатково масив помилок errors які будуть відправлені на клієнт.')
                    ).appendChildren(
                    new CodeBlock('Error', 'appError/appErrorExample.tse')
                        .setHeaderTitle('example')
                )
            )
            .appendBlock(
                new CodeBlock('ErrorValue', 'appError/ErrorValue.tse')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('ErrorValue сутність помилки')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Може бути string або обєкт з key, message.')
                    )
            )
            .appendBlock(
                new TableBlock('AppErrorKey')
                    .appendText(
                        new TextBlock()
                            .setVariant('h6')
                            .appendPrimaryText('AppErrorKey union тип доступних ключів помилок.')
                    )
                    .appendText(
                        new TextBlock()
                            .appendText('Служить для отримання на основі ключа statusCode та errorCore які полетять на клієнт')
                    )
                    .appendColumn({
                        title: 'Назва ключа',
                        key: 'key'
                    })
                    .appendColumn({
                        title: 'statusCode',
                        key: 'statusCode'
                    })
                    .appendColumn({
                        title: 'errorCode',
                        key: 'errorCode'
                    })
                    .appendRows([
                        {key: 'CONNECT_TO_DB_ERROR', errorCode: 'connect_to_db_error', statusCode: '500'},
                        {key: 'HEADER_VALIDATION_ERROR', errorCode: 'header_validation_error', statusCode: '400'},
                        {key: 'VALIDATION_ERROR', errorCode: 'validation_error', statusCode: '422'},
                        {key: 'GET_MODEL_ERROR', errorCode: 'get_model_error', statusCode: '500'},
                        {key: 'CREATE_ROW_ERROR', errorCode: 'create_row_error', statusCode: '500'},
                        {key: 'CONNECT_TO_REDIS_ERROR', errorCode: 'connect_to_redis_error', statusCode: '500'},
                        {key: 'UPDATE_ROW_ERROR', errorCode: 'update_row_error', statusCode: '500'},
                        {key: 'DELETE_ROW_ERROR', errorCode: 'delete_row_error', statusCode: '500'},
                        {key: 'NOT_FOUND_ERROR', errorCode: 'not_found_error', statusCode: '404'},
                        {key: 'INVALID_BEARER_TOKEN_ERROR', errorCode: 'invalid_bearer_token', statusCode: '401'},
                        {key: 'STRUCTURE_ACCESS_ERROR', errorCode: 'structure_access_error', statusCode: '403'},
                        {key: 'ALREADY_EXISTS_ERROR', errorCode: 'already_exists_error', statusCode: '409'},
                        {key: 'SAVE_FILE_ERROR', errorCode: 'save_file_error', statusCode: '500'},
                        {key: 'DELETE_FILE_ERROR', errorCode: 'delete_file_error', statusCode: '500'},
                        {key: 'CONNECT_TO_AWS_S3_ERROR', errorCode: 'connect_to_aws_s3_error', statusCode: '500'},
                        {key: 'UNAUTHORIZED_ERROR', errorCode: 'unauthorized_error', statusCode: '401'},
                        {key: 'DOMAIN_ACCESS_DENIED_ERROR', errorCode: 'domain_access_denied_error', statusCode: '403'},
                        {key: 'SERVER_SIDE_ERROR', errorCode: 'server_side_error', statusCode: '500'},
                        {key: 'OS_CORE_SAVE_ERROR', errorCode: 'os_core_save_error', statusCode: '500'},
                        {key: 'GET_FILE_BUFFER_ERROR', errorCode: 'get_file_buffer_error', statusCode: '500'},
                        {
                            key: 'EXTERNAL_REQUEST_FAILED_ERROR',
                            errorCode: 'external_request_failed_error',
                            statusCode: '500'
                        }
                    ])
            )
    }
}
