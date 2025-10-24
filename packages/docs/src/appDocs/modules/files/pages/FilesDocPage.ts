import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'
import {CodeBlock} from '@docBlocks/impl/CodeBlock'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {IDocPage} from '@docPage/interfaces'
import {TableBlock} from '@docBlocks/impl/TableBlock'
import {StepperBlock} from '@docBlocks/impl/StepperBlock'
import {StepBlock} from '@docBlocks/impl/StepBlock'
import {envDocModule} from '@appDocs/modules/env'


type BlockNames = [
    'AppFile',
    'mimetype',
    'FileHelper',
    'FileService',
]

export class FilesDocPage extends AbstractDocPage<BlockNames> implements IDocPage<BlockNames> {
    
    public init() {
        this.appendBlock(
            new CodeBlock('AppFile', 'files/AppFile.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('AppFile')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Обєкт файлу принятого з клієнту')
                )
        )
        this.appendBlock(
            new CodeBlock('FileService', 'files/FileService.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('FileService')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас з методами для роботи файлами')
                )
                .appendChildren(
                    new StepperBlock('fileServiceMethods')
                        .appendSteep(
                            new StepBlock('save')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Зберігає файл. В результаті успіху повертає обєкт з filePath(string) юрл по якому був збережений файл. Може зберігати як локально так і в S3 в залежності від налаштувань в')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'ENV.INIT_HAS_AWS_S3_UPLOAD')
                                        .appendText('Якщо дане поле === "1" то зберігатись файли будуть в S3.')
                                        .appendText('В такому випадку додатково для S3 потрібно будуть в ENV ще поля')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'INIT_AWS_S3_BUCKET, INIT_AWS_S3_REGION, INIT_AWS_S3_ACCESS_KEY, INIT_AWS_S3_SECRET_KEY')
                                        .appendText('Якщо ж нічого не передати в')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'ENV.INIT_HAS_AWS_S3_UPLOAD')
                                        .appendText('або поле буде === "0". Зберігатись фали буде локально.')
                                        .appendText('Приймає обєкт з обовязковими параметрами для збереження buffer та')
                                        .appendLink(this.getBlockPath('mimetype'), 'mimetype')
                                        .appendText('. Та додатково два можливих варіанти обовязкових параметрів:fileName(string)і тоді назву для файлу буде взято як для S3 так і для локального збереження, або fileNameS3(string) та fileNameLocal(string) і тоді для локального і S3 збереження відповідно будуть різні назви.')
                                        .appendText('Додатково не обовязкове поле dirPathLocal(яке буде працювати тільки при локальному збереженню) - назва папки в яку будуть зберігатись локально файли від рутової папки')
                                )
                                .appendChildren(
                                    new TableBlock('fileServiceMethods.saveParams')
                                        .appendText(new TextBlock().appendText('Опис обєкту параметрів'))
                                        .appendColumn({
                                            key: 'key',
                                            title: 'Ключ'
                                        })
                                        .appendColumn({
                                            key: 'type',
                                            title: 'type'
                                        })
                                        .appendColumn({
                                            key: 'req',
                                            title: 'Обовязковий'
                                        })
                                        .appendColumn({
                                            key: 'description',
                                            title: 'Опис'
                                        })
                                        .appendRows([
                                            {
                                                key: 'buffer',
                                                type: 'Buffer',
                                                req: 'Обовязковий',
                                                description: 'Буфер'
                                            },
                                            {
                                                key: 'mimetype',
                                                type: new TextBlock().appendLink(this.getBlockPath('mimetype'), 'mimetype'),
                                                req: 'Обовязковий',
                                                description: 'формат файлу'
                                            },
                                            {
                                                key: 'fileNameS3',
                                                type: 'string',
                                                req: 'Обовязковий( якщо не передати fileName)',
                                                description: 'Назва файлу для збереження в s3'
                                            },
                                            {
                                                key: 'fileNameLocal',
                                                type: 'string',
                                                req: 'Обовязковий( якщо не передати fileName)',
                                                description: 'Назва файлу для локального збереження'
                                            },
                                            {
                                                key: 'fileName',
                                                type: 'string',
                                                req: 'Обовязковий( якщо не передати fileNameS3 та fileNameLocal)',
                                                description: 'Назва файлу для збереження в s3 та локального'
                                            }
                                        ])
                                )
                                .appendChildren(
                                    new CodeBlock('fileServiceSaveExample', 'files/fileServiceSaveExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('delete')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Видаляє файл. В залежності від того чи є посилання на стороні ресурс(містить http в filePath) буде видаляти файл з S3, якщо ні то буде видаляти локально. Якщо файл з S3 додатково потрібно будуть поля в ENV')
                                        .appendLink(envDocModule.getPageBlockPath('env', 'optionalEnvFields'), 'INIT_AWS_S3_BUCKET, INIT_AWS_S3_REGION, INIT_AWS_S3_ACCESS_KEY, INIT_AWS_S3_SECRET_KEY')
                                )
                                .appendChildren(
                                    new CodeBlock('fileServiceDeleteExample', 'files/fileServiceDeleteExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('checkAwsS3')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Перевіряє підключення до S3')
                                )
                                .appendChildren(
                                    new CodeBlock('fileServiceCheckS3Example', 'files/fileServiceCheckS3Example.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getFileBufferByUrl')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Завантажує файл з стороннього ресурсу та повертає його Buffer, format(символи після останньої крапки) та ')
                                        .appendLink(this.getBlockPath('mimetype'), 'mimetype')
                                )
                                .appendChildren(
                                    new CodeBlock('fileServiceGetFileBufferByUrlExample', 'files/fileServiceGetFileBufferByUrlExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                        .appendSteep(
                            new StepBlock('deleteFilesOnError')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Приймає асинхроний келбек який потрібно виконати та масив файлів які будуть видалені якщо цей cb викине помилку. Видаляє файли після чого прокидає помилку далі')
                                )
                                .appendChildren(
                                    new CodeBlock('fileServiceDeleteFilesOnErrorExample', 'files/fileServiceDeleteFilesOnErrorExample.tse')
                                        .setHeaderTitle('Приклад')
                                )
                        )
                )
        )
        this.appendBlock(
            new CodeBlock('FileHelper', 'files/FileHelper.tse')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('FileHelper')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Статичний клас з методами для роботи з назвою файлів')
                )
                .appendChildren(
                    new StepperBlock('fileHelperMethods')
                        .appendSteep(
                            new StepBlock('getUniqName')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Генерує унікальну назву для файлау. По принципу: `${subPathStart}${subPathMiddle}-${randomNumber}${format}`. Приймає один з обовязкових параметрів originalName(string) або format(string) та не обовязкові subPathStart(string) та subPathMiddle(string).')
                                        .appendText('Якшо передати')
                                        .appendPrimaryText('originalName')
                                        .appendText('Витягне з нього формат файлу(останні символі після крапки) та з нього буде формати назву. Якщо передати')
                                        .appendPrimaryText('format')
                                        .appendText('то візьме просто його.')
                                        .appendText('subPathStart вставляється на початок назви файлу')
                                        .appendText('subPathMiddle вставляється в середині назви файлу(перед рандомною числом та форматом)')
                                )
                        )
                        .appendSteep(
                            new StepBlock('getFormatFromName')
                                .appendText(
                                    new TextBlock()
                                        .appendText('Повертає формат файлу якщо він присутній(символи після останньої крапки)')
                                )
                        )
                )
        )
        this.appendBlock(
            new TableBlock('mimetype')
                .appendText(
                    new TextBlock()
                        .setVariant('h6')
                        .appendPrimaryText('mimetype')
                )
                .appendText(
                    new TextBlock()
                        .appendText('Формат файлу')
                )
                .appendColumn({
                    key: 'format',
                    title: 'Розширення'
                })
                .appendColumn({
                    key: 'key',
                    title: 'ключ'
                })
                
                .appendColumn({
                    key: 'description',
                    title: 'Опис'
                })
                .appendRows([
                    {format: '.aac', key: 'audio/aac', description: 'AAC audio'},
                    {format: '.abw', key: 'application/x-abiword', description: 'AbiWord document'},
                    {
                        format: '.arc',
                        key: 'application/x-freearc',
                        description: 'Archive document (multiple files embedded)'
                    },
                    {format: '.avi', key: 'video/x-msvideo', description: 'AVI: Audio Video Interleave'},
                    {format: '.azw', key: 'application/vnd.amazon.ebook', description: 'Amazon Kindle eBook format'},
                    {format: '.bin', key: 'application/octet-stream', description: 'Any kind of binary data'},
                    {format: '.bmp', key: 'image/bmp', description: 'Windows OS/2 Bitmap Graphics'},
                    {format: '.bz', key: 'application/x-bzip', description: 'BZip archive'},
                    {format: '.bz2', key: 'application/x-bzip2', description: 'BZip2 archive'},
                    {format: '.csh', key: 'application/x-csh', description: 'C-Shell script'},
                    {format: '.css', key: 'text/css', description: 'Cascading Style Sheets (CSS)'},
                    {format: '.csv', key: 'text/csv', description: 'Comma-separated values (CSV)'},
                    {format: '.doc', key: 'application/msword', description: 'Microsoft Word'},
                    {
                        format: '.docx',
                        key: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        description: 'Microsoft Word (OpenXML)'
                    },
                    {format: '.eot', key: 'application/vnd.ms-fontobject', description: 'MS Embedded OpenType fonts'},
                    {format: '.epub', key: 'application/epub+zip', description: 'Electronic publication (EPUB)'},
                    {format: '.gz', key: 'application/gzip', description: 'GZip Compressed Archive'},
                    {format: '.gif', key: 'image/gif', description: 'Graphics Interchange Format (GIF)'},
                    {format: '.htm', key: 'text/html', description: 'HyperText Markup Language (HTML)'},
                    {format: '.html', key: 'text/html', description: 'HyperText Markup Language (HTML)'},
                    {format: '.ico', key: 'image/vnd.microsoft.icon', description: 'Icon format'},
                    {format: '.ics', key: 'text/calendar', description: 'iCalendar format'},
                    {format: '.jar', key: 'application/java-archive', description: 'Java Archive (JAR)'},
                    {format: '.jpeg', key: 'image/jpeg', description: 'JPEG images'},
                    {format: '.jpg', key: 'image/jpeg', description: 'JPEG images'},
                    {format: '.js', key: 'text/javascript', description: 'JavaScript'},
                    {format: '.json', key: 'application/json', description: 'JSON format'},
                    {format: '.jsonld', key: 'application/ld+json', description: 'JSON-LD format'},
                    {format: '.mid', key: 'audio/midi', description: 'Musical Instrument Digital Interface (MIDI)'},
                    {format: '.midi', key: 'audio/x-midi', description: 'Musical Instrument Digital Interface (MIDI)'},
                    {format: '.mjs', key: 'text/javascript', description: 'JavaScript module'},
                    {format: '.mp3', key: 'audio/mpeg', description: 'MP3 audio'},
                    {format: '.mpeg', key: 'video/mpeg', description: 'MPEG Video'},
                    {
                        format: '.mpkg',
                        key: 'application/vnd.apple.installer+xml',
                        description: 'Apple Installer Package'
                    },
                    {
                        format: '.odp',
                        key: 'application/vnd.oasis.opendocument.presentation',
                        description: 'OpenDocument presentation document'
                    },
                    {
                        format: '.ods',
                        key: 'application/vnd.oasis.opendocument.spreadsheet',
                        description: 'OpenDocument spreadsheet document'
                    },
                    {
                        format: '.odt',
                        key: 'application/vnd.oasis.opendocument.text',
                        description: 'OpenDocument text document'
                    },
                    {format: '.oga', key: 'audio/ogg', description: 'OGG audio'},
                    {format: '.ogv', key: 'video/ogg', description: 'OGG video'},
                    {format: '.ogx', key: 'application/ogg', description: 'OGG'},
                    {format: '.opus', key: 'audio/opus', description: 'Opus audio'},
                    {format: '.otf', key: 'font/otf', description: 'OpenType font'},
                    {format: '.png', key: 'image/png', description: 'Portable Network Graphics'},
                    {format: '.pdf', key: 'application/pdf', description: 'Adobe Portable Document Format (PDF)'},
                    {
                        format: '.php',
                        key: 'application/php',
                        description: 'Hypertext Preprocessor (Personal Home Page)'
                    },
                    {format: '.ppt', key: 'application/vnd.ms-powerpoint', description: 'Microsoft PowerPoint'},
                    {
                        format: '.pptx',
                        key: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        description: 'Microsoft PowerPoint (OpenXML)'
                    },
                    {format: '.rar', key: 'application/vnd.rar', description: 'RAR archive'},
                    {format: '.rtf', key: 'application/rtf', description: 'Rich Text Format (RTF)'},
                    {format: '.sh', key: 'application/x-sh', description: 'Bourne shell script'},
                    {format: '.svg', key: 'image/svg+xml', description: 'Scalable Vector Graphics (SVG)'},
                    {
                        format: '.swf',
                        key: 'application/x-shockwave-flash',
                        description: 'Small web format (SWF) or Adobe Flash document'
                    },
                    {format: '.tar', key: 'application/x-tar', description: 'Tape Archive (TAR)'},
                    {format: '.tif', key: 'image/tiff', description: 'Tagged Image File Format (TIFF)'},
                    {format: '.tiff', key: 'image/tiff', description: 'Tagged Image File Format (TIFF)'},
                    {format: '.ts', key: 'video/mp2t', description: 'MPEG transport stream'},
                    {format: '.ttf', key: 'font/ttf', description: 'TrueType Font'},
                    {format: '.txt', key: 'text/plain', description: 'Text, (generally ASCII or ISO 8859-n)'},
                    {format: '.vsd', key: 'application/vnd.visio', description: 'Microsoft Visio'},
                    {format: '.wav', key: 'audio/wav', description: 'Waveform Audio Format'},
                    {format: '.weba', key: 'audio/webm', description: 'WEBM audio'},
                    {format: '.webm', key: 'video/webm', description: 'WEBM video'},
                    {format: '.webp', key: 'image/webp', description: 'WEBP image'},
                    {format: '.woff', key: 'font/woff', description: 'Web Open Font Format (WOFF)'},
                    {format: '.woff2', key: 'font/woff2', description: 'Web Open Font Format (WOFF)'},
                    {format: '.xhtml', key: 'application/xhtml+xml', description: 'XHTML'},
                    {format: '.xls', key: 'application/vnd.ms-excel', description: 'Microsoft Excel'},
                    {
                        format: '.xlsx',
                        key: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        description: 'Microsoft Excel (OpenXML)'
                    },
                    {format: '.xml', key: 'application/xml', description: 'XML (if not readable from casual users)'},
                    {format: '.xml', key: 'text/xml', description: 'XML (if readable from casual users)'},
                    {format: '.xul', key: 'application/vnd.mozilla.xul+xml', description: 'XUL'},
                    {format: '.zip', key: 'application/zip', description: 'ZIP archive'},
                    {format: '.3gp', key: 'video/3gpp', description: '3GPP audio/video container'},
                    {format: '.3gp', key: 'audio/3gpp', description: '3GPP audio (if no video)'},
                    {format: '.3g2', key: 'video/3gpp2', description: '3GPP2 audio/video container'},
                    {format: '.3g2', key: 'audio/3gpp2', description: '3GPP2 audio (if no video)'},
                    {format: '.7z', key: 'application/x-7z-compressed', description: '7-zip archive'}
                ])
        )
    }
}

