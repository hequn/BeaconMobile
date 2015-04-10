/*!
 * FileInput <_LANG_> Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinput.locales._LANG_ = {
        fileSingle: '文件',
        filePlural: '文件',
        browseLabel: '请选择 &hellip;',
        removeLabel: '删除',
        removeTitle: '删除选中文件',
        cancelLabel: '取消',
        cancelTitle: '终止上传',
        uploadLabel: '上传',
        uploadTitle: '上传选中的文件',
        msgSizeTooLarge: '文件 "{name}" (<b>{size} KB</b>) 超过了最大上传限制 <b>{maxSize} KB</b>。  请重新上传！',
        msgFilesTooLess: '您最少需要上传 <b>{n}</b> 个文件。 请重新上传！',
        msgFilesTooMany: '您上传的文件数为 <b>({n})</b> 个，已经超过了允许上传的最多文件数 <b>{m}</b>。 请重新上传！',
        msgFileNotFound: '文件 "{name}" 未找到！',
        msgFileSecured: '安全机制限制了文件 "{name}"的上传。',
        msgFileNotReadable: '文件 "{name}" 不可读。',
        msgFilePreviewAborted: '文件预览失败： "{name}".',
        msgFilePreviewError: '读取文件 "{name}"时出现错误。',
        msgInvalidFileType: '文件 "{name}"类型不正确。 支持的类型有： "{types}" 。',
        msgInvalidFileExtension: '文件 "{name}"扩展名不正确。 支持的扩展名有： "{extensions}" 。',
        msgValidationError: '文件上传错误',
        msgLoading: '加载文件 {index} / {files} &hellip;',
        msgProgress: '上传文件 {index} / {files} - {name} - {percent}% 已完成。',
        msgSelected: '{n} 个文件选中',
        msgFoldersNotAllowed: '只能上传文件! 忽略 {n} 个文件夹。',
        dropZoneTitle: '拖拽需要上传图片至此&hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales._LANG_);
})(window.jQuery);