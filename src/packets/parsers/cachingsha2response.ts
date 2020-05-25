import { BufferReader } from "../../buffer.ts";

export interface CachingSha2Response {
  succeeded: boolean;
  fullAuthRequired: boolean;
}

const Signature = 0x01;

const SuccessSignature = 0x03;

const FullAuthRequiredSignature = 0x04;

export function parseCachingSha2Response(
  reader: BufferReader,
): CachingSha2Response {
  let sign = reader.readUint8();
  let secondByte = reader.readUint8();
  let succeuss = secondByte == SuccessSignature;
  let fullAuth = secondByte == FullAuthRequiredSignature;
  if (sign == Signature) {
    return {
      succeeded: succeuss,
      fullAuthRequired: fullAuth,
    };
  }
  return {
    succeeded: false,
    fullAuthRequired: false,
  };
}
