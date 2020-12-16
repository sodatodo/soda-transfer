import * as readline from 'readline';
import * as stream from 'stream';

export const createBufferReadLine = (buffer: Buffer) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  const rl = readline.createInterface({
    input: bufferStream,
  });

  return rl;
};

export default {};
