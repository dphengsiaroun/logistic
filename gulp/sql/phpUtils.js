const utf8Length = require('utf8-length');

class PhpUtils {
    fixSerialization(fileContent) {
        const result = fileContent.replace(/s:(\d+):\\"(http.*?)\\";/g, function (match, initialLength, content) {
            // console.log('match', match);
            // console.log('initialLength', initialLength);
            // console.log('content', content);

            let result = match;

            let length = utf8Length(content);
            const backslashNbr = (content.match(/\\/g) || []).length;
            length -= backslashNbr;


            if (length !== Number(initialLength)) {
                console.log('CORRECTION', match);
                result = `s:${length}:\\"${content}\\";`;
                console.log('result', result);
            }

            return result;
        });
        return result;
    }
}
module.exports = new PhpUtils();